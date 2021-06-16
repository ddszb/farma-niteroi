import React from 'react'

import {DetailContainer, MedNameTitle, RowView, InfoText} from './styles'

export default props =>{
    
    const {med, screen} = props.route.params

    return(
        <DetailContainer>
            <RowView>
                <MedNameTitle>{med.nome}</MedNameTitle>
            </RowView>
            <RowView>
                <InfoText>{med.dosagem.toLowerCase()}</InfoText>
                <InfoText>{med.apresentacao.toLowerCase()}</InfoText>
            </RowView>
        </DetailContainer>
    )
}