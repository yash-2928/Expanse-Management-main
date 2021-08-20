// fun addReminder(st date);
// update();
// delete
// sooze(obj1,...)
// complete()
// showcompleted()

import { LocalConvenienceStoreOutlined, StayCurrentLandscape } from "@material-ui/icons";
import expanseData from "./data";

const rmd = expanseData.reminder;

/*  id: 1,
      *title: "ligth bill",
      *dateOfPayment: "2019-09-01",
      *amount: 2000,
      *repeat: { startDate: 2019-08-12 22:00, recurringType: "month" }, //start date, type(month)
      reminderBefore:{ type: "Day/month/hours/minutes" value: 2 } ,
      *notes: "notes",
      *done: false,
      *hold: true,
      *latestExucationDay: "dateobj",
      *when pop-up*snoozeTime: { snoozeType:"Week", value : 5, basetime:timeobj } */

//reminder
export function addReminder(data) {
  data["id"] = new Date().now();
  return rmd.push(data);
}

export function deleteReminder(id) {
  return rmd.filter((item) => item.id !== id);
}

function getAllRemainder() {
  return rmd;
}

export function activeRemiders() {
  let popupData = rmd.filter(
    (item) => item.hold === false && item.done === false
  );
  return popupData;
}

function getFirstNotificstonDate(item) {
  let date = item.repeat.startDate;

  if (item.reminderBefore.beforeType === "Day") {
    let yesterday = new Date();
    yesterday.setDate(date.getDate() - item.reminderBefore.value);
    console.log("Y", yesterday);
    return yesterday;
  }

  if (item.reminderBefore.beforeType === "month") {
    let lastmonth = new Date();
    lastmonth.setMonth(date.getMonth() - item.reminderBefore.value);
    return lastmonth;
  }
}


function getActiveOccurences() {
   //get all date that less then current date
   const data = rmd.filter((item) => getFirstNotificstonDate(item) <  new Date());
   console.log(data);
   return data;
}

function generateNextReminder(id) {
  let date = new Date(rmd[id].repeat.startDate);
  let newD = new Date();
  let month = rmd[id].repeat.startDate.getMonth();
  let nextReminder = [];
  for(let i = month; i < 12; i++){
    let next = date.setMonth(date.getMonth() + 1 );
    nextReminder.push(new Date(next));
  }
  console.log(nextReminder)
  return nextReminder;
}
generateNextReminder(2);

function MarkNextOccurencesAsDone(id){
  let date = new Date(rmd[id].repeat.startDate);
  let newD = new Date();
  let month = rmd[id].repeat.startDate.getMonth();
  let nextReminder = [];
  for(let i = month; i < 12; i++){
    let next = newD.setMonth(date.getMonth() + 1 );
    nextReminder.push(new Date(next));
  }
  console.log(nextReminder) 
} 

//console.log(MarkNextOccurencesAsDone(2, new Date(2021, 9, 10)));

function updateRemainder(data) {
  function indexOfID(element) {
    return element.id === data.id;
  }

  let index = rmd.findIndex(indexOfID);
  let rmdi = rmd[index];

  rmdi.title = data.title;
  rmdi.dateOfPayment = data.dateOfPayment;
  rmdi.amount = data.amount;
  rmdi.notes = data.notes;
  rmdi.done = data.done;
  rmdi.hold = data.hold;
  rmdi.latestExucationDay = data.latestExucationDay;
  rmdi.repeat.startDate = data.startDate;
  rmdi.repeat.recurringType = data.recurringType;
  rmdi.reminderBefore.beforeType = data.beforeType;
  rmdi.reminderBefore.value = data.value;
}

function snooze(data) {
  function indexOfID(element) {
    return element.id === data.id;
  }

  let index = rmd.findIndex(indexOfID);
  let rmdi = rmd[index];

  rmdi.snoozeTime.basetime = data.basetime; //currunt date
  rmdi.snoozeTime.snoozeType = data.snoozeType;
  rmdi.snoozeTime.value = data.value;
}
