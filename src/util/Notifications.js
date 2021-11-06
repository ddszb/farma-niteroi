
import PushNotification from 'react-native-push-notification'

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
        tag: dose.medName,
        date: dose.date
    }
    createNotification(params)
}

const createNotification = async (params) =>{
    PushNotification.localNotificationSchedule({
        ...params,
        allowWhileIdle: true,
        playSound: false,
        repeatTime: 1
    })

    return PushNotification.getScheduledLocalNotifications((notifications) => {
        console.log(notifications.slice(-1)[0] )
        return notifications.slice(-1)[0]        
    })
    
}

export {scheduleDoseNotification, createNotification}