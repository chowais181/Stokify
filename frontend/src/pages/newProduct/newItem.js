import { Container, Typography } from "@mui/material";
import * as Yup from "yup";

import { useFormik, Form, FormikProvider } from "formik";

import { useNavigate } from "react-router-dom";
// material
import { Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Select from "react-select";

// ----------------------------------------------------------------------

export default function ProductForm() {
  const navigate = useNavigate();

  const AddProductSchema = Yup.object().shape({
    name: Yup.string()
      .min(30, "Too Short!")
      .max(4, "Too Long!")
      .required("Name is required"),
    price: Yup.string()
      .min(0, "Too Short!")
      .max(8, "Too Long!")
      .required("Price is required"),
    category: Yup.string()
      .min(30, "Too Short!")
      .max(4, "Too Long!")
      .required("Category is required"),
    stock: Yup.string()
      .min(0, "Too Short!")
      .max(8, "Too Long!")
      .required("Stock is required"),
  });

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
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      category: "",
    },
    validationSchema: AddProductSchema,
    onSubmit: () => {
      navigate("/dashboard/app", { replace: true });
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

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
              fullWidth
              label="Name"
              {...getFieldProps("name")}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              fullWidth
              label="Description"
              // {...getFieldProps("name")}
              // error={Boolean(touched.name && errors.name)}
              // helperText={touched.name && errors.name}
            />
            <TextField
              fullWidth
              label="Price"
              {...getFieldProps("price")}
              error={Boolean(touched.price && errors.price)}
              helperText={touched.price && errors.price}
            />
            <TextField
              fullWidth
              label="Stock"
              {...getFieldProps("stock")}
              error={Boolean(touched.stock && errors.stock)}
              helperText={touched.stock && errors.stock}
            />
            <Typography variant="h7" gutterBottom>
              Select Units of Measure :
              <Select defaultValue={optionsUnit[0]} options={optionsUnit} />
            </Typography>
            <Typography variant="h7" gutterBottom>
              Select Product Department :
              <Select defaultValue={optionsDept[0]} options={optionsDept} />
            </Typography>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Add Product
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Container>
  );
}
