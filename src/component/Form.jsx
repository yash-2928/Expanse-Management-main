import React, { useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import {
  addData,
  getTypeOfExpanse,
  getTypeOfPayment,
} from "../service/expanseService";
import "../style/Form.css";

function ExpanseForm(props) {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [typeOfExpanse, setTypeOfExpanse] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [refNo, setRefNo] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let obj = {
      to,
      from,
      typeOfExpanse,
      paymentType,
      refNo,
      amount,
      notes,
      selectedFile,
      date,
    };
    addData(obj);
    props.OnCountChange();
  };

  return (
    <>
      <Form className="main" sm={12} lg={4} md={6}>
        <h3 className="font">Expanse Form</h3>
        <Form.Row>
          <Form.Group
            as={Col}
            value={to}
            onChange={(e) => setTo(e.target.value)}
            variant="outlined"
          >
            <Form.Label>To</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group
            as={Col}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            <Form.Label>Form</Form.Label>
            <Form.Control />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group
            as={Col}
            value={typeOfExpanse}
            onChange={(e) => setTypeOfExpanse(e.target.value)}
          >
            <Form.Label>Expanse type</Form.Label>
            <Form.Control as="select" placeholder="Expanse type">
              {getTypeOfExpanse().map((data) => (
                <option value={data.id}>{data.name}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group
            as={Col}
            md={4}
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          >
            <Form.Label>Amount</Form.Label>
            <Form.Control placeholder="Enter Amount" />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group
            as={Col}
            md={6}
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
          >
            <Form.Label>Payment Type</Form.Label>
            <Form.Control as="select">
              {getTypeOfPayment().map((data) => (
                <option value={data.id}>{data.name}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group
            as={Col}
            value={refNo}
            onChange={(e) => setRefNo(e.target.value)}
          >
            <Form.Label>Refrence No.</Form.Label>
            <Form.Control placeholder="Enter Ref..No.." />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group value={date} onChange={(e) => setDate(e.target.value)}>
            <Form.Label>Exapnse Date</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group
            as={Col}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          >
            <Form.Label>Notes</Form.Label>
            <Form.Control as="textarea" placeholder="Notes..." />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group
            as={Col}
            value={selectedFile}
            onChange={(e) => setSelectedFile(e.target.value[0])}
          >
            <Form.Control type="file"></Form.Control>
          </Form.Group>

          <Button
            onClick={handleSubmit}
            className="submit"
            variant="primary"
            type="button"
          >
            Add
          </Button>
        </Form.Row>
      </Form>
    </>
  );
}

export default ExpanseForm;
