import React, {useCallback, useEffect} from 'react';
import {View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {SwipeablePanel} from 'rn-swipeable-panel';
import colors from '../../assets/colors';
import {Button, OptionText, Title} from './styles';
import {StorageService} from '../../services';
import {StorageKeys} from '../../services/StorageService';

interface FilterProps {
	title: string;
	options: string[];
	visible: boolean;
	storageKey: StorageKeys;
	value: string;
	onClose(): void;
	onChangeValue(filter: string): void;
}
/**
 * Componente genérico para filtro com swipeable panel
 */
const Filter: React.FC<FilterProps> = ({
	title,
	options,
	visible,
	value,
	storageKey,
	onClose,
	onChangeValue,
}) => {
	useEffect(() => {
		getSavedFilter();
	}, []);

	/**
	 * Busca no local storage a última opção salva.
	 */
	const getSavedFilter = async (): Promise<void> => {
		const selected = await StorageService.retrieve(storageKey);
		let filter = selected != null ? selected : '0';
		onChangeValue(filter);
	};

	/**
	 * Salva a opção selecionado no local storage e chama o método do pai.
	 * @param {String} selected O valor selecionado
	 */
	const changeValue = useCallback(async (selected: string): Promise<void> => {
		await StorageService.save(storageKey, selected);
		onChangeValue(selected);
	}, []);

	/**
	 * Converte as opções do filtro em JSX para renderização
	 * @returns O JSX para renderização
	 */
	const getOptions = (): JSX.Element[] => {
		return options.map((option, index) => {
			return (
				<Button
					key={index.toString()}
					onPress={() => changeValue(index.toString())}>
					<RadioButton value={index.toString()} color={colors.accent} />
					<OptionText>{option}</OptionText>
				</Button>
			);
		});
	};

	return (
		<SwipeablePanel
			isActive={visible}
			onClose={onClose}
			noBar
			style={{backgroundColor: colors.primary}}
			closeOnTouchOutside={true}>
			<View>
				<Title>{title}</Title>
				<RadioButton.Group onValueChange={changeValue} value={value}>
					{getOptions()}
				</RadioButton.Group>
			</View>
		</SwipeablePanel>
	);
};

export default Filter;
