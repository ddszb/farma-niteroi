import React from 'react';
import {TipRow, TipText, TipView, Subtitle} from './styles';
import messages from './messages';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import colors from '../../assets/colors';
import {BackgroundContainer} from '../../components';

const Info: React.FC = () => {
	const getTipsContent = (): JSX.Element[] => {
		return messages.tips.map((tip, index) => {
			return (
				<TipView key={index.toString()}>
					<TipRow>
						<Icon name="info" type="feather" size={20} color={colors.accent} />
						<TipText>{tip}</TipText>
					</TipRow>
				</TipView>
			);
		});
	};

	return (
		<BackgroundContainer header title={messages.title}>
			<Subtitle>{messages.subtitle}</Subtitle>
			{getTipsContent()}
		</BackgroundContainer>
	);
};

export default Info;
