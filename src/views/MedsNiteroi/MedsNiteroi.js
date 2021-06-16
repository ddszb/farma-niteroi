import React, {useContext, useState} from 'react'
import { TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native'
import meds_niteroi from '../../data/meds_niteroi'
import {Container, ItemBox, MedName, MedDosage, TextView, SearchBox, Description}  from './styles'
export default props =>{
    
    const [state, setState] = useState({
        meds: meds_niteroi,
        textFilter: ''
    })
    // const [textFilter, setTextFilter] = useState('')

    const descriptionText = `   Essa é a relação de medicamentos oferecidos pela prefeitura de niterói atualmente.
    Clique em um medicamento para ver mais opções`

    const __navigateToOptions = (med) =>{
        props.navigation.navigate('Medicamento Niteroi Detalhe', {screen: 'Medicamento Niteroi Detalhe', med: med} )
    }

    const __filterMeds = (text) =>{
        const newList = meds_niteroi.filter(med =>{
            const textData = text.toUpperCase()
            const medData = med.nome.toUpperCase()
            return medData.indexOf(textData) > -1;
        })

        setState({meds: newList, textFilter: text})
    }
    const __getMedItem = ({item : med}) =>{
        return (
            <TouchableOpacity
                onPress={() => __navigateToOptions(med)}>
                <ItemBox>
                    <TextView>
                        <MedName>{med.nome}</MedName>
                    </TextView>
                    <TextView>
                        <MedDosage> {med.dosagem}</MedDosage>
                    </TextView>
                </ItemBox>
            </TouchableOpacity>
        )
    }

    return(
        <Container>
            <Description>
                {descriptionText}
            </Description>
            <SearchBox
                    onChangeText={ text => __filterMeds(text)}
                    placeholder="buscar por nome"
                    value={state.textFilter}    
                />
            
            <FlatList
            keyExtractor={med => med.codigo_stok.toString()}
            data={state.meds}
            renderItem={__getMedItem}
            />
        </Container>

    )
}
