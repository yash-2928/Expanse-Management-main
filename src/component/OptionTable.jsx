import { useState } from "react";
import { getTypeOfExpanse, addTypeOfExpanse, getTypeOfPayment, addTypeOfPayment } from "../service/expanseService";
import { Button } from "react-bootstrap";
import "../style/Admin.css";

function OptionExpanseTable() {
  const [name, setName]= useState();
  const [refresh, setRefresh]= useState(true);
  
  const addOption = (e) => {
      addTypeOfExpanse(name);
      setRefresh(false);
      setName("")
  };


  return (
    <div className="table">
      <table>
        <tr>
          <th>Expanse Type</th>
        </tr>
        {getTypeOfExpanse().map((data) => (
          <tr>
            <td>{data.name}</td>
          </tr>
        ))}
        <tr>
          <td>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <Button
              onClick={addOption}
              className="expanse-btn"
              variant="primary"
            >
              Add
            </Button>
          </td>
        </tr>
      </table>
    </div>  
  );
};

function OptionPaymantTable() {
  const [paymentName, setPaymentName]= useState();
  const [refresh, setRefresh]= useState(true);
  
  const addPaymentOption = (e) => {
      addTypeOfPayment(paymentName);
      setRefresh(false);
      setPaymentName("")
  };


  return (
    <div className="table" style={{marginLeft: "400px"}}>
      <table>
        <tr>
          <th>Payment Types</th>
        </tr>
        {getTypeOfPayment().map((data) => (
          <tr>
            <td>{data.name}</td>
          </tr>
        ))}
        <tr>
          <td>
            <input value={paymentName} onChange={(e) => setPaymentName(e.target.value)} />
            <Button
              onClick={addPaymentOption}
              className="expanse-btn"
              variant="primary"
            >
              Add
            </Button>
          </td>
        </tr>
      </table>
    </div>  
  );
};



export  { OptionExpanseTable, OptionPaymantTable };
