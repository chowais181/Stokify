import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import "./UserProducts.css";
import { useParams } from "react-router-dom";
const UserProduct = ({ product }) => {
  const { department } = useParams();

  return (
    <Fragment>
      <Link
        className="productCard"
        to={`/dashboard/neworder/products/${department}/${product._id}`}
      >
        <h4>{product.name}</h4>
        <Typography>Description: {product.description}</Typography>
        {/* <p></p> */}
        <span>Category : {product.department}</span>

      </Link>
    </Fragment>
  );
};
export default UserProduct;
