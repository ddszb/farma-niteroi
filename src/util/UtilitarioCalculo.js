export const diffDays = (d1, d2) =>{
        var _MS_PER_DAY = 1000 * 60 * 60 * 24
        var startDate = new Date(d1)
        var endDate = new Date(d2)
        const utc1 = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
        const utc2 = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
        return Math.floor((utc2 - utc1) / _MS_PER_DAY)
}
