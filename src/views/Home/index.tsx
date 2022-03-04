import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useCallback, useState} from 'react';
import {
	ActionButton,
	BackgroundContainer,
	DateFilter,
	DosesFilter,
} from '../../components';
import {getContext} from '../../hooks/context';
import {DrawerNavigatorParamList} from '../../navigation/DrawerNavigator';
import {NoDosesText} from './styles';

const Main: React.FC = () => {
	const [showFilter, setShowFilter] = useState(false);
	const [filterDay, setFilterDay] = useState(new Date());
	const navigation =
		useNavigation<DrawerNavigationProp<DrawerNavigatorParamList>>();
	const {meds} = getContext();
	const handleNewDosePress = useCallback((): void => {
		navigation.navigate('AddDose');
	}, [navigation]);

	return (
		<BackgroundContainer
			header
			title="Doses do Dia"
			headerRight="filter"
			onHeaderPressRight={() => setShowFilter(true)}>
			<DosesFilter visible={showFilter} onChange={() => setShowFilter(false)} />
			<DateFilter date={filterDay} onChangeDate={setFilterDay} />
			{/*//! todo add doseList */}
			{meds.length === 0 && <NoDosesText>Nenhuma dose para hoje!</NoDosesText>}
			<ActionButton
				bottom
				label="Nova Dose"
				visible={moment().isSameOrAfter(filterDay, 'date')}
				onClick={handleNewDosePress}
			/>
		</BackgroundContainer>
	);
};

export default Main;
