import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Label from "src/components/Label";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
//all css in the inventory.css
const UserProduct = ({ product }) => {
  const { department } = useParams();
  console.log(product.Stock);
  return (
    <Fragment>
      <Link
        // style={{ background: "linear-gradient(to right,#ffafbd , #ffc3a0)" }}
        className="productCard"
        to={`/dashboard/requestinventory/inventoryitem/${department}/${product._id}`}
      >
        <h4>{product.name}</h4>
        <Typography> {product.description}</Typography>
        {/* <p></p> */}
        <span>Category : {product.department}</span>

        <Label>{product.Stock <= 0 ? "Not Available" : "Available"}</Label>
      </Link>
    </Fragment>
  );
};
export default UserProduct;
