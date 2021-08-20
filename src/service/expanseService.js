import expanseData from "./data";
console.log(expanseData);

// fun addReminder(st date);
// fun getactivetask();
// update();
// delete
// hold
// active
// sooze(obj1,...)
// complete()
// showcompleted()


export function addData(data) {
    data["id"] = new Date().now();
    return expanseData.transactions.push(data);
  }
  
  export function deleteData(id) {
    expanseData.transactions = expanseData.transactions.filter(function (item) {
      return item.id !== id;
    });
  }
  
  //Comparer Function
  function GetSortOrder(prop, ForwradDirection) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return ForwradDirection ? 1 : -1;
      } else if (a[prop] < b[prop]) {
        return ForwradDirection ? -1 : 1;
      }
      return 0;
    };
  }
  
  export function getExpenseHistroy(order = false) {
    return expanseData.transactions.sort(GetSortOrder("date", order));
  }
  
  export function upadateData(data) {
    function indexOfID(element) {
      return element.id === data.id;
    }
  
    let index = expanseData.transactions.findIndex(indexOfID);
    expanseData.transactions[index].to = data.to;
    expanseData.transactions[index].from = data.from;
    expanseData.transactions[index].typeOfExpanse = data.typeOfExpanse;
    expanseData.transactions[index].amount = data.amount;
    expanseData.transactions[index].paymentType = data.paymentType;
    expanseData.transactions[index].refNo = data.refNo;
    expanseData.transactions[index].notes = data.notes;
  }

  //ExpanseType Data
export function getTypeOfExpanse() {
    return expanseData.ExpanseTypes;
  }
  
  export function addTypeOfExpanse(name) {
    var id = new Date().now();
    var obj = { name, id };
    return expanseData.ExpanseTypes.push(obj);
  }
  
  export function getTypeOfPayment() {
    return expanseData.PaymentTypes;
  }
  
  export function addTypeOfPayment(name) {
    var id = new Date().now();
    var obj = { name, id };
    return expanseData.PaymentTypes.push(obj);
  }
  
  //reminder
  export function addReminder(data) {
    data["id"] = new Date().now();
    return expanseData.reminder.push(data);
  }
  
  export function deleteReminder(id) {
    expanseData.reminder = expanseData.reminder.filter(function (item) {
      return item.id !== id;
    });
  }
  