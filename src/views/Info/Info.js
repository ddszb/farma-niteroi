import React from 'react'
import { Container, TipRow, TipText, TipView, Title, Subtitle, TopBackground, BottomBackground} from './styles'
import mensagens from './mensagens'
import { FlatList } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import colors from '../../styles/colors'

export default props => {
    
    const obterItemDica = ({item : dica}) =>{
        return(
            <TipView>
                <TipRow>
                    <Icon name="info" type="feather" size={20} color={colors.primary}/>
                    <TipText>
                        {dica}
                    </TipText>
                </TipRow>
            </TipView>
        )
    }

    return (
        <Container>
            <TopBackground>
                <Title>
                    {mensagens.titulo}
                </Title>
                <Subtitle>
                    {mensagens.subtitulo}
                </Subtitle>
            </TopBackground>
            <BottomBackground>
                <FlatList
                    renderItem={obterItemDica}
                    data={mensagens.dicas}
                    keyExtractor={item => item}
                />
            </BottomBackground>
        </Container>
    )
}

