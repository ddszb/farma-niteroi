import React, {useState, useEffect,  useContext, useRef} from 'react'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons'
import iconMoonConfig from '../../selection.json'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { Body, CardBox, ColorTag, Container,
     Detail, Header, Buttons, DarkText, LightText, ResetDateButton,
     TopContent, BottomContent, DateText, HeaderTitle, HeaderTitleText,
     DatePickerView, EmptyListContainer, RightSwipe, RightSwipeText,
     WarningText, 
     RowView,
     HPadding} from './styles'
import { FlatList, Swipeable } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker'
import doseUnits from '../../constants/doseUnits'

import {useFocusEffect} from '@react-navigation/native'
import moment from 'moment'
import 'moment/locale/pt-br'
import { TouchableOpacity, View, RefreshControl } from 'react-native'
import doseStatus from '../../constants/doseStatus'

export default props =>{

    const MedIcon = createIconSetFromIcoMoon(iconMoonConfig)

    const [meds, setMeds] = useState([])
    const [visibleDoses, setVisibleDoses] = useState([])
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [filterDay, setFilterDay] = useState(new Date())
    const [refreshing, setRefreshing] = useState(false)
    const swipeableRef = useRef(null);

    clearAsyncStorage = async() => {
        AsyncStorage.clear();
    }

    const updateMeds = async () =>{
        AsyncStorage.setItem('medsList', JSON.stringify(meds))
    }

    const getMeds = async () =>{
        const medsString = await AsyncStorage.getItem('medsList')
        const meds = JSON.parse(medsString) || []
        setMeds(meds)
    }

    useFocusEffect(
        React.useCallback(() =>{
        getMeds()
    }, []))

    useEffect(() =>{
        if(meds && meds.length > 0 && filterDay){
            filterDoses()
        }
    }, [meds, filterDay])

    const onRefresh = () =>{
        getMeds()
        setRefreshing(false)
    }

    const filterDoses = () =>{
        var allDoses = [].concat.apply([], meds.map( m => m.doses)) // Concatena todas as doses de todos os medicamentos
        let visibleDoses = allDoses.filter( d => moment(d.date).isSame(filterDay, 'day') && d.status !== doseStatus.ENCERRADA)
        visibleDoses.sort((a, b) => new Date(a.date) - new Date(b.date))
        setVisibleDoses(visibleDoses)
    }

    const shiftDate = offset =>{
        let newDate = new Date(filterDay)
        newDate.setDate(newDate.getDate() + offset)
        setFilterDay(newDate)
    }

    const updateDose = (dose, status) =>{
        var medList = [...meds]
        var updatedMed = medList.filter(m => m.name == dose.medName)[0]
        var updatedDose = updatedMed.doses.filter(d => dose.medName == d.medName && d.date == dose.date )[0]
        if(updatedDose){
            if(status == doseStatus.TOMADA){
                updatedDose.status = status
                updatedDose.dateTaken = new Date()
                updatedMed.stock.amount -= dose.amount
            }
        }
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
                        <Icon name="calendar-day" type="font-awesome-5" size={26} color="#63488c"/>
                    </TouchableOpacity>
                </ResetDateButton>
                }
                <DatePickerView>
                    <TouchableOpacity onPress={() => shiftDate(-1)}>
                        <Icon name="chevron-with-circle-left" type="entypo" size={26} color="#63488c"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => setShowDatePicker(true)}>
                            <DateText>{dateString}</DateText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => shiftDate(1)}>
                        <Icon name="chevron-with-circle-right" type="entypo" size={26} color="#63488c"/>
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
                        <LightText>
                            Não tomado
                        </LightText>
                    )
                }
                break
            case doseStatus.TOMADA:
                status = (
                    <RowView>
                        <HPadding>
                            <LightText>
                                {"Tomado às\n" +
                                moment(dose.dateTaken).format('HH:mm')}
                            </LightText>
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
            <Swipeable
                ref={swipeableRef}
                renderRightActions={() => getRightSwipe(dose)}
                onSwipeableRightOpen={() => updateDose(dose, doseStatus.TOMADA)}
                >
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
                            <Icon name="clock-o" type="font-awesome" size={20} color="#666"/>
                            <LightText>
                                {moment(dose.date).format('HH:mm')}
                            </LightText>
                            <DarkText>
                                {dose.amount} {dose.unit.label}{dose.amount > 1 && dose.unit.label != "Ml" ? "s" : ""}
                            </DarkText>
                        </BottomContent>
                    </Detail>
                    <Buttons>
                        {status}
                    </Buttons>
                </CardBox>
            </Swipeable>
        )
    }

    return(
        <Container>
            <Header>
                <HeaderTitle>
                    <HeaderTitleText>
                        Doses do dia
                    </HeaderTitleText>
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
        </Container>

    )

}
   
