import React from 'react';

import { View, StyleSheet, Alert, BackHandler, Linking} from 'react-native'
import {
    Avatar,
    Title,
    Caption,
    Drawer,
} from 'react-native-paper'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import colors from '../styles/colors';
import { Icon } from 'react-native-elements/dist/icons/Icon'
import Ionicons from 'react-native-vector-icons/Ionicons';


const onPressExit = () =>{
    Alert.alert('Sair', "Deseja sair do aplicativo?",
        [{ text: 'Não', onPress(){ return }}, 
         { text:'Sim', onPress() { BackHandler.exitApp()}}])
        return
}

const URL_PREFEITURA = "http://www.niteroi.rj.gov.br/"

export function DrawerContent(props){
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <Avatar.Image source={{uri: "https://i.imgur.com/q1ZokFo.png"}} size={50}/>
                            <View style={{ marginLeft: 15, flexDirection: 'column'}}>
                                <Title style={styles.title}>Minha Farmácia Pessoal</Title>
                                <Caption style={styles.caption}>Niterói</Caption>
                            </View>
                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection} title="Meus dados">
                        <DrawerItem 
                        icon={({color, size}) =>( <Ionicons name="home"  color={colors.primary} size={size}/>)}
                        label="Doses"
                        onPress={() => props.navigation.navigate("Doses")}/>
                        <DrawerItem 
                        icon={({color, size}) =>( <Ionicons name="medkit" color={colors.primary} size={size}/>)}
                        label="Medicamentos"
                        onPress={() => props.navigation.navigate("Medicamentos")}/>
                    </Drawer.Section>
                    <Drawer.Section style={styles.drawerSection} title="Prefeitura de Niterói">
                        <DrawerItem 
                        icon={({color, size}) =>( <Ionicons name="search"  color={colors.primary} size={size}/>)}
                        label="Procurar Medicamentos"
                        onPress={() => props.navigation.navigate("Procurar")}/>
                        <DrawerItem 
                        icon={({color, size}) =>( <Ionicons name="md-book" color={colors.primary} size={size}/>)}
                        label="Dicas de Saúde"
                        onPress={() => props.navigation.navigate("Informação")}/>
                        <DrawerItem 
                        icon={({color, size}) =>( <Ionicons name="link" color={colors.primary} size={size}/>)}
                        label="Site Oficial"
                        onPress={() => Linking.openURL(URL_PREFEITURA)}/>
                    </Drawer.Section>
                    <Drawer.Section style={styles.drawerSection} title="Outros">
                        <DrawerItem 
                        icon={({color, size}) =>( <Ionicons name="document-text"  color={colors.primary} size={size}/>)}
                        label="Tutorial"
                        onPress={() => props.navigation.navigate("Tutorial", {hideWelcome: true})}/>
                        <DrawerItem 
                        icon={({color, size}) =>( <Ionicons name="information-circle" color={colors.primary} size={size}/>)}
                        label="Sobre"
                        onPress={() => props.navigation.navigate("Sobre")}/>

                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) =>( <Icon name="exit-to-app" type="material-community" color={colors.grey6} size={size}/>)}
                    label="Sair"
                    onPress={onPressExit}/>
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent:{
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 6,
    },
    title:{
        fontSize: 16,
        color: colors.primary,
        fontWeight: 'bold',    
    },
    caption:{
        fontSize: 14,
        lineHeight: 14,
        color:colors.primary,
    },
    row:{
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section:{
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph:{
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection:{
        marginTop: 10,
    },
    bottomDrawerSection:{
        marginBottom: 15,
        borderTopColor: colors.grey14,
        borderTopWidth: 1
    },
    preference:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
})