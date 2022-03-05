import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Header} from '..';
import {DrawerNavigatorParamList} from '../../navigation/DrawerNavigator';

import {Container, SafeArea} from './styles';

interface BackgroundContainerProps {
	children?: React.ReactNode;
	header?: boolean;
	headerLeft?: string;
	headerRight?: string;
	title: string;
	keyboardAvoidingView?: boolean;
	onHeaderPressRight?(): void;
	onHeaderPressLeft?(): void;
}
const BackgroundContainer: React.FC<BackgroundContainerProps> = ({
	header,
	headerLeft,
	headerRight,
	onHeaderPressRight,
	onHeaderPressLeft,
	title,
	keyboardAvoidingView,
	children,
}) => {
	const navigation =
		useNavigation<DrawerNavigationProp<DrawerNavigatorParamList>>();

	const onPressLeft = useCallback((): void => {
		if (onHeaderPressLeft) {
			onHeaderPressLeft();
		} else {
			navigation.toggleDrawer();
		}
	}, [navigation]);
	return (
		<SafeArea>
			<KeyboardAvoidingView style={{flex: 1}} enabled={keyboardAvoidingView}>
				<Container>
					{header && (
						<Header
							title={title}
							leftButton={headerLeft ? headerLeft : 'menu'}
							rightButton={headerRight}
							onPressLeft={onPressLeft}
							onPressRight={onHeaderPressRight}
						/>
					)}
					<ScrollView
						contentContainerStyle={{flexGrow: 1}}
						nestedScrollEnabled
						keyboardShouldPersistTaps="handled">
						{children}
					</ScrollView>
				</Container>
			</KeyboardAvoidingView>
		</SafeArea>
	);
};

export default BackgroundContainer;
