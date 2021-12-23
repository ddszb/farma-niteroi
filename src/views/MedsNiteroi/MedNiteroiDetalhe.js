import React from 'react'
import PrimaryButton from '../../components/PrimaryButton'

import {DetailContainer, MedNameTitle, RowView, InfoText, Description} from './styles'

export default props =>{
    
    const {med, screen} = props.route.params

    const navigateToNew = () =>{
        props.navigation.navigate('Adicionar Medicamento', {screen: 'Adicionar Medicamento', med: med.nome})
    }
    return(
        <DetailContainer>
            <RowView>
                <MedNameTitle>{med.farmaco}</MedNameTitle>
            </RowView>
            <RowView>
                <InfoText>{med.concentracao.toLowerCase()}</InfoText>
                <InfoText>{med.apresentacao.toLowerCase()}</InfoText>
            </RowView>
            <Description>
                Este medicamento é oferecido pela Prefeitura de Niterói. Entre em contato ou visite uma das Policlínicas do programa de assistência farmacêutica para consultar a disponibilidade.
            </Description>
            <PrimaryButton
                bottom
                text="Iniciar Tratamento"
                outerText="Já possui este medicamento?"
                visible={true}
                onClick={navigateToNew}/>
        </DetailContainer>
    )
}