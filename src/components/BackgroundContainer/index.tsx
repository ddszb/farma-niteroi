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
}
const BackgroundContainer: React.FC<BackgroundContainerProps> = ({
	header,
	headerRight,
	onHeaderPressRight,
	title,
	keyboardAvoidingView,
	children,
}) => {
	const navigation =
		useNavigation<DrawerNavigationProp<DrawerNavigatorParamList>>();

	const onHeaderPressLeft = useCallback((): void => {
		navigation.toggleDrawer();
	}, [navigation]);
	return (
		<SafeArea>
			<KeyboardAvoidingView style={{flex: 1}} enabled={keyboardAvoidingView}>
				<Container>
					<ScrollView
						contentContainerStyle={{flexGrow: 1}}
						nestedScrollEnabled
						keyboardShouldPersistTaps="handled">
						{header && (
							<Header
								title={title}
								rightButton={headerRight}
								onPressLeft={onHeaderPressLeft}
								onPressRight={onHeaderPressRight}
							/>
						)}
						{children}
					</ScrollView>
				</Container>
			</KeyboardAvoidingView>
		</SafeArea>
	);
};

export default BackgroundContainer;
