

export const formatDate = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
  
    if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
      return ({
        "date": `Hoy ${date.getDate()}`,
        "month":  getMonthName(date.getMonth()),
        "year": date.getFullYear(),
        "hours": formatTime(date),
        "groups": `Hoy ${date.getDate()}-${getMonthName(date.getMonth())}-${date.getFullYear()}`

      })
    //   `hoy ${date.getDate()} de ${getMonthName(date.getMonth())}  ${formatTime(date)}`;
    } else {
      return ({
        "date": `${date.getDate()}`,
        "month":  getMonthName(date.getMonth()),
        "year": date.getFullYear(),
        "hours": formatTime(date),
      

      })
      
    //   `${date.getDate()} de ${getMonthName(date.getMonth())} ${date.getFullYear()} a las ${formatTime(date)}`;
    }
  };
  
  export const getMonthName = (month) => {
    const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    return monthNames[month];
  };
  
  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    return `${formattedHours}:${formattedMinutes} ${amPm}`;
  };
  