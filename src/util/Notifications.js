
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
        date: dose.date
    }
    createNotification(params)
}

const createNotification = async (params) =>{
    PushNotification.localNotificationSchedule({
        ...params,
        allowWhileIdle: true,
        vibrate: true,
        largeIcon: "",
        vibration: 300,
        playSound: false, //todo ativar
        repeatTime: 1
    })

    return PushNotification.getScheduledLocalNotifications((notifications) => {
        console.log(notifications.slice(-1)[0] )
        return notifications.slice(-1)[0]        
    })
    
}

export {scheduleDoseNotification, createNotification}