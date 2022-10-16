import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
// material
import {
  
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAlert } from "react-alert";
//--------------------------------------------------
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "src/actions/userAction";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const alert = useAlert();
  //getting the value from the textfield
  //creating a refernce for TextField Component
  const EmailRef = useRef("");
  const PasswordRef = useRef("");
  // console.log(EmailRef.current.value, PasswordRef.current.value);
  const dispatch = useDispatch();

  // ----------------------------------------------------------------------
  const { loading, error } = useSelector((state) => state.user);
  // ----------------------------------------------------------------------

  // --------------------------validation---------------------------------------
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  // ----------------------------------------------------------------------
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      dispatch(login(EmailRef.current.value, PasswordRef.current.value));
    },
  });
  const { errors, touched, values, handleSubmit, getFieldProps } = formik;
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  //............

  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  // ----------------------------------------------------------------------

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            inputRef={EmailRef} //connecting inputRef property of TextField to the valueRef
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            inputRef={PasswordRef} //connecting inputRef property of TextField to the valueRef
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                {...getFieldProps("remember")}
                checked={values.remember}
              />
            }
            label="Remember me"
          />
          {/* 
          <Link
            component={RouterLink}
            variant="subtitle2"
            to="/password/forgot"
          >
            Forgot password?
          </Link> */}
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={loading}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
