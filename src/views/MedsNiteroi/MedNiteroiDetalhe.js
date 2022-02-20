import React from 'react';
import ActionButton from '../../components/ActionButton';

import {
	DetailContainer,
	MedNameTitle,
	RowView,
	InfoText,
	Description,
} from './styles';

export default props => {
	const {med, screen} = props.route.params;

	const navigateToNew = () => {
		props.navigation.navigate('AddMeds', {
			screen: 'AddMeds',
			med: med.nome,
		});
	};
	return (
		<DetailContainer>
			<RowView>
				<MedNameTitle>{med.farmaco}</MedNameTitle>
			</RowView>
			<RowView>
				<InfoText>{med.concentracao.toLowerCase()}</InfoText>
				<InfoText>{med.apresentacao.toLowerCase()}</InfoText>
			</RowView>
			<Description>
				Este medicamento é oferecido pela Prefeitura de Niterói. Entre em
				contato ou visite uma das Policlínicas do programa de assistência
				farmacêutica para consultar a disponibilidade.
			</Description>
			<ActionButton
				bottom
				label="Iniciar Tratamento"
				outerText="Já possui este medicamento?"
				visible={true}
				onClick={navigateToNew}
			/>
		</DetailContainer>
	);
};
