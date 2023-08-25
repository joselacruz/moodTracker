export const formatDate = (date) => {
  const formattedDate = new Date(date);
  const year = formattedDate.getFullYear();
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0"); // Sumamos 1 al mes porque los meses son base 0
  const day = formattedDate.getDate().toString().padStart(2, "0");
  const formattedDateString = `${year}-${month}-${day}`;

  return {
    hours: formatTime(formattedDate),
    formatedData: formattedDateString,
    groups: `${day}-${getMonthName(formattedDate.getMonth())}-${year}`,
  };
};

export const getMonthName = (month) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[month];
};

const formatTime = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const amPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${amPm}`;
};
