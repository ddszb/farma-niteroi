import React, {useState} from 'react';

//Libs
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import DateTimePicker from '@react-native-community/datetimepicker'

import moment from 'moment'
import 'moment/locale/pt-br'

// Componentes e cores
import { DateFilterContainer, DatePickerView, DateText, ResetDateButton, ResetDatetext, RowView } from '../styles';
import colors from '../../../styles/colors';


/**
 * Componente para filtro de Data na página principal (Doses)
 */
export default props =>{

    const [filterDay, setFilterDay] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)

    const onChange = (event, date) =>{
        setShowDatePicker(false)
        if(event.type == "set"){
            setFilterDay(date)
            props.onChangeDate(date)
        }
    }
    
    const shiftDate = offset =>{
        let newDate = new Date(filterDay)
        newDate.setDate(newDate.getDate() + offset)
        setFilterDay(newDate)
        props.onChangeDate(newDate)
    }

    const showReset = () =>{
        return !moment().isSame(filterDay, 'date')
    }
    
    const getDateStr = () =>{
        let dateString = moment(filterDay).isSame(moment(), 'date') ? 'Hoje, ' : moment(filterDay).format('ddd, ')
        dateString += moment(filterDay).format('D/MM/YY')
        return dateString
    }
    
    return (
        <DateFilterContainer>
            <DatePickerView>
                <TouchableOpacity style={{marginTop: showReset() ? 20 : 12}} onPress={() => shiftDate(-1)}>
                    <Icon name="leftcircle" type="ant-design" size={32} color={colors.white}/>
                </TouchableOpacity>
                <TouchableOpacity style={showReset() ? {} : {marginTop: 10}} onPress={ () => setShowDatePicker(true)}>
                        <DateText>{getDateStr()}</DateText>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop: showReset() ? 20 : 12}} onPress={() => shiftDate(1)}>
                    <Icon name="rightcircle" type="ant-design" size={32} color={colors.white}/>
                </TouchableOpacity>
            </DatePickerView>
            {showReset() &&
            <ResetDateButton>
                <TouchableOpacity onPress={() => setFilterDay(new Date())}>
                    <RowView>
                        <Icon name="calendar-refresh" type="material-community" size={22} color={colors.white}/>
                        <ResetDatetext>
                            Hoje
                        </ResetDatetext>
                    </RowView>
                </TouchableOpacity>
            </ResetDateButton>
            }
            {showDatePicker && 
            <DateTimePicker 
                value={filterDay}
                onChange ={onChange}
                mode='date'/>}
        </DateFilterContainer>
    )
}