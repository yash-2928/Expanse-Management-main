import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Bar, Line, Pie } from "react-chartjs-2";
import "../style/MyChart.css";
import { getExpenseHistroy } from "../service/expanseService";
import { convertStringToDate, Months } from "../service/utils";

function getExpenseHistInRange(minDate, maxDate) {
  minDate = convertStringToDate(minDate);
  maxDate = convertStringToDate(maxDate);

  let list = getExpenseHistroy(true).filter((data) => {
    const dataDate = convertStringToDate(data.date);
    return dataDate <= maxDate && dataDate >= minDate;
  });
  return list;
}

function getKeyValueArray(ExpenseByType) {
  let entries = Object.entries(ExpenseByType);
  let keys = [];
  let Values = [];
  for (let i = 0; i < entries.length; i++) {
    keys.push(entries[i][0]);
    Values.push(entries[i][1]);
  }
  return [keys, Values];
}


function getAmountByMonth(barRangeData, minDate, maxDate) {
  let barAmountByMonth = {};  
 {
    const minDateObj = convertStringToDate(minDate)
    const maxDateObj = convertStringToDate(maxDate)
    const iMinDateYear = parseInt(minDateObj.getFullYear(), 10);
    const iMaxDateYear = parseInt(maxDateObj.getFullYear(), 10);
    const iminDateMonth = minDateObj.getMonth();
    const imaxDateMonth = maxDateObj.getMonth();

    for (let index = iMinDateYear; index <= iMaxDateYear; index++) {
      for( let monIndex = 0; monIndex < 12; monIndex++){
        
        // skipping outof range months
        if( (index === iMinDateYear) &&  (monIndex < iminDateMonth) )
            continue;

        if( (index === iMaxDateYear) &&  (monIndex > imaxDateMonth) )
            break;
                                
        const formtedMonth = (Months()[monIndex]).substring(0,3) + "-" + index.toString().substring(2)          
        // make formeteddata
        barAmountByMonth[formtedMonth] =0;
      }
    }
}

  for (let i = 0; i < barRangeData.length; i++) {
    let singleRecord = barRangeData[i];
    const dateObj = convertStringToDate(singleRecord["date"]);
    const formtedMonth = (Months()[dateObj.getMonth()]).substring(0,3) + "-" + dateObj.getFullYear().toString().substring(2)
          
    if (barAmountByMonth[formtedMonth] === undefined) {
      barAmountByMonth[formtedMonth] =0;
    }
    barAmountByMonth[formtedMonth] += singleRecord["amount"];
  }

  return barAmountByMonth;
}

function barChartState(barRangeData, minDate, maxDate) {
   
  let [keys, values] = getKeyValueArray(getAmountByMonth( barRangeData, minDate, maxDate) );

  return {
    labels: keys,
    datasets: [
      {
        label: "Amount",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
        data: values,
      },
    ],
  };
}


function Linestate(barRangeData, minDate, maxDate) {
  
  function getLinerGraphData() {      
    let [keys, values] = getKeyValueArray(getAmountByMonth(barRangeData, minDate, maxDate)) ;
    
    let sum = 0;    
    for( let i=0; i<values.length; i++)
    {
      sum += values[i];      
      values[i] = sum
    }
    return [keys, values] ;   
  }

  let [keys, values] = getLinerGraphData() ;


  return {
    labels: keys,
    datasets: [
      {
        label: "Amount",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)"
        ],
        borderWidth: 3,
        data: values,
      },
    ],
  };
}

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

function Piestate(ExpenseData) {
  
function getAmountByExpanseType() {
  let listAmountByExpanseType = {};

  for (let i = 0; i < ExpenseData.length; i++) {
    let singleRecord = ExpenseData[i];
    
    if (listAmountByExpanseType[singleRecord["typeOfExpanse"]] !== undefined) {
      listAmountByExpanseType[singleRecord["typeOfExpanse"]] +=
        singleRecord["amount"];
    } else {
      listAmountByExpanseType[singleRecord["typeOfExpanse"]] =
        singleRecord["amount"];
    }
  }

  return listAmountByExpanseType;
}

  let [keys, values] = getKeyValueArray(getAmountByExpanseType());

  return {
    labels: keys,
    datasets: [
      {
        label: "Expanse Type",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
        data: values,
      },
    ],
  };
}

export default function MyChart() {
  const curruntdate = new Date();

  let toDate =  new Date();
  toDate.setFullYear( toDate.getFullYear() - 1 );
  console.log(toDate.toISOString().slice(0,10), curruntdate.toISOString().slice(0,10));

  const [to, setTo] = useState(toDate.toISOString().slice(0,10));
  const [from, setForm] = useState(curruntdate.toISOString().slice(0,10));
  const [finacialYear, SetFinacialYear] = useState(curruntdate.getFullYear().toString());
  const [customYear, setCustomYear] = useState(curruntdate.getFullYear().toString());
  const [radioValue, setRadioValue] = useState("1");
  

  const dateForGraphData = () => {
    var minD;
    var maxD;

    if (radioValue === "1") {
      return [to, from];
    }

    if (radioValue === "2") {
      minD = finacialYear + "-04-01";
      maxD = (parseInt(finacialYear) + 1) + "-03-31";
      return [minD, maxD];
    }
    if (radioValue === "3") {
      minD = customYear + "-01-01";
      maxD = customYear + "-12-31";
      return [minD, maxD];
    }
  };

  function YearOptions({ isFinacialYear }) {
    let TranxHist = getExpenseHistroy();

    const y = curruntdate.getFullYear();

    let minYear = TranxHist.reduce((min, singleRecordd) => {
      var datee = singleRecordd.date;
      let slipdata = datee.split("-");
      let Year = parseInt(slipdata[0]);

      return Math.min(min, Year);
    }, y);

    let retdata = [];
    for (let i = minYear; i <= y; i++) {
      if (isFinacialYear) {
        if (i > 2009) {
          retdata.push(
            <option value={i}>
              {i} - {i + 1 - 2000}
            </option>
          );
        } else {
          retdata.push(
            <option value={i}>
              {i} - {i + 1}
            </option>
          );
        }
      } else {
        retdata.push(<option value={i.toString()}>{i}</option>);
      }
    }
    return retdata;
  }
  
  const [minDateStr,maxDateStr] = dateForGraphData();
  const RangeData = getExpenseHistInRange(minDateStr, maxDateStr);

  return (
    <>
      <div>
        <div className="selcter">
          <input
            type="radio"
            name="rad"
            value="1"
            onClick={(e) => setRadioValue(e.target.value) }
            checked={radioValue === "1"} 
          />
          <lable>Date From : </lable>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <lable> To : </lable>
          <input
            type="date"
            value={from}
            onChange={(e) => setForm(e.target.value)}
          />
        </div>

        <div>
          <lable>
            <input
              type="radio"
              name="rad"
              value="2"
              onClick={(e) => setRadioValue(e.target.value)}
              checked={radioValue === "2"} 
            />
            Finacial year :
          </lable>
          <select
            value={finacialYear}
            onChange={(e) => SetFinacialYear(e.target.value)}
          >
            <YearOptions isFinacialYear={true} />
          </select>
        </div>

        <div>
          <lable>
            <input
              type="radio"
              name="rad"
              value="3"
              onClick={(e) => setRadioValue(e.target.value)}
              checked={radioValue === "3"} 
            />
            Calender year :
          </lable>
          <select
            value={customYear}
            onChange={(e) => setCustomYear(e.target.value)}
          >
            <YearOptions isFinacialYear={false} />
          </select>
        </div>
      </div>
      <Container className="graph-main">
        <Row>
          <Col>
            <Bar
              className="bar"
              data={barChartState(
                RangeData,
                minDateStr,
                maxDateStr,
              )}
              options={{
                title: {
                  display: true,
                  text: "Average Rainfall per month",
                  fontSize: 16,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
            <Pie
              data={Piestate(RangeData)}
            />
          </Col>
          <Col>
            { <Line
              className="line"
              data={Linestate(
                RangeData,
                minDateStr,
                maxDateStr,
              )}
              options={options}
            /> }
          </Col>
        </Row>
      </Container>
    </>
  );
}
