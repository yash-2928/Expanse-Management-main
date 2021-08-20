import { Card, Container, Col, Row } from "react-bootstrap";
import {
  getExpenseHistroy,
  deleteData,
  upadateData,
  getTypeOfPayment,
  getTypeOfExpanse,
} from "../service/expanseService";
import { activeRemiders } from "../service/reminderService";
import { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import "../style/Card.css";

activeRemiders();
function MyCard(props) {
  const data = props.props;

  const [flage, setFlage] = useState(true);
  const [edit, setEdit] = useState(false);

  const [to, setTo] = useState(data.to);
  const [from, setFrom] = useState(data.from);
  const [typeOfExpanse, setTypeOfExpanse] = useState(data.typeOfExpanse);
  const [paymentType, setPaymentType] = useState(data.paymentType);
  const [refNo, setRefNo] = useState(data.refNo);
  const [amount, setAmount] = useState(data.amount);
  const [notes, setNotes] = useState(data.notes);


  const removeRecord = (id) => {
    deleteData(id);
    setFlage((prestate) => {
      props.OnCountChange()
      return !prestate;
    });
  };

  const updateRecord = (id) => {
    setEdit(false);
    let data = {
      id,
      to,
      from,
      typeOfExpanse,
      amount,
      paymentType,
      refNo,
      notes,
    };
    upadateData(data);
    setFlage((prestate) => {
      return !prestate;
    });
  };


  return (
    <>
      {edit ? (
        <Container key={data.id} className="card">
          <Row>
            <Col sm={6} className="labels">
              <h6>To:</h6>
              <h6>From:</h6>
              <h6>Amount:</h6>
              <h6 style={{ paddingTop: "10px" }}>Expanse Type:</h6>
              <h6>payment Type:</h6>
              <h6 style={{ paddingTop: "10px" }}>Refrence No.</h6>
              <h6>Notes:</h6>
            </Col>
            <Col sm={4}>
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <select onChange={(e) => setTypeOfExpanse(e.target.value)}>
                {getTypeOfExpanse().map((data) => (
                  <option value={data.id}>{data.name}</option>
                ))}
              </select>
              <select onChange={(e) => setPaymentType(e.target.value)}>
                {getTypeOfPayment().map((data) => {
                  return <option value={data.id}>{data.name}</option>;
                })}
              </select>
              <input
                type="text"
                value={refNo}
                onChange={(e) => setRefNo(e.target.value)}
              />
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <span>
                <CheckIcon
                  className="save"
                  onClick={() => {
                    updateRecord(data.id);
                  }}
                />{" "}
                <ClearIcon
                  onClick={() => {
                    setEdit(false);
                  }}
                />
              </span>
            </Col>
          </Row>
        </Container>
      ) : (
        <Card className="card" key={data.id}>
          <Card.Body>
            <span>
              <DeleteIcon
                className="button"
                onClick={() => {
                  removeRecord(data.id);
                }}
              />
              <EditIcon
                className="button"
                onClick={() => {
                  setEdit(true);
                }}
              />
            </span>
            <Card.Title>
              {data.to}
              <p id="h6">{data.date}</p>
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {data.from}
            </Card.Subtitle>
            <Card.Text>{data.notes}</Card.Text>
            <Card.Text>
              <h3>${data.amount} </h3>
            </Card.Text>
            <Card.Text>
              {data.typeOfExpanse} - {data.paymentType} - {data.refNo}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default function DataCard(props) {
  
  const allRecord = getExpenseHistroy();
  return (
    <>
      <Container key={allRecord.length} className="card-main">
        <Row>
          {allRecord.map((data) => {
            return (
              <div key={data.id}>
              <Col  sm={12} lg={4} md={6}>
                <MyCard props={data} key={data.id} OnCountChange={props.OnCountChange} />
              </Col>
              </div>
            );
          })}
        </Row>
      </Container>
    </>
  );
}
