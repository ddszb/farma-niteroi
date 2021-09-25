import React, {useContext} from 'react'
import { TouchableOpacity, Linking } from 'react-native'
import { Platform } from 'react-native'
import {FlatList, View} from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import AppContext from '../../context/context'
import colors from '../../styles/colors'
import { CardBox, CardContent, Container, Name, LightText,
    Text, Phones, VPadding, HPadding, InfoSide, IconSide,
    PhoneNumber } from './styles'


export default props =>{
    
    const {state, dispatch} = useContext(AppContext)

    const __dialCall = (phone) =>{        
        var number = phone.replace('-','')
        Linking.openURL('tel:' +number)
    }

    const __openMaps = (poli) =>{
        const url = Platform.select({
            ios: `maps:0,0?q=${poli.nome + " - " + poli.endereco + "," + poli.bairro }`,
            android: `geo:0,0?q=${poli.nome + " - " + poli.endereco + "," + poli.bairro}`,
        })
        Linking.openURL(url)
    }

    const __getPhoneNumber = (poli) =>{
        return poli.telefones.map( p =>{
            return (
                <TouchableOpacity
                    key={p}
                    onPress={ () => __dialCall(p)}>
                    <HPadding>
                        <PhoneNumber>{p}</PhoneNumber>
                    </HPadding>
                </TouchableOpacity>
            )
        })

    }


    const __getPoliItem = ({item : poli}) =>{
        return (
            <CardBox>
                <CardContent>
                    <InfoSide>
                        <Name>{poli.nome}</Name>
                        <LightText>{poli.endereco},</LightText>
                        <Text>{poli.bairro}</Text>
                        <VPadding>
                            <Text>Tel.:</Text>
                            <Phones>
                                {__getPhoneNumber(poli)}
                            </Phones>
                        </VPadding>
                    </InfoSide>
                    <IconSide>
                        <TouchableOpacity
                            onPress={ () => __openMaps(poli)}>
                            <Icon name="map" type="entype" size={50} color={colors.primary}/>
                            <Text style={{ textAlign: 'center'}}>Ver no mapa</Text>
                        </TouchableOpacity>
                    </IconSide>
                </CardContent>
            </CardBox>
        )

    } 

    return(
        <Container>
            <FlatList
            keyExtractor={user => user.id.toString()}
            data={state.polis}
            renderItem={__getPoliItem}
            />
        </Container>

    )
}
