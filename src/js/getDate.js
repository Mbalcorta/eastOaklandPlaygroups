const today = new Date()
const currentDate = today.getDate()
var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
var day  = week[today.getDay()]
const formattedCurrentDate = ("0" + currentDate).slice(-2)
const currentMonth = today.getMonth()
const formattedCurrentMonth = ("0" + (currentMonth + 1)).slice(-2)
const currentYear = today.getFullYear()
const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// const date = day+', '+monthList[currentMonth]+' '+currentDate+'th, '+currentYear
const date = 'Wednesday'+', '+monthList[currentMonth]+' '+'13'+'th, '+currentYear
export default date