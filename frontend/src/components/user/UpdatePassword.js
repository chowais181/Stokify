import * as Yup from "yup";
import React from "react";
import { Icon } from "@iconify/react";
import { useFormik, Form, FormikProvider } from "formik";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
// material
import {
  Stack,
  TextField,
  IconButton,
  Typography,
  InputAdornment,
  Container,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useAlert } from "react-alert";
// ----------------------------------------------------------------------
//--------------------------------------------------
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "src/actions/userAction";
// ----------------------------------------------------------------------

export default function UpdatePassword() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, isUpdated } = useSelector((state) => state.profile);

  //getting the value from the textfield
  //creating a refernce for TextField Component

  const OldPasswordRef = useRef("");
  const NewPasswordRef = useRef("");
  const ConfirmPasswordRef = useRef("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const UpdatePasswordSchema = Yup.object().shape({
    //thats why length is 10 bcz it does not consider 0
    oldpassword: Yup.string().required("Password is required"),
    newpassword: Yup.string()
      .required("Password is required")
      .min(8, "Password is  too Short!"),
    confirmPassword: Yup.string().required("Confirm Password is required"),
  });
  // console.log(PasswordRef.current.value);
  const formik = useFormik({
    initialValues: {
      newpassword: "",
      oldpassword: "",
      confirmPassword: "",
    },

    validationSchema: UpdatePasswordSchema,
    onSubmit: () => {
      // navigate("/dashboard/app", { replace: true });
      if (NewPasswordRef.current.value !== ConfirmPasswordRef.current.value) {
        alert.error("New Password is not match with confirm password!!");
      } else {
        dispatch(
          updatePassword(
            OldPasswordRef.current.value,
            NewPasswordRef.current.value,
            ConfirmPasswordRef.current.value
          )
        );
        console.log(
          OldPasswordRef.current.value,
          NewPasswordRef.current.value,
          ConfirmPasswordRef.current.value
        );
        formik.resetForm();
      }
    },
  });

  // ----------------------------------------------------------------------
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.show(
        <div style={{ color: "green" }}>Password updated successfully!</div>
      );
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, isUpdated]);
  // ----------------------------------------------------------------------

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <Container maxWidth="xs">
      <Stack sx={{ mb: 5 }}>
        <Typography variant="h4" gutterBottom>
          Update Password
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          Enter details below.
        </Typography>
      </Stack>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={1}>
            <TextField
              inputRef={OldPasswordRef}
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Old Password"
              {...getFieldProps("oldpassword")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.oldpassword && errors.oldpassword)}
              helperText={touched.oldpassword && errors.oldpassword}
            />

            <TextField
              inputRef={NewPasswordRef}
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="New Password"
              {...getFieldProps("newpassword")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.newpassword && errors.newpassword)}
              helperText={touched.newpassword && errors.newpassword}
            />
            <TextField
              inputRef={ConfirmPasswordRef}
              fullWidth
              autoComplete="current-password"
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password"
              {...getFieldProps("confirmPassword")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      <Icon icon={showConfirmPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
            />

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={loading}
            >
              Update Password
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Container>
  );
}
