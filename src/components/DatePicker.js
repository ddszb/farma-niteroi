import React from 'react'
import DatePicker from 'react-native-datepicker'
import colors from '../styles/colors'

export default props =>{
    return (
        <DatePicker
            style={{width: 200, paddingLeft: 6}}
            date={props.date}
            showIcon={false}
            mode="date"
            placeholder={props.placeholder}
            format="DD/MM/YYYY"
            minDate={new Date()}
            confirmBtnText="Ok"
            cancelBtnText="Voltar"
            androidMode="spinner"
            customStyles={{
                placeholderText: {
                    color: colors.grey10,
                    textAlign: 'left',
                    alignItems: 'flex-start',
                    paddingLeft: 6
                },
                dateText:{
                    color: colors.grey4,
                    textAlign: 'left',
                    alignItems: 'flex-start',
                    paddingLeft: 6
                },
                dateInput:{
                    borderRadius: 5,
                    borderColor: colors.grey10,
                    alignItems: 'flex-start',
                    marginTop: 5,
                }
            }}
            onDateChange={(date) => {
                props.onChangeValue(date)

            }}
            />
    )
}