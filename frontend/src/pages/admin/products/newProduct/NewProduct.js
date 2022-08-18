import { Container, Typography } from "@mui/material";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
// material
import { Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Select from "react-select";

// ----------------------------------------------------------------------
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createProduct } from "src/actions/productAction";
import { useAlert } from "react-alert";
import { NEW_PRODUCT_RESET } from "../../../../constants/productConstants";
//-------------------------------------------
const optionsUnit = [
  { value: "piece", label: "Piece" },
  { value: "kg", label: "KG" },
  { value: "box", label: "Box" },
  { value: "meter", label: "Meter" },
  { value: "litre", label: "Litre" },
];
const optionsDept = [
  { value: "IT", label: "IT" },
  { value: "furniture", label: "Furniture" },
  { value: "grocery", label: "Grocery" },
  { value: "societies", label: "Societies" },
  { value: "sports", label: "Sports" },
];
export default function ProductForm() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const nameRef = useRef("");
  const priceRef = useRef("");
  const stockRef = useRef("");
  const descriptionRef = useRef("");
  const [uom, setUOM] = useState(optionsUnit[0]);
  const [cat, setCAT] = useState(optionsDept[0]);

  const AddProductSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, "Too Short!")
      .max(30, "Too Long!")
      .required("Name is required"),
    price: Yup.string()
      .min(1, "Too Short!")
      .max(8, "Too Long!")
      .required("Price is required"),
    stock: Yup.string()
      .min(1, "Too Short!")
      .max(8, "Too Long!")
      .required("Stock is required"),
    description: Yup.string().max(50, "Too Long!"),
  });
  const { loading, error, success } = useSelector((state) => state.newProduct);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
    },
    validationSchema: AddProductSchema,
    onSubmit: () => {
      console.log(
        descriptionRef.current.value,
        uom.value,
        cat.value,
        priceRef.current.value
      );
      if (priceRef.current.value < 0 || stockRef.current.value < 0) {
        alert.error("Cannot be -ve!!!");
      } else {
        dispatch(
          createProduct(
            nameRef.current.value,
            descriptionRef.current.value,
            priceRef.current.value,
            stockRef.current.value,
            uom.value,
            cat.value
          )
        );
      }
    },
  });
  const { errors, touched, handleSubmit, getFieldProps, resetForm } = formik;
  // ----------------------------------------------------------------------
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.show(
        <div style={{ color: "green" }}>Product added successfully!</div>
      );
      // resetForm();
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, alert, success, resetForm]);

  return (
    <Container maxWidth="xs">
      <Stack sx={{ mb: 5 }}>
        <Typography variant="h4" gutterBottom>
          Add New Product
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          Enter Product details below.
        </Typography>
      </Stack>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={1}>
            <TextField
              inputRef={nameRef}
              fullWidth
              label="Name"
              {...getFieldProps("name")}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              inputRef={descriptionRef}
              fullWidth
              label="Description"
              // {...getFieldProps("name")}
              // error={Boolean(touched.name && errors.name)}
              // helperText={touched.name && errors.name}
            />
            <TextField
              inputRef={priceRef}
              fullWidth
              label="Price"
              type="number"
              {...getFieldProps("price")}
              error={Boolean(touched.price && errors.price)}
              helperText={touched.price && errors.price}
            />
            <TextField
              inputRef={stockRef}
              fullWidth
              label="Stock"
              type="number"
              {...getFieldProps("stock")}
              error={Boolean(touched.stock && errors.stock)}
              helperText={touched.stock && errors.stock}
            />
            <Typography variant="h7" gutterBottom>
              Select Units of Measure :
              <Select
                defaultValue={optionsUnit[0]}
                options={optionsUnit}
                onChange={setUOM}
              />
            </Typography>
            <Typography variant="h7" gutterBottom>
              Select Product Category :
              <Select
                defaultValue={optionsDept[0]}
                options={optionsDept}
                onChange={setCAT}
              />
            </Typography>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={loading}
            >
              Add Product
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Container>
  );
}
