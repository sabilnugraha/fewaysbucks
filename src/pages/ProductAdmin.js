import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Table, Button } from "react-bootstrap";
import { API } from "../config/api";
import rupiahFormat from "rupiah-format";
import { useQuery } from "react-query";
import { useEffect } from "react";
import NavbarAdmin from "../components/navbaradmin";
import DeleteData from "../components/Modals/deletedata";
import { useMutation } from "react-query";

function ProductAdmin() {
  let navigate = useNavigate();
  const [dataproduct, setDataproduct] = useState([]);

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // console.log(idDelete,confirmDelete);

  // Modal Confirm delete data
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //   let { data: dataproduct } = useQuery("productsCache", async () => {
  //     const response = await API.get("/products");
  //     return response.data.data;
  //   });
  const handleEdit = (id) => {
    navigate("/edit-product/" + id);
  };

  useEffect(() => {
    const dataproduct = async () => {
      try {
        const response = await API.get("/products");
        setDataproduct(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    dataproduct();
  }, [setDataproduct]);

  console.log(dataproduct);
  let { data: products, refetch } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/product/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  // Call function for handle close modal and execute delete data with useEffect here ...
  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  return (
    <div>
      <NavbarAdmin />
      <div className="m-5">
        <Table striped hover size="lg" variant="light">
          <thead>
            <tr>
              <th width="1%" className="text-center">
                No
              </th>
              <th>Photo</th>
              <th>Product Name</th>
              <th>Price</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataproduct.map((item, index) => (
              <tr key={index}>
                <td className="align-middle text-center">{index + 1}</td>
                <td className="align-middle">
                  <img
                    src={item.image}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                    alt={item.title}
                  />
                </td>
                <td className="align-middle">{item.title}</td>

                <td className="align-middle">
                  {rupiahFormat.convert(item.price)}
                </td>
                <td className="align-middle">
                  <Button
                    onClick={() => {
                      handleEdit(item.id);
                    }}
                    className="btn-sm btn-success me-2"
                    style={{ width: "135px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                    className="btn-sm btn-danger"
                    style={{ width: "135px" }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <DeleteData
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
}

export default ProductAdmin;
