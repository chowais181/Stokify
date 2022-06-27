import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";

// material
import { Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAlert } from "react-alert";
//---------------------------------------

// material
import { styled } from "@mui/material/styles";
import { Card, Container, Typography } from "@mui/material";
// layouts
import AuthLayout from "../../layouts/AuthLayout";
// components
import Page from "../Page";
import { MHidden } from "../@material-extend";

// ----------------------------------------------------------------------
import { clearErrors, forgotPassword } from "src/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from "react";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ForgotPassword() {
  const EmailRef = useRef("");
  const alert = useAlert();
  const dispatch = useDispatch();

  // ----------------------------------------------------------------------
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  // ----------------------------------------------------------------------
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

  // --------------------------validation---------------------------------------
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
  });
  // ----------------------------------------------------------------------
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      dispatch(forgotPassword(EmailRef.current.value));
      console.log(EmailRef.current.value);
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <RootStyle title="Forgot Password | Stokify">
      <AuthLayout></AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h5" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi! Welcome Back
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Forgot Password
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Enter details below.
            </Typography>
          </Stack>

          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
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
              <br />
              <br />

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={loading}
              >
                Send
              </LoadingButton>
            </Form>
          </FormikProvider>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
