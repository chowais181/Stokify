// material
import { styled } from "@mui/material/styles";
import { Container, Typography } from "@mui/material";

// components

import { RegisterForm } from "../../../../components/authentication/register";
import { Stack } from "@mui/material";
const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

export default function AddUser() {
  return (
    <Container maxWidth="sm">
      <ContentStyle>
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            Add new user
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Enter user details below.
          </Typography>
        </Stack>
        <RegisterForm />
      </ContentStyle>
    </Container>
  );
}
