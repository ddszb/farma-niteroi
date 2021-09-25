import React, { useState } from 'react'
import {View, Pressable} from 'react-native'
import styled from 'styled-components'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons'
import iconMoonConfig from '../../../selection.json'
import medicons from '../../../constants/medicons'
import iconColors from '../../../constants/iconColors'
import colors from '../../../styles/colors'

export default props =>{

    const MedIcon = createIconSetFromIcoMoon(iconMoonConfig)

    const [currIcon, setCurrIcon] = useState(0)
    const [currColor, setCurrColor] = useState(0)

    const prevIcon = () =>{
        var icon = currIcon == 0 ? medicons.length - 1 : currIcon - 1 
        setCurrIcon(icon)
        props.onChangeIcon(medicons[icon])
    }
    const nextIcon = () =>{
        var icon = currIcon == medicons.length - 1 ? 0 : currIcon + 1 
        setCurrIcon(icon)
        props.onChangeIcon(medicons[icon])
    }
    const prevColor = () =>{
        var color = currColor == 0 ? iconColors.length - 1 : currColor - 1 
        setCurrColor(color)
        props.onChangeColor(iconColors[color])
    }
    const nextColor = () =>{
        var color = currColor == iconColors.length - 1 ? 0 : currColor + 1 
        setCurrColor(color)
        props.onChangeColor(iconColors[color])
    }

    return(
        <Container>
            <Selector>
                <Pressable
                    onPress={prevIcon}    
                >
                    <Icon name="arrow-left" size={40} color={colors.grey8}/>
                </Pressable>
                <MedIcon name={medicons[currIcon]} size={40} color={iconColors[currColor]}/> 
                <Pressable
                    onPress={nextIcon}
                >
                    <Icon name="arrow-right" size={40} color={colors.grey8}/>
                </Pressable>
            </Selector>
            <Selector>
                <Pressable
                     onPress={prevColor}
                >
                    <Icon name="arrow-left" size={40} color={colors.grey8}/>
                </Pressable>
                <Icon name="circle" size={35} color={iconColors[currColor]}/> 
                <Pressable
                     onPress={nextColor}
                >
                    <Icon name="arrow-right" size={40} color={colors.grey8}/>
                </Pressable>
            </Selector>
        </Container>

    )
}

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 15px;
    justify-content: space-between;
`
const Selector = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-left: 15px;
    margin-right: 15px;
`
