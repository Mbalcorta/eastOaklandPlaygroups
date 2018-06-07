const today = new Date()
const currentDate = today.getDate()
const formattedCurrentDate = ("0" + currentDate).slice(-2)
const currentMonth = today.getMonth()
const formattedCurrentMonth = ("0" + (currentMonth + 1)).slice(-2)
const currentYear = today.getFullYear()
const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const date = monthList[currentMonth]+ ' '+currentDate+' '+currentYear

export default date