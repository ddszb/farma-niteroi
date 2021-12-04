
import PushNotification from 'react-native-push-notification'
import moment from 'moment'
import 'moment/locale/pt-br'

/**
 * Cria ou atualiza uma notificação agendada para uma dose 
 * @param {*} dose A dose cuja notificação deve ser criada ou atualizada
 */
const scheduleDoseNotification = (dose) =>{
    let params = {
        channelId: "dose-alert-channel",
        title: "Tomar medicamento",
        id: dose.id,
        message: `${dose.medName} - ${dose.amount} ${dose.unit.label} ${dose.amount == 1 ? "" : "s"}`,
        bigText: `<b><font color=\"${dose.iconColor}\">${dose.medName}</b></font> - ${dose.amount} ${dose.unit.label}${dose.amount == 1 ? "" : "s"}`,
        subText: `${moment(dose.date).format("HH:mm")}`,
        tag: dose.medName,
        date: dose.date,
    }
    createNotification(params)
}

/**
 * Cria uma notificação agendada com parâmetros de configuração.
 * @param {Object} params Os parametros da notificação.
 * @returns 
 */
const createNotification = async (params) =>{
    PushNotification.localNotificationSchedule({
        ...params,
        allowWhileIdle: true,
        vibrate: true,
        largeIcon: "",
        vibration: 300,
        playSound: true,
        repeatTime: 1
    })
}

/**
 * Remove uma lista de notificações pelos identificadores.
 * @param {List<Number>} ids  Lista de ids de notificações que devem ser removidas.
 */
const cancelNotification = async (ids) =>{
    ids.forEach( id =>{
        PushNotification.cancelLocalNotification(id.toString())
    })
}

export {scheduleDoseNotification, createNotification, cancelNotification}