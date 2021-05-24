import React, {createContext, useReducer} from 'react'
import users from '../data/meds'


{/*
    Context API (Hook): Compartilhar informações dentro de toda a árvore de componentes
    UsersContext: Nesse contexto, compartilha a lista de usuários(nesse caso, o contexto da aplicação inteira)
    Para acessar dentro de um componente, utilizar useContext:
    const { state } = useContext(UsersContext)

    UseReducer (Hook): Gerenciamento do contexto, para evoluir o contexto

*/}
const initialState = { users }

const AppContext = createContext({})

const actions = {

    updateUser(state, action){
        const userUpdated = action.payload
        return {
            ...state,
            users: state.users.map( u => u.id === userUpdated.id ? userUpdated : u)
        }
        
    },

    createUser(state, action){
        const user = action.payload
        user.id =  Math.random() * 100
        return {
            ...state,
            users: [...state.users, user],
        }
    },
    deleteUser(state, action){
        const user = action.payload
        return { ...state,
                users: state.users.filter( x => x.id !== user.id)}
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
        {/* Tudo que ficar dentro de UsersProvider dentro de App.js será renderizado*/}
            {props.children}
        </AppContext.Provider>
    )
}

// Contexto padrao
export default AppContext
    
 