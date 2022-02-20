import React, {useState, useEffect} from 'react';
//Libs e Hooks
import {MedListView, ListView} from './styles';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//Enums
import medStatus from '../../constants/medStatus';
import storageKeys from '../../constants/storageKeys';
// Components
import Header from '../../components/Header';
import MedList from './components/MedList';
import Filter from '../../components/Filter';
import ActionButton from '../../components/ActionButton';

/**
 * Tela de Medicamentos do usuário
 */
export default props => {
	const [showFinishedMeds, setShowFinishedMeds] = useState(false);
	const [meds, setMeds] = useState([]);
	const [visibleMeds, setVisibleMeds] = useState([]);
	const [showFilter, setShowFilter] = useState(false);

	/**
	 * Busca os medicamentos da fonte de dados
	 */
	const getMeds = async () => {
		const medsString = await AsyncStorage.getItem(storageKeys.MEDS);
		const meds = JSON.parse(medsString) || [];
		setMeds(meds);
	};

	/**
	 * Callback para carregamento de dados quando a tela entra em foco.
	 */
	useFocusEffect(
		React.useCallback(() => {
			getMeds();
		}, []),
	);

	/**
	 * Atualiza a relação de medicamentos visíveis se houver mudança no filtro ou nos medicamentos.
	 */
	useEffect(() => {
		if (meds && meds.length > 0) {
			filterMeds();
		}
	}, [meds, showFinishedMeds]);

	/**
	 * Seleciona os medicamentos visíveis de acordo com o filtro selecionado.
	 */
	const filterMeds = () => {
		var allMeds = [...meds];
		if (!showFinishedMeds) {
			allMeds = meds.filter(m => m.status == medStatus.ATIVO);
		}
		allMeds.sort((a, b) => a.status < b.status);
		setVisibleMeds(allMeds);
	};

	/**
	 * Atualiza a opção de filtro selecionada e fecha o painel do filtro.
	 * @param {String} hideFinished Se deve ('0') ou não ('1') esconder os medicamentos finalizados
	 */
	const onChangeMedsFilterValue = hideFinished => {
		setShowFinishedMeds(+hideFinished);
		setShowFilter(false);
	};

	/**
	 * Navega para a tela de cadastro de novo medicamento.
	 */
	function navigateToNew() {
		props.navigation.navigate('AddMeds', {
			screen: 'AddMeds',
		});
	}

	/**
	 * Navega para a tela de detalhes de um medicamento.
	 * @param {*} med O medicamento
	 */
	function navigateToView(med) {
		props.navigation.navigate('MedDetail', {
			screen: 'MedDetail',
			med: med,
		});
	}

	/**
	 * Retorna as opções disponíveis para o filtro de medicamentos visíveis.
	 * @returns A lista com as opções
	 */
	const getFilterOptions = () => {
		return ['Mostrar apenas atuais', 'Mostrar todos'];
	};

	return (
		<MedListView>
			<Filter
				visible={showFilter}
				options={getFilterOptions()}
				title={'Filtrar Medicamentos'}
				storageKey={storageKeys.MEDS_FILTER}
				onClose={() => setShowFilter(false)}
				value={'0'}
				onChangeValue={onChangeMedsFilterValue}
			/>
			<Header
				title="Meus Medicamentos"
				rightButton="filter"
				onPressRight={() => setShowFilter(true)}
				onPressLeft={() => props.navigation.toggleDrawer()}
			/>
			<ListView>
				<MedList visibleMeds={visibleMeds} onPress={navigateToView} />
			</ListView>
			<ActionButton
				bottom
				label="Novo Medicamento"
				visible={true}
				onClick={navigateToNew}
			/>
		</MedListView>
	);
};
