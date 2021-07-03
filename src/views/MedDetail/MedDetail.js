import React from 'react'
import { TouchableOpacity } from 'react-native'
import { ToastAndroid , Pressable} from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons'
import iconMoonConfig from '../../selection.json'
import {Container, RowView, MedName, HPadding,
    VPadding, InfoTitle, InfoText, Bottom, ButtonView,
    RightButtonText, LeftButtonText, Button} from './styles'

export default props =>{
    
    const {med, screen} = props.route.params
    const MedIcon = createIconSetFromIcoMoon(iconMoonConfig)

    return (
        <Container>
            <VPadding>
                <RowView>
                    <MedIcon name={med.icon} size={40} color={med.iconColor}/> 
                    <HPadding>
                        <MedName style={{color: med.iconColor}}>{med.name}</MedName>
                    </HPadding>
                    {med.isOffered &&
                    <HPadding>
                        <Pressable
                            onPress={ () => {
                                ToastAndroid.showWithGravityAndOffset("Este medicamento é oferecido pela prefeitura de niterói!",
                                ToastAndroid.SHORT,
                                ToastAndroid.TOP,
                                0, 180)
                            }}>
                            <Icon name="new" type="entypo" size={30} color="#eb6134"/>
                        </Pressable>
                    </HPadding>}
                    
                </RowView>
            </VPadding>
            <VPadding>
                <InfoTitle>{med.daysLeft} dias</InfoTitle>
                <InfoText>restantes</InfoText>
            </VPadding>
            {med.expireDate &&
            <VPadding>
                <InfoTitle>Validade</InfoTitle>
                <InfoText>{med.expireDate.format("'dd/mm/yyy'")}</InfoText>
            </VPadding>}
            <VPadding>
                <InfoTitle>Estoque</InfoTitle>
                <InfoText>Lorem ipsum </InfoText>
            </VPadding>
            {med.notes &&
            <VPadding>
                <InfoTitle>Notas</InfoTitle>
                <InfoText>{med.notes}</InfoText>
            </VPadding>}
            <Bottom>
                <ButtonView>
                    <TouchableOpacity>
                        <Button>
                            <LeftButtonText>
                                Pausar Tratamento
                            </LeftButtonText>
                        </Button>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Button>
                            <RightButtonText>
                                Acabar Tratamento
                            </RightButtonText>
                        </Button>
                    </TouchableOpacity>

                </ButtonView>
            </Bottom>

        </Container>
    )
}