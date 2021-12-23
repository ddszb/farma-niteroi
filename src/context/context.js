import React, {createContext, useReducer} from 'react'

{/*
    Context API (Hook): Compartilhar informações dentro de toda a árvore de componentes
    AppContext: Nesse contexto, compartilha a lista de usuários(nesse caso, o contexto da aplicação inteira)
    Para acessar dentro de um componente, utilizar useContext:
    const { state } = useContext(AppContext)

    UseReducer (Hook): Gerenciamento do contexto, para evoluir o contexto

*/}
const initialState = {}

const AppContext = createContext({})

const actions = {

}

export const AppProvider = props =>{

    function reducer(state, action){
        const fn = actions[action.type]
        return fn ? fn(state, action) : state
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        // Deve envolver a aplicação inteira
        // É possível acessar os dados via contexto em vez de props
        <AppContext.Provider value={{ state, dispatch }}>
        {/* Tudo que ficar dentro de medsProvider dentro de App.js será renderizado*/}
            {props.children}
        </AppContext.Provider>
    )
}

// Contexto padrao
export default AppContext
    
 