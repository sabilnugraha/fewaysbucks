import React, { useContext } from "react";
import { Table, Container, Modal } from "react-bootstrap";
import { IncomeTransaction } from "../datadummy/IncomeTransaction";
import NavbarAdmin from "../components/navbaradmin";
import convertRupiah from "rupiah-format";
import { Usercontext } from "../context/usercontext";
import { useState } from "react";
import Transaction from "../components/Transaction";

export default function Admin() {
  const [state, dispatch] = useContext(Usercontext);
  console.log(state);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <NavbarAdmin />
      <div>
        <Container className="mt-5">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Address</th>
                <th>Post Code</th>
                <th>Income</th>
                <th>Status</th>
              </tr>
            </thead>
            {IncomeTransaction.map((item, index) => {
              return (
                <tbody>
                  <tr onClick={handleShow}>
                    <td>{item.no}</td>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td>{item.postCode}</td>
                    <td>{convertRupiah.convert(item.income)}</td>
                    <td
                      className={
                        item.status === "Success"
                          ? "success"
                          : item.status === "Cancel"
                          ? "cancel"
                          : item.status === "On The Way"
                          ? "way"
                          : item.status === "Waiting Approve"
                          ? "waiting"
                          : ""
                      }
                    >
                      {item.status}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        </Container>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Transaction />
      </Modal>
    </div>
  );
}
