 const months = [
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
    "December"
]

export function Months()
{
  return months
}

export function convertStringToDate(str){
  let day = parseInt(str.split("-")[2]);
  let month = parseInt(str.split("-")[1] - 1);
  let year = parseInt(str.split("-")[0]);
  return new Date(year, month, day);
}