import { useAlert } from "react-alert";
import { Icon } from "@iconify/react";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@mui/material";
// import { addItemsToCart } from "../../actions/cartAction";
import Loader from "src/components/Loader/Loader";
import React, { Fragment, useEffect, useState } from "react";
// material
import { Container, Stack, Typography } from "@mui/material";
// components
import Page from "src/components/Page";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import "./productDetails.css";
const ProductDetails = () => {
  //Use the useParams hook to access the id match param
  //getting theid wich we are selecting in inventory
  // the useParam fetch the id from the url
  const { id } = useParams();
  console.log(id);

  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    // dispatch(addItemsToCart(match.params.id, quantity));
    alert.success("Item Added To Cart");
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Page title="Products: Product Detail | Stokify">
            <Container>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={5}
              >
                <Typography variant="h4" gutterBottom>
                  Product Details
                </Typography>
              </Stack>
              <div>
                <div className="detailsBlock-1">
                  <h2>{product.name}</h2>
                  <p>Product ID# {product._id}</p>
                </div>

                <div className="detailsBlock-3">
                  <h1>{`₹${product.price}`}</h1>

                  <div className="detailsBlock-3-1">
                    <div className="detailsBlock-3-1-1">
                      <h3>Quantity</h3>
                      <br />
                      <button onClick={decreaseQuantity}>-</button>
                      <input type="number" value={quantity} />
                      <button onClick={increaseQuantity}>+</button>
                    </div>
                  </div>
                  <br />
                  <Button
                    variant="contained"
                    color="info"
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    <Icon icon="bx:bxs-cart-download" width="30" />{" "}
                    Add to Cart
                  </Button>
                  <p>
                    Status :
                    <b
                      className={product.Stock < 1 ? "redColor" : "greenColor"}
                    >
                      {product.Stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                  </p>
                </div>

                <div className="detailsBlock-4">
                  Description : {product.description}
                </div>
              </div>
              <br />
              <Button
                variant="contained"
                component={RouterLink}
                to="/dashboard/inventoryitems"
                color="warning"
              >
                <Icon icon="akar-icons:arrow-back" width="40" />
                Back to list
              </Button>
            </Container>
          </Page>
        </Fragment>
      )}
    </Fragment>
  );
};
export default ProductDetails;
