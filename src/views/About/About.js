import React from 'react'

import {Container, Text} from './styles'

var pkg = require('../../../package.json')

export default props =>{
    return(
        <Container>
            <Text>
                Minha Farmácia Pessoal - Niterói
            </Text>
            <Text>
                Versão {pkg.version}
            </Text>
        </Container>   
    )
}