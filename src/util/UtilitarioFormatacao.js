
export const parseDate = (date) =>{
    if(typeof(date) == "string"){
        var dayInfo = date.split("/")
        var dateObj = new Date()
        dateObj.setDate(parseInt(dayInfo[0]))
        dateObj.setMonth(parseInt(dayInfo[1]) - 1)
        dateObj.setFullYear(parseInt(dayInfo[2]))
        return dateObj 
    }
    return date
}