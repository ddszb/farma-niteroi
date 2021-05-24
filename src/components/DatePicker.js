import React from 'react'
import DatePicker from 'react-native-datepicker'

export default props =>{
    return (
        <DatePicker
            style={{width: 200,}}
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
                    color:'#999',
                    textAlign: 'left',
                    alignItems: 'flex-start',
                    paddingLeft: 6
                },
                dateText:{
                    color:'#444',
                    textAlign: 'left',
                    alignItems: 'flex-start',
                    paddingLeft: 6
                },
                dateInput:{
                    borderRadius: 5,
                    borderColor: '#aaa',
                    alignItems: 'flex-start',
                    marginTop: 5,
                }
            // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {
                props.onChangeValue(date)

            }}
            />
    )
}