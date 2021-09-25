import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 40px;
`

export const Button = styled.View`
    border-width: 1px;
    border-color: ${colors.grey12};
    border-radius: 50px;
    padding-left: 25px;
    padding-right: 25px;
    padding-top: 15px;
    padding-bottom: 15px;
    width: 250px;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: ${colors.primary};
`
    
export const ButtonText = styled.Text`
    color: ${colors.white};
    font-size: 20px;
    font-weight: bold;
    text-align: center;
`

export const Text = styled.Text`
    font-size: 18px;
    color: ${colors.grey6};
    text-align: center;
`