import { Container, Typography } from "@mui/material";
import { useFormik, Form, FormikProvider } from "formik";
// material
import { Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
// import Select from "react-select";
import Loader from "src/components/Loader/Loader";
// ----------------------------------------------------------------------
import { useRef, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "src/actions/vendorProductAction";
import { useAlert } from "react-alert";
import { UPDATE_PRODUCT_RESET } from "../../../constants/vendorProductConstants";
//-------------------------------------------

export default function ProductForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const alert = useAlert();
  const nameRef = useRef("");
  const priceRef = useRef("");
  const stockRef = useRef("");
  const descriptionRef = useRef("");

  const { error, product, loading } = useSelector(
    (state) => state.vendorProductDetails
  );

  const { error: updateError, isUpdated } = useSelector(
    (state) => state.vendorProduct
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
    },

    onSubmit: () => {
      console.log(nameRef.current.value);
      dispatch(
        updateProduct(
          id,
          nameRef.current.value,
          descriptionRef.current.value,
          priceRef.current.value,
          stockRef.current.value
        )
      );
    },
  });
  const {  handleSubmit } = formik;

  // ----------------------------------------------------------------------
  useEffect(() => {
    dispatch(getProductDetails(id));
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/dashboard/vendorproducts");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, error, alert, id, updateError, isUpdated, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Container maxWidth="xs">
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Update Product - Vendor
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Enter Product details below.
            </Typography>
          </Stack>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={1}>
                <TextField
                  key={product && product.name}
                  defaultValue={product && product.name}
                  inputRef={nameRef}
                  fullWidth
                  label="Name"
                  // {...getFieldProps("name")}
                  // error={Boolean(touched.name && errors.name)}
                  // helperText={touched.name && errors.name}
                />
                <TextField
                  key={product && product.description}
                  defaultValue={product && product.description}
                  inputRef={descriptionRef}
                  fullWidth
                  label="Description"
                  // {...getFieldProps("name")}
                  // error={Boolean(touched.name && errors.name)}
                  // helperText={touched.name && errors.name}
                />
                <TextField
                  key={product && product.price}
                  defaultValue={product && product.price}
                  inputRef={priceRef}
                  fullWidth
                  label="Price"
                  type="number"
                  //   {...getFieldProps("price")}
                  // error={Boolean(touched.price && errors.price)}
                  // helperText={touched.price && errors.price}
                />
                <TextField
                  key={product && product.Stock}
                  defaultValue={product && product.Stock}
                  inputRef={stockRef}
                  fullWidth
                  label="Stock"
                  type="number"
                  //   {...getFieldProps("stock")}
                  // error={Boolean(touched.stock && errors.stock)}
                  // helperText={touched.stock && errors.stock}
                />

                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={loading}
                >
                  Update Product
                </LoadingButton>
              </Stack>
            </Form>
          </FormikProvider>
        </Container>
      )}
    </Fragment>
  );
}
