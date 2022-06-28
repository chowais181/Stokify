import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Card } from "@mui/material";
// import { Typography } from "@mui/material";
import "./UserProducts.css";
import { useParams } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const UserProduct = ({ product }) => {
  const { department } = useParams();
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Card
      style={{ width: "16rem", backgroundColor: "#E5C14D", margin: "1rem" }}
    >
      <Fragment>
        <Link
          className="productCard"
          to={`/dashboard/neworder/products/${department}/${product._id}`}
        >
          <p>{product.name}</p>
          <p>{`RS: ${product.price}`}</p>
          <span>Description : {product.description}</span>
          <div>
            <Rating {...options} />{" "}
            <span className="productCardSpan">
              {" "}
              ({product.numOfReviews} Reviews)
            </span>
          </div>
        </Link>
      </Fragment>
    </Card>
  );
};
export default UserProduct;
