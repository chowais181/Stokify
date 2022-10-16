import * as Yup from "yup";
import React from "react";
import { Icon } from "@iconify/react";
import { useFormik, Form, FormikProvider } from "formik";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
// material
import {
  Stack,
  TextField,
  IconButton,
  Typography,
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useAlert } from "react-alert";
// ----------------------------------------------------------------------
//--------------------------------------------------
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register } from "src/actions/userAction";
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
export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { loading, isRegister, error } = useSelector((state) => state.user);
  const [role, setOption] = useState(optionsRole[0]);
  //getting the value from the textfield
  //creating a refernce for TextField Component
  const EmailRef = useRef("");
  const NameRef = useRef("");
  const PasswordRef = useRef("");
  const ConfirmPasswordRef = useRef("");
  const PhoneNoRef = useRef("");
  //setting the image  avaatar///

  // const [avatar, setAvatar] = useState("/Profile.png");
  // const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  // const registerDataChange = (e) => {
  //   if (e.target.name === "avatar") {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setAvatarPreview(reader.result);
  //         setAvatar(reader.result);
  //       }
  //     };
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const RegisterSchema = Yup.object().shape({
    //thats why length is 10 bcz it does not consider 0
    name: Yup.string()
      .min(4, "Too Short!")
      .max(30, "Too Long!")
      .required("Name is required"),
    phoneNumber: Yup.string()
      .min(10, "Phone Number must be of 11 digits!")
      .max(10, "Phone Number must be of 11 digits!")
      .required("Phone Number is Required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password is  too Short!"),
    confirmPassword: Yup.string().required("Confirm Password is required"),
  });
  // console.log(PasswordRef.current.value);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },

    validationSchema: RegisterSchema,
    onSubmit: () => {
      console.log(PasswordRef.current.value);
      if (PasswordRef.current.value !== ConfirmPasswordRef.current.value) {
        alert.error("Password is not match with confirm password!!");
      } else {
        dispatch(
          register(
            NameRef.current.value,
            EmailRef.current.value,
            PhoneNoRef.current.value,
            PasswordRef.current.value,
            // avatar,
            role.value
          )
        );
      }
    },
  });
  const { errors, touched, handleSubmit, getFieldProps, resetForm } = formik;
  // ----------------------------------------------------------------------
  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }
    if (isRegister) {
      alert.show(
        <div style={{ color: "green" }}>Registerd successfully!</div>
      );
      resetForm();
      navigate(-1);
    }
  }, [dispatch, error, alert, isRegister, resetForm, navigate]);
  // ----------------------------------------------------------------------

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={1}>
          <TextField
            inputRef={NameRef}
            fullWidth
            label="Name"
            {...getFieldProps("name")}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />

          <TextField
            inputRef={EmailRef}
            fullWidth
            // autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            inputRef={PhoneNoRef}
            placeholder="03012345678"
            fullWidth
            autoComplete="phoneNumber"
            type="number"
            label="Phone Number"
            {...getFieldProps("phoneNumber")}
            error={Boolean(touched.phoneNumber && errors.phoneNumber)}
            helperText={touched.phoneNumber && errors.phoneNumber}
          />
          <TextField
            inputRef={PasswordRef}
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
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
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
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

          <Typography variant="h7" gutterBottom>
            Select User Role:
            <Select
              defaultValue={optionsRole[0]}
              options={optionsRole}
              onChange={setOption}
            />
          </Typography>
          {/* <fieldset>
            <div id="registerImage">
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                height={50}
                width={50}
              />
              <Input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
              />
            </div>
          </fieldset> */}

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={loading}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
