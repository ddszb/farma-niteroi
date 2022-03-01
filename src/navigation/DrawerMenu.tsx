import React, {useCallback} from 'react';

import {
	View,
	StyleSheet,
	Alert,
	BackHandler,
	Linking,
	Text,
} from 'react-native';
import {Avatar, Title, Caption, Drawer} from 'react-native-paper';
import {
	DrawerContentComponentProps,
	DrawerContentScrollView,
	DrawerItem,
	DrawerNavigationProp,
} from '@react-navigation/drawer';
import colors from '../assets/colors';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigatorParamList} from './DrawerNavigator';

const URL_PREFEITURA = 'http://www.niteroi.rj.gov.br/';

const DrawerMenu: React.FC<DrawerContentComponentProps> = props => {
	const navigation =
		useNavigation<DrawerNavigationProp<DrawerNavigatorParamList>>();

	const onPressExit = useCallback(() => {
		Alert.alert('Sair', 'Deseja sair do aplicativo?', [
			{
				text: 'Não',
				onPress() {
					return;
				},
			},
			{
				text: 'Sim',
				onPress() {
					BackHandler.exitApp();
				},
			},
		]);
		return;
	}, []);

	return (
		<View style={{flex: 1, backgroundColor: colors.background}}>
			<DrawerContentScrollView {...props}>
				<View style={styles.drawerContent}>
					<View style={styles.userInfoSection}>
						<View style={{flexDirection: 'row', marginTop: 10}}>
							<Avatar.Image
								source={{uri: 'https://i.imgur.com/q1ZokFo.png'}}
								size={50}
							/>
							<View style={{marginLeft: 15, flexDirection: 'column'}}>
								<Title style={styles.title}>Minha Farmácia Pessoal</Title>
								<Caption style={styles.caption}>Niterói</Caption>
							</View>
						</View>
					</View>
					<Drawer.Section style={styles.drawerSection}>
						<Text style={styles.section}>Meus dados</Text>
						<Item
							icon="home"
							label="Doses do Dia"
							onPress={() => {
								navigation.reset({index: 0, routes: [{name: 'Home'}]});
								props.navigation.closeDrawer();
							}}
						/>
						<Item
							icon="medkit"
							label="Meus Medicamentos"
							onPress={() => {
								navigation.reset({index: 0, routes: [{name: 'MedsList'}]});
								props.navigation.closeDrawer();
							}}
						/>
					</Drawer.Section>
					<Drawer.Section style={styles.drawerSection}>
						<Text style={styles.section}>Prefeitura de Niterói</Text>
						<Item
							icon="search"
							label="Procurar Medicamentos"
							onPress={() => {
								navigation.reset({index: 0, routes: [{name: 'Search'}]});
								props.navigation.closeDrawer();
							}}
						/>
						<Item
							icon="md-book"
							label="Dicas de Saúde"
							onPress={() => {
								navigation.reset({index: 0, routes: [{name: 'Info'}]});
								props.navigation.closeDrawer();
							}}
						/>
						<Item
							icon="link"
							label="Site Oficial da Prefeitura"
							onPress={() => Linking.openURL(URL_PREFEITURA)}
						/>
					</Drawer.Section>
					<Drawer.Section style={styles.drawerSection}>
						<Text style={styles.section}>Outros</Text>
						<Item
							icon="document-text"
							label="Tutorial"
							onPress={() =>
								navigation.navigate('Tutorial', {hideWelcome: true})
							}
						/>
						<Item
							icon="information-circle"
							label="Sobre"
							onPress={() => {
								navigation.reset({index: 0, routes: [{name: 'About'}]});
								props.navigation.closeDrawer();
							}}
						/>
					</Drawer.Section>
					<DrawerItem
						icon={({color, size}) => (
							<Icon
								name="exit-to-app"
								type="material-community"
								color={colors.alert}
								size={size}
							/>
						)}
						label="Sair"
						labelStyle={{color: colors.grey12}}
						onPress={onPressExit}
					/>
				</View>
			</DrawerContentScrollView>
		</View>
	);
};

export default DrawerMenu;

interface ItemProps {
	icon: string;
	label: string;
	onPress(): void;
}
const Item: React.FC<ItemProps> = ({icon, label, onPress}) => {
	return (
		<DrawerItem
			icon={({color, size}) => (
				<Ionicons name={icon} color={colors.grey12} size={size} />
			)}
			label={label}
			labelStyle={{color: colors.grey12}}
			onPress={onPress}
		/>
	);
};

const styles = StyleSheet.create({
	drawerContent: {
		flex: 1,
		backgroundColor: colors.background,
	},
	userInfoSection: {
		paddingLeft: 6,
	},
	title: {
		fontSize: 16,
		color: colors.accent,
		fontWeight: 'bold',
	},
	caption: {
		fontSize: 14,
		lineHeight: 14,
		color: colors.grey12,
	},
	row: {
		marginTop: 20,
		flexDirection: 'row',
		alignItems: 'center',
	},
	section: {
		color: colors.accent,
		fontSize: 18,
		marginLeft: 15,
		marginVertical: 15,
	},
	paragraph: {
		fontWeight: 'bold',
		marginRight: 3,
	},
	drawerSection: {
		marginTop: 10,
	},
	bottomDrawerSection: {
		marginBottom: 15,
		borderTopColor: colors.grey14,
		borderTopWidth: 1,
	},
	preference: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
});
