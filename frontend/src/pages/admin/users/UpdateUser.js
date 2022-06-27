import React from "react";

import { useFormik, Form, FormikProvider } from "formik";

import Loader from "src/components/Loader/Loader";
import Select from "react-select";
import { useParams, useNavigate } from "react-router-dom";
// material
import { Stack, TextField, Typography, Container } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useAlert } from "react-alert";
// ----------------------------------------------------------------------
//--------------------------------------------------
import { useState, useRef, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_USER_RESET } from "src/constants/userConstants";
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from "src/actions/userAction";
// ----------------------------------------------------------------------
const optionsRole = [
  { value: "Staff", label: "Staff" },
  { value: "Faculty", label: "Faculty" },
  { value: "Student", label: "Student" },
  { value: "Stock Manager", label: "Stock Manager" },
  { value: "Vendor", label: "Vendor" },
  { value: "Coordinator", label: "Coordinator" },
  { value: "Admin", label: "Admin" },
  { value: "Account Officer", label: "Account Officer" },
];
export default function UpdateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { id } = useParams();
  const { loading, error, user } = useSelector((state) => state.userDetails);
  console.log(user && user.name);
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.profile
  );

  const [role, setOption] = useState(user && user.role);
  //getting the value from the textfield
  //creating a refernce for TextField Component
  const EmailRef = useRef("");
  const NameRef = useRef("");
  const PhoneNoRef = useRef("");

  // console.log(PasswordRef.current.value);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
    },

    onSubmit: () => {
      dispatch(
        updateUser(
          id,
          NameRef.current.value,
          EmailRef.current.value,
          PhoneNoRef.current.value,
          role.value
        )
      );
    },
  });
  const { handleSubmit } = formik;
  // ----------------------------------------------------------------------
  useEffect(() => {
    dispatch(getUserDetails(id));
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      navigate("/dashboard/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, alert, id, updateError, isUpdated, navigate]);
  // ----------------------------------------------------------------------

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Container maxWidth="xs">
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Update User
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Enter User details below ...
            </Typography>
          </Stack>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={1}>
                <TextField
                  key={user && user.name}
                  defaultValue={user && user.name}
                  inputRef={NameRef}
                  fullWidth
                  label="Name"
                  // {...getFieldProps("name")}
                  // error={Boolean(touched.name && errors.name)}
                  // helperText={touched.name && errors.name}
                />

                <TextField
                  key={user && user.email}
                  defaultValue={user && user.email}
                  inputRef={EmailRef}
                  fullWidth
                  autoComplete="username"
                  type="email"
                  label="Email address"
                  // {...getFieldProps("email")}
                  // error={Boolean(touched.email && errors.email)}
                  // helperText={touched.email && errors.email}
                />
                <TextField
                  key={user && user.phoneNumber}
                  defaultValue={user && user.phoneNumber}
                  inputRef={PhoneNoRef}
                  placeholder="03012345678"
                  fullWidth
                  autoComplete="phoneNumber"
                  type="number"
                  label="Phone Number"
                  // {...getFieldProps("phoneNumber")}
                  // error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                  // helperText={touched.phoneNumber && errors.phoneNumber}
                />

                <Typography variant="h7" gutterBottom>
                  Select User Role:
                  <Select
                    // defaultValue={optionsRole}
                    options={optionsRole}
                    onChange={setOption}
                  />
                </Typography>

                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={loading}
                >
                  Update User
                </LoadingButton>
              </Stack>
            </Form>
          </FormikProvider>
        </Container>
      )}
    </Fragment>
  );
}
