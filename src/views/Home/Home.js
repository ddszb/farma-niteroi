import React, {useState, useEffect,  useContext, useRef} from 'react'

import { TouchableOpacity, View, RefreshControl, ToastAndroid } from 'react-native'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons'
import iconMoonConfig from '../../selection.json'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import FAB from '../../components/FloatActionButton'
import { Body, CardBox, ColorTag, Container,
     Detail, Header, Buttons, DarkText, LightText, ResetDateButton,
     TopContent, BottomContent, DateText, HeaderTitle, HeaderTitleText,
     DatePickerView, EmptyListContainer, RightSwipe, RightSwipeText,
     WarningText, 
     RowView,
     HPadding,
     FooterButton,
     FooterButtonText,
     OkText,
     WaitingText} from './styles'
import { FlatList, Swipeable } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker'

import {useFocusEffect} from '@react-navigation/native'
import moment from 'moment'
import 'moment/locale/pt-br'
import doseStatus from '../../constants/doseStatus'
import WelcomeModal from './components/WelcomeModal'
import EditDoseModal from './components/EditDoseModal'
import doseActions from '../../constants/doseActions'
import storageKeys from '../../constants/storageKeys'


const filterOptions = { ALL: 0, TAKEN: 1, NOT_TAKEN: 2}
const filterIcons = ['alarm-plus', 'alarm-check', 'alarm-off']
const filterMsgs = ['Exibindo todas as doses', 'Exibindo apenas doses tomadas', 'Exibindo apenas doses não tomadas',]

export default props =>{

    const MedIcon = createIconSetFromIcoMoon(iconMoonConfig)

    const [meds, setMeds] = useState([])
    const [sporadicDoses, setSporadicDoses] = useState([])
    const [visibleDoses, setVisibleDoses] = useState([])
    const [filterOption, setFilterOption] = useState(filterOptions.ALL)
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [filterDay, setFilterDay] = useState(new Date())
    const [refreshing, setRefreshing] = useState(false)
    const [editedDose, setEditedDose] = useState()
    const [showWelcomeModal, setShowWelcomeModal] = useState(false)
    const [showEditDoseModal, setShowEditDoseModal] = useState(false)
    const swipeableRef = useRef(null);
    
    clearAsyncStorage = async() => {
        AsyncStorage.clear();
    }

    const updateMeds = async () =>{
        AsyncStorage.setItem(storageKeys.MEDS, JSON.stringify(meds))
    }

    const updateSporadicDoses = async () =>{
        AsyncStorage.setItem(storageKeys.SPORADIC_DOSES, JSON.stringify(sporadicDoses))
    }

    const checkFirstTime = async () =>{
        const firstLogin = await AsyncStorage.getItem(storageKeys.FIRST_LOGIN)
        if(!firstLogin){
            setShowWelcomeModal(true)
        }
    }

    const saveFirstVisit = async () =>{
        await AsyncStorage.setItem(storageKeys.FIRST_LOGIN, '1')
    }

    const getMeds = async () =>{
        const medsString = await AsyncStorage.getItem(storageKeys.MEDS)
        const meds = JSON.parse(medsString) || []
        setMeds(meds)
    }

    const closeEditModal = () =>{
        setShowEditDoseModal(false)
    }

    const closeWelcomeModal = () =>{
        setShowWelcomeModal(false)
        saveFirstVisit()
    }

    useFocusEffect(
        React.useCallback(() =>{
        getMeds()
        checkFirstTime()
    }, []))

    useEffect(() =>{
        if((meds && meds.length > 0) && filterDay && filterOption != null){
            filterDoses()
        }
    }, [meds, filterDay, filterOption])

    const onRefresh = () =>{
        getMeds()
        setRefreshing(false)
    }

    const navigateToNew = () =>{
        props.navigation.navigate('Adicionar Dose', {screen: 'Adicionar Dose', meds: meds})
    }

    const toggleFilter = () =>{
        let n = filterOption == 2 ? 0 : filterOption + 1
        setFilterOption(n)
        ToastAndroid.showWithGravityAndOffset(filterMsgs[n], ToastAndroid.SHORT, ToastAndroid.TOP, 0 , 30)        
    }

    const filterDoses = () =>{
        var allDoses = [].concat.apply([], meds.map( m => m.doses)) // Concatena todas as doses de todos os medicamentos
        let dayDoses = allDoses.filter( d => (moment(d.date).isSame(filterDay, 'day') || moment(d.dateTaken).isSame(filterDay, 'day')) && d.status !== doseStatus.ENCERRADA)
        let sporadic = dayDoses.filter( d => d.sporadic)
        let scheduled = dayDoses.filter( d => !d.sporadic)

        scheduled.sort((a, b) => new Date(a.date) - new Date(b.date))
        sporadic.sort((a,b) => new Date(a.dateTaken) - new Date(b.dateTaken))
        let visible = scheduled.concat(sporadic)
        
        if(filterOption == filterOptions.TAKEN){
            visible = visible.filter( d => d.status == doseStatus.TOMADA )
        }else if(filterOption == filterOptions.NOT_TAKEN){
            visible = visible.filter( d => d.status == doseStatus.NAO_TOMADA)
        }
        setVisibleDoses(visible)
    }

    const onPressDose = dose =>{
        if(moment().isSame(dose.date, 'day') || moment().isSame(dose.dateTaken, 'day')){
            setEditedDose(dose)
            setShowEditDoseModal(true)
        }
    }

    const shiftDate = offset =>{
        let newDate = new Date(filterDay)
        newDate.setDate(newDate.getDate() + offset)
        setFilterDay(newDate)
    }

    const takeQuickDose = dose =>{
        dose.status = doseStatus.TOMADA
        dose.dateTaken = new Date()
        updateDose(dose, doseActions.TOMAR_DOSE)
    }

    const onEditDose = dose =>{
        switch(dose.status){
            case doseStatus.TOMADA:
                updateDose(dose, doseActions.EDITAR_DOSE_TOMADA)
                break
            case doseStatus.NAO_TOMADA:
                updateDose(dose, doseActions.TOMAR_DOSE)
                break
        }
        setShowEditDoseModal(false)
    }

    const updateDose = (dose, action) =>{

        var medList = [...meds]
        var updatedMed = medList.filter(m => m.name == dose.medName)[0]
        var updatedDose = updatedMed.doses.filter(d => dose.medName == d.medName && d.index == dose.index )[0]

        if(updatedDose){
            switch(action){
                case doseActions.TOMAR_DOSE:
                    updatedMed.stock.amount -= dose.amount
                    dose.status = doseStatus.TOMADA
                    break
                case doseActions.EDITAR_DOSE_TOMADA:
                    updatedMed.stock.amount += updatedDose.amount - dose.amount
                    break
            }
        }
        newDoses = updatedMed.doses.map( d => d.index == dose.index ? dose : d)
        updatedMed.doses = newDoses

        if(swipeableRef && swipeableRef.current){
            swipeableRef.current.close()
        }
        setMeds(medList)
        updateMeds()
             
    }

    const getDateFilter = () =>{
        let datePicker = <DateTimePicker value={filterDay}
        onChange ={ (_, date) => {
            setShowDatePicker(false)
            setFilterDay(date)
            filterDoses()
        }}
        mode='date'/>
        var dateString = moment(filterDay).isSame(moment(), 'date') ? 'Hoje, ' : moment(filterDay).format('ddd, ')
        dateString += moment(filterDay).format('D [de] MMMM [de] YYYY')
        datePicker = (
            <View>
                {!moment().isSame(filterDay, 'date') &&
                <ResetDateButton>
                    <TouchableOpacity onPress={() => setFilterDay(new Date())}>
                        <Icon name="calendar-day" type="font-awesome-5" size={26} color="#fff"/>
                    </TouchableOpacity>
                </ResetDateButton>
                }
                <DatePickerView>
                    <TouchableOpacity onPress={() => shiftDate(-1)}>
                        <Icon name="chevron-with-circle-left" type="entypo" size={28} color="#63488c"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => setShowDatePicker(true)}>
                            <DateText>{dateString}</DateText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => shiftDate(1)}>
                        <Icon name="chevron-with-circle-right" type="entypo" size={28} color="#63488c"/>
                    </TouchableOpacity>
                </DatePickerView>
                {showDatePicker && datePicker}
            </View>
        )
        return datePicker
    }

    const getRightSwipe = (dose) => {
        if (dose.status == doseStatus.NAO_TOMADA && moment().isSame(dose.date, 'day')){
            return (
                <RightSwipe style={{backgroundColor: '#038f00'}}>
                    <RightSwipeText>
                        Tomar dose
                    </RightSwipeText>
                    <Icon name="check" size={30} color='#FFF'/>
                </RightSwipe>
            )
        }   
    }

    const getDoseItem = ({item : dose}) =>{
        var now = moment()
        var status = null
        switch(dose.status){
            case doseStatus.CANCELADA:
                status = (
                    <LightText>
                        Cancelada
                    </LightText>
                )
                break
            case doseStatus.NAO_TOMADA:
                if(moment(dose.date) < now ){
                    status = (
                        <RowView>
                            <HPadding>
                                <WarningText>
                                    Atrasado
                                </WarningText>
                            </HPadding>
                            <Icon name="warning" type={"font-awesome"} size={24} color='#f03622'/>
                        </RowView>
                    )
                }else{
                    status = (
                        <RowView>
                            <HPadding>
                                <WaitingText>
                                    {moment(dose.date).format('HH:mm')}
                                </WaitingText>
                            </HPadding>
                            <Icon name="clock-o" type="font-awesome" size={24} color="#666"/>
                        </RowView>
                    )
                }
                break
            case doseStatus.TOMADA:
                status = (
                    <RowView>
                        <HPadding>
                            <OkText>
                                {moment(dose.dateTaken).format('HH:mm')}
                            </OkText>
                        </HPadding>
                        <Icon name="check-circle" type={"font-awesome"} size={24} color='#40a843'/>
                    </RowView>
            )
                break
            case doseStatus.ADIADA:
                status = (
                    <LightText>
                        Adiado para {moment(dose.newDate).format('HH:mm')}
                    </LightText>
                )
                break
            case doseStatus.PAUSADA:
                status = (
                    <LightText>
                        Tratamento pausado
                    </LightText>
                )
                break
        }

        return(
            <>
            <TouchableOpacity
                activeOpacity={0.7}
                delayPressIn={200}
                onPressIn={() => onPressDose(dose)}>
                <Swipeable
                    ref={swipeableRef}
                    renderRightActions={() => getRightSwipe(dose)}
                    onSwipeableRightOpen={() => takeQuickDose(dose)}>
                    <CardBox>
                        <ColorTag style={{backgroundColor: dose.iconColor}}/>
                        <Detail>
                            <TopContent>
                                <MedIcon name={dose.icon} size={24} color={dose.iconColor}/> 
                                <DarkText numberOfLines={1}>
                                    {dose.medName}
                                </DarkText>
                            </TopContent>
                            <BottomContent>
                                <LightText>
                                    {dose.amount} {dose.unit.label}{dose.amount > 1 && dose.unit.label != "Ml" ? "s" : ""}
                                </LightText>
                            </BottomContent>
                        </Detail>
                        <Buttons>
                            {status}
                        </Buttons>
                    </CardBox>
                </Swipeable>
            </TouchableOpacity>
            </>
        )
    }

    return(
        <Container>
            {/* <Button onPress={clearAsyncStorage} title="Limpar"/> */}
            {showEditDoseModal &&
                <EditDoseModal
                visible={showEditDoseModal}
                dose={editedDose}
                onSet={onEditDose}
                close={closeEditModal}
            />}
            <WelcomeModal
                visible={showWelcomeModal}
                close={closeWelcomeModal}
            />
            <Header>
                <HeaderTitle>
                    <HeaderTitleText>
                        Doses do dia
                    </HeaderTitleText>
                    <TouchableOpacity
                        onPress={toggleFilter}>
                        <Icon name={filterIcons[filterOption]} type="material-community" size={32} color="#fff"/>
                    </TouchableOpacity>
                </HeaderTitle>
                {getDateFilter()}
            </Header>
            <Body>
                {visibleDoses && visibleDoses.length > 0 &&
                <FlatList
                    data={visibleDoses}
                    keyExtractor={ (item, index) => `${index}`}
                    renderItem={getDoseItem}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}/>
                    }/>
                }
                {!visibleDoses || visibleDoses.length == 0 &&
                <EmptyListContainer>
                    <LightText>
                        Nenhuma dose para a data selecionada!
                    </LightText>
                </EmptyListContainer>
                }
            </Body>
            <FooterButton
                        onPress={navigateToNew}
                        activeOpacity={0.9}>
                    <FooterButtonText>
                        Nova Dose
                    </FooterButtonText>
                </FooterButton>
        </Container>

    )

}
   
