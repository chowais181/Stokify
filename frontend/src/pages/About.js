import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Button, Typography, Container ,Card} from "@mui/material";
// components
import { MotionContainer, varBounceIn } from "../components/animate";
import Page from "../components/Page";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <RootStyle title="About Us | Stokify">
      <Container>
          <Card style={{margin: "auto"}}>
             
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" paragraph>
                About Us
              </Typography>
            </motion.div>
            <Typography sx={{ color: "text.secondary" }}>
              A web application that efficiently keep inventory records, supplier and inventory purchase automation
                and reduce human resources. To keep the data in a centralized way which is available to all the
                users simultaneously. User can easily request for inventory online. Give users 24/7 real time access.
            </Typography>

            <motion.div variants={varBounceIn}>
              <Box
                component="img"
                src="/static/illustrations/aboutus.svg"
                sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
              />
            </motion.div>

            <Button
              to="/"
              size="large"
              variant="contained"
              color="info"
              component={RouterLink}
            >
              Move To Dashboard
            </Button>
          </Box>
        </MotionContainer>
         </Card>
      </Container>
    </RootStyle>
  );
}
