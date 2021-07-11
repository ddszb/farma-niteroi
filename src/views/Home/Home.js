import React, {useState, useEffect} from 'react'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons'
import iconMoonConfig from '../../selection.json'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { Body, CardBox, ColorTag, Container,
     Detail, Header, Buttons, DarkText, LightText, ResetDateButton,
      TopContent, BottomContent, DateText, HeaderTitle, HeaderTitleText, DatePickerView, EmptyListContainer } from './styles'
import { FlatList } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker'
import doseUnits from '../../constants/doseUnits'

import moment from 'moment'
import 'moment/locale/pt-br'
import { TouchableOpacity, View, RefreshControl } from 'react-native'


const initialState = {
    visibleDoses: [],
    meds: [],
    filterDay: new Date(),
    showDatePicker: false,
}

export default props =>{

    const MedIcon = createIconSetFromIcoMoon(iconMoonConfig)

    // const [state, setState] = useState(initialState)
    const [reload, setReload] = useState(true)
    const [meds, setMeds] = useState([])
    const [visibleDoses, setVisibleDoses] = useState([])
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [filterDay, setFilterDay] = useState(new Date())
    const [refreshing, setRefreshing] = useState(false)

    clearAsyncStorage = async() => {
        AsyncStorage.clear();
    }

    const getMeds = async () =>{
        const medsString = await AsyncStorage.getItem('medsList')
        const meds = JSON.parse(medsString) || []
        setMeds(meds)
    }

    useEffect(() =>{
        getMeds()
    }, [])

    useEffect(() =>{
        if(meds && meds.length > 0 && filterDay){
            filterDoses()
        }
    }, [meds, filterDay])

    const onRefresh = () =>{
        console.log("onRefresh call")
        getMeds()
        setRefreshing(false)
    }

    const filterDoses = () =>{
        console.log(meds)
        var allDoses = [].concat.apply([], meds.map( m => m.doses)) // Concatena todas as doses de todos os medicamentos
        let visibleDoses = allDoses.filter( d => moment(d.date).isSame(filterDay, 'day'))
        setVisibleDoses(visibleDoses)
    }

    const shiftDate = offset =>{
        let newDate = new Date(filterDay)
        newDate.setDate(newDate.getDate() + offset)
        setFilterDay(newDate)
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

    const getDoseItem = ({item : dose}) =>{
        return(
            <CardBox>
                <ColorTag style={{backgroundColor: dose.iconColor}}/>
                <Detail>
                    <TopContent>
                        <MedIcon name={dose.icon} size={24} color={dose.iconColor}/> 
                        <DarkText>
                            {dose.medName}
                        </DarkText>
                    </TopContent>
                    <BottomContent>
                        <Icon name="clock-o" type="font-awesome" size={20} color="#666"/>
                        <LightText>
                            {moment(dose.date).format('HH:mm')}
                        </LightText>
                        <DarkText>
                            {dose.amount} {doseUnits[dose.unit].label}{dose.amount > 1 ? "s" : ""}
                        </DarkText>
                    </BottomContent>
                </Detail>
                <Buttons>
                    
                </Buttons>
            </CardBox>
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
   
