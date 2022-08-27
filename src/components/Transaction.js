import React from "react";
import { Col, Row } from "react-bootstrap";
import { DataTransaction } from "../datadummy/datatransaction";
import Barcode from "../assets/barcode.png";
import Logo from "../assets/logo.png";
import convertRupiah from "rupiah-format";
import { useEffect } from "react";
import { API } from "../config/api";
import { useState } from "react";
import dateFormat from 'dateformat';

export default function Transaction() {
  const countTotal = (items) =>
    items.reduce((acc, curr) => acc + curr.price, 0);

  const jumlah = countTotal(DataTransaction);

  const [cartdata, setCartdata] = useState([])
  useEffect(() => {
    const dataproduct = async () => {
      try {
        const response = await API.get("/user-transaction");
        setCartdata(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    dataproduct();
  }, [setCartdata]);
  console.log(cartdata);
  return (
    <Row
      
    >
      
        {cartdata.map((item, index) => {
          

          return (
            <>
            <Row className="p-2"  >
              <div key={index}>
              
              <div className="cartTransaction" key={index} style={{
        padding: "10px"
      }} >
        <Row>
        <Col sm={9}>{item.carts.map((cart, index) => {
                return(
                  
        <div className="mt-1" >
          <Row>
        <Col xs={6} md={6}>
          <img
                  className="bg-secondary"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "10px",
                  }}
                  src={`http://localhost:5000/uploads/${cart?.product?.image}`} />
        </Col>
        <Col xs={6} md={6}>
          <p style={{fontSize: "15px",
        color: "#BD0707"}}><strong>{cart?.product?.title}</strong></p>
      <p style={{fontSize: "13px",
        color: "#BD0707"}}><b>{dateFormat(cart?.updated_at, 'dddd,')}</b>  {dateFormat(cart?.updated_at, 'd mmmm yyyy')} </p>
        <span style={{fontSize: "13px",
        color: "#BD0707"}}><strong>Topping</strong></span><span> :</span>
        {cart.Topping.map((topping, index) => {
          return(
                       <span key={index} style={{fontSize: "13px",
        color: "#BD0707"}}> {   (index ? ', ' : '') + topping.title }</span>
            

          )
        })}
        <p style={{fontSize: "15px",
        color: "#BD0707"}}>Price : {convertRupiah.convert(cart?.subtotal)}</p><span style={{fontSize: "15px",
        color: "#BD0707"}}></span>
        </Col>
        
      {/* <Col xs={6} md={4}>
          xs=6 md=4
        </Col> */}
        </Row>
                    
                    </div>
                  
                )
              })}</Col>
        <Col sm={3}>
          <div>
          <img
          style={{ width: "50%", height: "auto" }}
        
          src={Logo}
        />
        </div>
        <div>
        <img
          className="mt-4"
          style={{ width: "50%", height: "auto" }}
          src={Barcode}
        />
        </div>
        <p className="statusTransaction mt-2" >On the Way</p>
        <p className="miniText" style={{
        color: "#BD0707"}}><b>Total: {convertRupiah.convert(jumlah)}</b></p>
        <p className="miniText"></p>
        </Col>
      </Row>
              
              
              </div>
              
              </div>
            </Row>
            </>
          );
        })}
      
      <Col md={3}>
        
      </Col>
    </Row>
  );
}
