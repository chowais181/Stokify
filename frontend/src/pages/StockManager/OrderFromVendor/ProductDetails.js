import { useAlert } from "react-alert";
import { Icon } from "@iconify/react";
import { Button, Card } from "@mui/material";
// import { addItemsToCart } from "../../actions/cartAction";
import Loader from "src/components/Loader/Loader";
import React, { Fragment, useEffect, useState } from "react";
// material
import { Container, Stack, Typography, CardContent } from "@mui/material";
// components
import Page from "src/components/Page";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
} from "../../../actions/vendorProductAction";
import { useParams } from "react-router-dom";
import "./productDetails.css";
import { useNavigate } from "react-router-dom";
import { addItemsToCart } from "../../../actions/vendorCartAction";

///////////---QR Code----///////////////
import QRCode from "qrcode";

/////////////////////////////
const ProductDetails = () => {
  const [src, setSrc] = useState("");

  //Use the useParams hook to access the id match param
  //getting theid wich we are selecting in inventory
  // the useParam fetch the id from the url
  //we onnly get the paramater by( /:link ) if we set it by this
  const { id } = useParams();
  const navigate = useNavigate();
  const MoveBack = () => {
    //going to previous page by using navigate -1
    //and we can go forward by using 1
    navigate(-1);
  };
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.vendorProductDetails
  );

  /////fro QR code////////
  var text = "hi";
  if (loading === false) {
    text = `Product Name: 
      ${product && product.name} 
      \nProduct ID: 
      ${id} 
      \nProduct Description: 
      ${product && product.description}
      \nProduct Price: 
      ${product && product.price}`;
  }

  useEffect(() => {
    ////qr /////
    QRCode.toDataURL(text).then(setSrc);

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, text]);

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
  // const { cartItems } = useSelector((state) => state.cart);

  const addToCartHandler = () => {
    // let dept = "";
    // if (cartItems.length > 0) {
    //   dept = cartItems[0]["department"];
    //   console.log(dept);
    //   if (product.department === dept) {
    //     dispatch(addItemsToCart(id, quantity));
    //     alert.success("Item Added To Cart");
    //   } else {
    //     alert.error("Cannot Add! Only add from the same category");
    //   }
    // }
    // if (cartItems.length === 0) {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
    // }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Page title="Order: Product Detail | Stokify">
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
              <Card variant="filled" sx={{ minWidth: 275 }}>
                <CardContent>
                  <div>
                    <div className="detailsBlock-1">
                      <h2 style={{ font: "500 1.9vma" }}>
                        {product && product.name}
                      </h2>
                      <p>Product ID# {product && product._id}</p>
                    </div>
                    <div className="detailsBlock-1">
                      <h2 style={{ font: "500 1.9vmax " }}>Product QR code</h2>
                      <img src={src} alt="qr code" width="100" height="100" />
                    </div>

                    <div className="detailsBlock-3">
                      <h1>{`Price Rs/: ${product && product.price}`}</h1>
                      <div className="detailsBlock-3-1">
                        <div className="detailsBlock-3-1-1">
                          <h2 style={{ font: "500 1.9vmax Roboto" }}>
                            Quantity
                          </h2>
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
                        disabled={product && product.Stock < 1 ? true : false}
                        onClick={addToCartHandler}
                      >
                        <Icon icon="bx:bxs-cart-download" width="30" /> Add to
                        Cart
                      </Button>
                      <br /> <br />
                      <h2 style={{ font: "500 1.9vmax Roboto" }}>
                        Status :
                        <b
                          className={
                            product && product.Stock < 1
                              ? "redColor"
                              : "greenColor"
                          }
                        >
                          {product && product.Stock < 1
                            ? "OutOfStock"
                            : "InStock"}
                        </b>
                      </h2>
                    </div>
                    <br />
                    <div className="detailsBlock-4">
                      <h2 style={{ font: "500 1.9vmax Roboto" }}>
                        Description :
                        <h2 style={{ font: "300 1.3vmax Roboto" }}>
                          {product && product.description}
                        </h2>
                      </h2>
                    </div>
                  </div>
                  <br />
                  <Button
                    variant="contained"
                    onClick={MoveBack}
                    color="warning"
                  >
                    <Icon icon="akar-icons:arrow-back" width="40" />
                    Back to list
                  </Button>
                </CardContent>
              </Card>
            </Container>
          </Page>
        </Fragment>
      )}
    </Fragment>
  );
};
export default ProductDetails;
