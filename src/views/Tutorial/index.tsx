import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
	ScrollView,
	Dimensions,
	TouchableOpacity,
	NativeSyntheticEvent,
	NativeScrollEvent,
} from 'react-native';
import colors from '../../styles/colors';
import tips from './messages';
import {useNavigation, useScrollToTop} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storageKeys from '../../constants/storageKeys';

import {
	DescriptionView,
	DescriptionText,
	ImageView,
	Image,
	ButtonText,
	PageView,
	PaginationView,
	PaginationDot,
	DescriptionTitle,
	Button,
} from './styles';
import {StorageService} from '../../services';
import {DrawerNavigatorParamList} from '../../navigation/DrawerNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';

const width = Dimensions.get('window').width;

const Tutorial: React.FC = () => {
	const scrollRef = useRef<ScrollView>(null);
	useScrollToTop(scrollRef);

	const navigation =
		useNavigation<DrawerNavigationProp<DrawerNavigatorParamList>>();
	const [page, setPage] = useState(0);
	const [tipsToShow, setTipsToShow] = useState(tips);

	useEffect(() => {
		const checkFirstAccess = async (): Promise<void> => {
			const lastAccess = await StorageService.retrieve('lastAccess');
			console.log('lastAccess:', lastAccess);
			if (!!lastAccess) {
				setTipsToShow(tips.slice(1));
			}
		};
		checkFirstAccess();
	}, []);

	/**
	 *
	 */
	const saveNewAccess = async (): Promise<void> => {
		let lastAccess = new Date();
		await AsyncStorage.setItem(storageKeys.LAST_ACCESS, lastAccess.toString());
	};

	/**
	 * Atualiza a página de acordo com a posição relativa do ScrollView para controlar a paginação
	 * @param {NativeSyntheticEvent<NativeScrollEvent>} event
	 */
	const setSliderPage = (
		event: NativeSyntheticEvent<NativeScrollEvent>,
	): void => {
		const currentPage = page;
		const {x} = event.nativeEvent.contentOffset;
		const indexOfNextScreen = Math.floor(x / (width - 20));
		if (indexOfNextScreen !== currentPage) {
			setPage(indexOfNextScreen);
		}
	};

	/**
	 * Decide se deve renderizar a imagem da página de tutorial para melhorar performance.
	 * A renderização ocorre para a página atual, anterior e a próxima.
	 * @param {number} index O índice da página
	 * @returns "true" se for renderizar, "false" caso contrário.
	 */
	const renderImg = (index: number): boolean => {
		return index > page - 1 && index < page + 1;
	};

	/**
	 * Ação do botão final do tutorial.
	 * Reseta a paginação do tutorial e volta o stack de navegação para a página anterior.
	 */
	const confirm = useCallback(() => {
		setPage(0);
		if (scrollRef && scrollRef.current) {
			scrollRef.current.scrollTo({x: 0, y: 0});
		}
		saveNewAccess();
		navigation.goBack();
	}, []);

	/**
	 * Renderiza cada página do tutorial
	 * @returns JSX da página a ser renderizada.
	 */
	const getItems = () => {
		return tipsToShow.map((tip, index) => {
			return (
				<PageView key={index.toString()}>
					{tip.img != null && renderImg(index) && (
						<ImageView>
							<Image source={tip.img} />
						</ImageView>
					)}
					<DescriptionView>
						{tip.title && <DescriptionTitle>{tip.title}</DescriptionTitle>}
						<DescriptionText>{tip.text}</DescriptionText>
						{page == tipsToShow.length - 1 && (
							<TouchableOpacity onPress={confirm}>
								<Button>
									<ButtonText> Entendido!</ButtonText>
								</Button>
							</TouchableOpacity>
						)}
					</DescriptionView>
				</PageView>
			);
		});
	};

	/**
	 * Cria "dots" indicadores de paginação do ScrollView horizontal para renderização
	 * @returns JSX dos indicadores de página
	 */
	const getPagination = (): JSX.Element => {
		return (
			<PaginationView>
				{Array.from(Array(tipsToShow.length).keys()).map((key, index) => (
					<PaginationDot
						style={{opacity: page === index ? 1 : 0.2}}
						key={index}
					/>
				))}
			</PaginationView>
		);
	};

	return (
		<>
			<ScrollView
				ref={scrollRef}
				style={{backgroundColor: colors.grey13}}
				horizontal={true}
				scrollEventThrottle={16}
				pagingEnabled={true}
				showsHorizontalScrollIndicator={false}
				onScroll={setSliderPage}>
				{getItems()}
			</ScrollView>
			{getPagination()}
		</>
	);
};

export default Tutorial;
