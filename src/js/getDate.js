const today = new Date()
const currentDate = today.getDate()
var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
var day  = week[today.getDay()]
const formattedCurrentDate = ("0" + currentDate).slice(-2)
const currentMonth = today.getMonth()
const formattedCurrentMonth = ("0" + (currentMonth + 1)).slice(-2)
const currentYear = today.getFullYear()
const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let dayPrefix = 'th, '
if(currentDate === 1){
    dayPrefix = 'st, '
}
const date = day+', '+monthList[currentMonth]+' '+currentDate+dayPrefix+currentYear
// const date = 'Tuesday'+', '+monthList[currentMonth]+' '+currentDate+dayPrefix+currentYear
export default date