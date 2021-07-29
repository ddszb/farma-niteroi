import React, {useState} from 'react'
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image }  from 'react-native'



const imgs= [
    null,
    require('./w1.jpg'),
    require('./w2.jpg'),
    require('./w3.jpg'),
    require('./w4.jpg'),
    require('./w5.jpg'),
    require('./w6.jpg'),
    require('./w7.jpg'),
]

const texts = [
    //0
    "\t\tControle o seu estoque pessoal de medicamentos e horário de medicação facilmente através desse aplicativo.\n\n" +
    "\t\tAlém disso, nele você encontra a relação de medicamentos oferecidos gratuitamente pela Prefeitura de Niterói e também os postos de saúde onde pode encontrá-los.",
    //1
    "Na tela inicial encontram-se as doses marcadas para cada dia. Para ver as doses de algum dia específico, " +
    "basta tocar nas setas ou na data para selecionar uma data qualquer. Para voltar ao dia atual, basta clicar no ícone de calendário",
    //2
    "Para registrar uma dose tomada, basta deslizar a dose do dia desejada para a esquerda para confirmar." +
    "Só é possível marcar doses tomadas se estiverem no dia correto.",
    //3
    "Para ver todos os medicamentos atuais, basta tocar na segunda aba, \"Medicamentos\". Para ver mais detalhes do medicamento, basta tocar nele na lista.",
    //4
    "Nos detalhes é possível adicionar medicamentos ao estoque bem como finalizar o tratamento atual.",
    //5
    "Para adicionar um medicamento, basta tocar no botão + e preencher as informações corretamente.",
    //6
    "Os postos de saúde e medicamentos oferecidos pela Prefeitura de Saúde encontram-se na aba \"Pesquisa\".",
    //7
    "Leia atentamente as dicas de saúde encontradas na aba \"Informação\".\nSeguir as digas com atenção é importante para sua saúde e para eficácia de seus medicamentos!"
]

export default props =>{
    
    const [page, setPage] = useState(0)

    const getModalPageContent = () =>{
        
        return(
        <>
            {page == 0 && <Text style={styles.modalText}>Bem vindo!</Text>}
            <Text style={styles.text}>
                {texts[page]}
            </Text>
            {page > 0 &&
                <View style={styles.border}>
                    <Image 
                    style={styles.image}
                    source={imgs[page]}/>
                </View>}
            <View style={styles.buttonsRow}>
                {page > 0 &&
                    <TouchableOpacity
                        onPress={() => setPage(page - 1)}
                        style={styles.buttonBack}>
                        <Text style={styles.backText}>
                            Voltar
                        </Text>
                    </TouchableOpacity>}
                {page < 7 &&
                    <TouchableOpacity
                        onPress={() => setPage(page + 1)}
                        style={styles.buttonNext}>
                        <Text style={styles.nextText}>
                            Próximo
                        </Text>
                </TouchableOpacity>}
                {page == 7 &&
                    <TouchableOpacity
                        onPress={() => props.close()}
                        style={styles.buttonNext}>
                        <Text style={styles.nextText}>
                            Entendido
                        </Text>
                </TouchableOpacity>}
            </View>
        </>
        )
    }

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
            onRequestClose={() => props.close()}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {getModalPageContent()}
                </View>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      },
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
            },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonsRow:{
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      buttonBack:{
        borderRadius: 5,
        marginTop: 15,
        marginRight: 5,
        padding: 6,
        elevation: 1,
        backgroundColor: "#ddd",
      },
      buttonNext: {
        borderRadius: 5,
        marginTop: 15,
        marginLeft: 5,
        width: 80,
        padding: 6,
        elevation: 1,
        backgroundColor: "#63488c"
      },
      backText:{
        color: '#63488c',
        textAlign: 'center'
      },
      nextText:{
        color: '#fff',
        textAlign: 'center'
      },
      container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      input: {
        height: 40,
        width: 70,
        overflow: 'hidden' ,
        borderColor: 'gray',
        textAlign: 'center',
        color:'#444',
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 10,
        marginTop: 5,
        padding: 10
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 16,
        fontWeight: 'bold',
        color: '#63488c'
      },
      text: {
        textAlign: "justify",
        marginBottom: 5,
        marginLeft: 8,
        fontSize: 14,
        color: '#63488c'
      },
      image:{
          width: 230,
          height: 368,
          resizeMode: 'cover'
      },
      border:{
        marginTop: 10,
        borderColor: 'gray',
        borderWidth: 3
      }

})