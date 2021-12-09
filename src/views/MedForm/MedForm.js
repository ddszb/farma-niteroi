import React, {useState } from 'react'
import { ScrollView } from "react-native"

import moment from 'moment'
import 'moment/locale/pt-br'

// Styles
import { Form } from './styles'
// Constants & Enums
import medicons from '../../constants/medicons'
import iconColors from '../../constants/iconColors'
import medStatus from '../../constants/medStatus'
import doseUnits from '../../constants/doseUnits'
//Components
import FieldStock from './components/FieldStock'
import FieldName from './components/FieldName'
import FieldNotes from './components/FieldNotes'
import Submit from './components/Submit'
import FieldIcon from './components/FieldIcon'
import FieldSchedule from './components/FieldSchedule'
import FieldDoseHours from './components/FieldDoseHours'


export default ({navigation, route}) => {

    const initialDoseTime = moment().hours(8).minutes(0).toDate();

    const defaultMed = 
    {
        name: route.params.med ? route.params.med : '',
        weekdays: { 0:1, 1:1, 2:1, 3:1, 4:1, 5:1, 6:1},
        totalDays: 7,
        startDate: new Date(),
        scheduledDoses: false,
        icon: medicons[0],
        iconColor: iconColors[0],
        notes: null,
        status: medStatus.ATIVO,
        doseUnit: doseUnits[0],
        doseHours: [{ time: initialDoseTime, amount: 1, unit: doseUnits[0], index: 0}],
        stock:{
            amount: null,
            unit: doseUnits[0]
        },
        doses:[]
    }

    const [med, setMed] = useState(defaultMed)
    const [medPicked, setMedPicked] = useState(!!route.params.med)

    return (
        <Form>
            <FieldName
                onChangeName={ name => setMed({...med , name})}
                med={med}
                onReset={() =>{
                    setMed({...defaultMed, name: ''})
                    setMedPicked(false)}}
                medPicked={medPicked}
                onConfirm={() => setMedPicked(true)}
            />
            <ScrollView keyboardShouldPersistTaps={'handled'}>
                {medPicked &&
                <>
                <FieldStock
                    med={med}
                    onChangeDoseUnit={doseUnit => setMed({...med, doseUnit})}
                    onChangeAmount={ amount => setMed({...med , stock: {...med.stock, amount}})}
                    onChangeUnit={unit => setMed({...med, stock:{...med.stock, unit}, doseUnit: unit})}/>
                <FieldDoseHours
                    med={med}
                    onChangeScheduledDoses={(scheduledDoses) => setMed({...med, scheduledDoses})}
                    onChangeDoseHours={(doseHours) => setMed({...med, doseHours})}/>
                <FieldSchedule
                    med={med}
                    onChangeStartDate={(startDate) => setMed({...med, startDate})}
                    onChangeTotalDays={(totalDays) => setMed({...med, totalDays})}
                    onChangeWeekdays ={(weekdays)  => setMed({...med, weekdays})}/>
                <FieldIcon
                    onChangeColor={(color) => setMed({...med, iconColor: color})}
                    onChangeIcon={  (icon) => setMed({...med, icon: icon})}/>
                <FieldNotes
                    med={med}
                    onChange={ notes => setMed({...med , notes})}/>
                <Submit
                    med={med}
                    navigation={navigation}/>
                </>}
            </ScrollView>
        </Form>
    )
}
