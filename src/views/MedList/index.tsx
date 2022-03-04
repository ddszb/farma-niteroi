import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ActionButton, BackgroundContainer, MedsFilter} from '../../components';
import {getContext} from '../../hooks/context';
import {DrawerNavigatorParamList} from '../../navigation/DrawerNavigator';
import {NoDosesText} from './styles';

const MedList: React.FC = () => {
	const [showFilter, setShowFilter] = useState(false);
	const navigation =
		useNavigation<DrawerNavigationProp<DrawerNavigatorParamList>>();
	const {meds} = getContext();

	return (
		<BackgroundContainer
			header
			title="Meus Medicamentos"
			headerRight="filter"
			onHeaderPressRight={() => setShowFilter(true)}>
			<MedsFilter visible={showFilter} onChange={() => setShowFilter(false)} />
			{meds.length === 0 && (
				<NoDosesText>Nenhum medicamento para o filtro selecionado!</NoDosesText>
			)}
			{/*  todo medList component */}
			<ActionButton
				bottom
				label="Novo Medicamento"
				visible
				onClick={() => navigation.navigate('AddMed')}
			/>
		</BackgroundContainer>
	);
};

export default MedList;
