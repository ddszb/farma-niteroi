import React, {createContext, useReducer} from 'react'
import meds from '../data/meds'
import polis from '../data/polis'


{/*
    Context API (Hook): Compartilhar informações dentro de toda a árvore de componentes
    AppContext: Nesse contexto, compartilha a lista de usuários(nesse caso, o contexto da aplicação inteira)
    Para acessar dentro de um componente, utilizar useContext:
    const { state } = useContext(AppContext)

    UseReducer (Hook): Gerenciamento do contexto, para evoluir o contexto

*/}
const initialState = { meds, polis }

const AppContext = createContext({})

const actions = {

    updateMed(state, action){
        const medUpdated = action.payload
        return {
            ...state,
            meds: state.meds.map( u => u.id === medUpdated.id ? medUpdated : u)
        }
        
    },

    createMed(state, action){
        const med = action.payload
        med.id =  Math.random() * 100
        return {
            ...state,
            meds: [...state.meds, med],
        }
    },
    deleteMed(state, action){
        const med = action.payload
        return { ...state,
                meds: state.meds.filter( x => x.id !== med.id)}
    }
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
    
 