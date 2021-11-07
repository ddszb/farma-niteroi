import React, {useState, useEffect} from 'react'

// Libs e Hooks
import {useFocusEffect} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import 'moment/locale/pt-br'
// Estilos
import {Container, TopView} from './styles'
// Enums
import doseStatus from '../../constants/doseStatus'
import doseActions from '../../constants/doseActions'
import storageKeys from '../../constants/storageKeys'
import medStatus from '../../constants/medStatus'
//Utilitário
import * as Calculate from '../../util/UtilitarioCalculo'
// Componentes
import EditDoseModal from './components/EditDoseModal'
import Header from '../../components/Header'
import PrimaryButton from '../../components/PrimaryButton'
import DoseFilter from '../../components/Filter'
import DateFilter from './components/DateFilter'
import DoseList from './components/DoseList'
import { Button } from 'react-native'
import { scheduleDoseNotification, createNotification } from '../../util/Notifications'
import PushNotification from 'react-native-push-notification'

const filterOptions = { ALL: '0', NOT_TAKEN: '1', TAKEN: '2'}

export default props =>{

    const [meds, setMeds] = useState([])
    const [visibleDoses, setVisibleDoses] = useState([])
    const [filterOption, setFilterOption] = useState('0')
    const [showFilter, setShowFilter] = useState(false)
    const [filterDay, setFilterDay] = useState(new Date())
    const [editedDose, setEditedDose] = useState()
    const [showEditDoseModal, setShowEditDoseModal] = useState(false)
    
    /**
     * (testes) Limpa o local storage
     */
    clearAsyncStorage = async() => {
        AsyncStorage.clear();
        setMeds([])
        setVisibleDoses([])
    }

    /**
     * Persiste os medicamentos atualizados.
     */
    const updateMeds = async () =>{
        AsyncStorage.setItem(storageKeys.MEDS, JSON.stringify(meds))
    }

    /**
     * Verifica no local storage se é o primeiro acesso do usuário. 
     * Se sim, direciona para a tela de tutorial.
     */
    const checkFirstTime = async () =>{
        const hideTutorial = await AsyncStorage.getItem(storageKeys.FIRST_LOGIN)
        if(!hideTutorial){
            props.navigation.navigate("Tutorial")
        }
    }

    /**
     * Carrega os medicamentos da fonte de dados.
     */
    const getMeds = async () =>{
        const medsString = await AsyncStorage.getItem(storageKeys.MEDS)
        const meds = JSON.parse(medsString) || []
        setMeds(meds)
    }

    /**
     * Callback para quando a tela entra em foco para carregamento de dados.
     */
    useFocusEffect(
        React.useCallback(() =>{
        getMeds()
        checkFirstTime()
    }, []))

    /**
     * Atualiza a lista de doses visíveis sempre que há uma atualização na lista de medicamentos,
     * data filtrada ou opção de filtro selecionada.
     */
    useEffect(() =>{
        if((meds && meds.length > 0) && filterDay && filterOption != null){
            filterDoses()
        }
    }, [meds, filterDay, filterOption])

    /**
     * Navega para a tela de Adicionar Dose.
     */
    const navigateToNew = () =>{
        props.navigation.navigate('Adicionar Dose', {screen: 'Adicionar Dose', meds: meds})
    }

    /**
     * Retorna as opções disponíveis para o filtro de doses visíveis.
     * @returns A lista com as opções
     */
    const getFilterOptions = () =>{
        return ["Todas as doses", "Apenas não tomadas", "Apenas tomadas"]
    }

    /**
     * Seleciona as doses vísiveis de acordo com a data e opção de filtro selecionados
     */
    const filterDoses = () =>{
        var allDoses = [].concat.apply([], meds.map( m => m.doses)) // Concatena todas as doses de todos os medicamentos
        let visible = allDoses.filter( d => (moment(d.date).isSame(filterDay, 'day') || moment(d.dateTaken).isSame(filterDay, 'day')) && d.status !== doseStatus.ENCERRADA)
        visible = visible.sort((a,b) => a.dateTaken ? a.dateTaken : a.date  - b.dateTaken ? b.dateTaken : b.date)
        
        if(filterOption == filterOptions.TAKEN){
            visible = visible.filter( d => d.status == doseStatus.TOMADA )
        }else if(filterOption == filterOptions.NOT_TAKEN){
            visible = visible.filter( d => d.status == doseStatus.NAO_TOMADA)
        }
        setVisibleDoses(visible)
    }

    /**
     * Verifica se a dose selecionada é do mesmo dia ou foi tomada 
     * no dia atual para exibição da modal de ajuste de dose.
     * @param {*} dose A dose selecionada.
     */
    const onPressDose = dose =>{
        if(moment().isSame(dose.date, 'day') || moment().isSame(dose.dateTaken, 'day')){
            setEditedDose(dose)
            setShowEditDoseModal(true)
        }
    }
    
    /**
     * Atualiza a opção de filtro selecionada e fecha o painel do filtro.
     * @param {String} value O valor selecionado
     */
    const onChangeDoseFilterValue = (value) =>{
        setFilterOption(value)
        setShowFilter(false)
    }
        
    /**
     * Atualiza a data filtrada e filtra as doses de acordo com a data.
     * @param {*} date A data selecionada
     */
    const onChangeDate = (date) =>{
        setFilterDay(date)
        filterDoses()
    }

    /**
     * Direciona a dose editada para ser atualiza de acordo com 
     * o que foi feito na modal de ajuste de dose.
     * @param {*} dose A dose a ser atualizada
     */
    const onEditDose = dose =>{
        if(dose.status ==  doseStatus.TOMADA){
            updateDose(dose, doseActions.EDITAR_DOSE_TOMADA)
        }else if(dose.status == doseStatus.NAO_TOMADA){
            if(dose.newDate && !dose.dateTaken){
                updateDose(dose, doseActions.EDITAR_DOSE_NAO_TOMADA)    
            }else{
                updateDose(dose, doseActions.TOMAR_DOSE)
            }
        }
        setShowEditDoseModal(false)
    }

    /**
     * Atualiza uma dose para persistencia de acordo com a ação definida.
     * @param {*} dose A dose que deve ser atualizada.
     * @param {Number} action A ação a ser tomada.
     */
    const updateDose = (dose, action) =>{
        var medList = [...meds]
        var updatedMed = medList.filter(m => m.name == dose.medName && m.status == medStatus.ATIVO )[0]
        var updatedDose = updatedMed.doses.filter(d => dose.medName == d.medName && d.index == dose.index )[0]

        if(updatedDose){
            let newStock = Calculate.newStockAfterDose(updatedMed, dose)
            switch(action){
                case doseActions.TOMAR_DOSE:
                    updatedMed.stock.amount = newStock
                    dose.status = doseStatus.TOMADA
                    break
                case doseActions.EDITAR_DOSE_TOMADA:  
                    updatedMed.stock.amount = newStock + + updatedDose.amount
                    break
                case doseActions.EDITAR_DOSE_NAO_TOMADA:
                    dose.date = dose.newDate
                    scheduleDoseNotification(dose)
                    break
            }
        }

        updatedMed.doses = updatedMed.doses.map( d => d.index == dose.index ? dose : d) 

        setMeds(medList)
        updateMeds()
    }

    return(
        <Container>
            {/* <Button onPress={clearAsyncStorage} title="Limpar"/> */}
            {showEditDoseModal &&
                <EditDoseModal
                visible={showEditDoseModal}
                dose={editedDose}
                onSet={onEditDose}
                close={() => setShowEditDoseModal(false)}
                />}
            <DoseFilter
                visible={showFilter}
                options={getFilterOptions()}
                title={"Filtrar Doses"}
                storageKey={storageKeys.HOME_FILTER}
                onClose={() => setShowFilter(false)}
                value={1}
                onChangeValue={onChangeDoseFilterValue}/>
            <Header 
                title="Doses do Dia"
                rightButton="filter"
                onPressRight={() => setShowFilter(true)}
                onPressLeft={() => props.navigation.toggleDrawer()}/>
            <TopView>
                <DateFilter
                date={filterDay}
                onChangeDate={onChangeDate}/>
                <DoseList 
                    visibleDoses={visibleDoses}
                    onPressDose={onPressDose}/>
            </TopView>  
            <PrimaryButton
                bottom
                text="Nova Dose"
                visible={meds.length > 0 && moment().isSameOrAfter(filterDay, 'date')}
                onClick={navigateToNew}/>
        </Container>
    )
}
   
