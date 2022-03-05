import React from 'react';
import {Container, Title} from './styles';

interface CardProps {
	title?: string;
}
const CardContainer: React.FC<CardProps> = ({title, children}) => {
	return (
		<Container style={{elevation: 5}}>
			{title && <Title>{title}</Title>}
			{children}
		</Container>
	);
};

export default CardContainer;
