import React from 'react'
import { Container, TipRow, TipText, TipView, Title, Subtitle, TopBackground, BottomBackground} from './styles'
import mensagens from './mensagens'
import { FlatList } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import Header from '../../components/Header'
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
        <>
        <Header 
        title="Dicas de Saúde"
        onPressLeft={() => props.navigation.toggleDrawer()}/>
        <Container>
            <TopBackground>
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
        </>
    )
}

