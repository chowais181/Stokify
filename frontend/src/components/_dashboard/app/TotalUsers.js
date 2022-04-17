import { Icon } from "@iconify/react";
// material
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
// utils
import { fShortenNumber } from "../../../utils/formatNumber";
import { getAllUsers } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useAlert } from "react-alert";
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: theme.palette.info.lighter,
  backgroundColor: "#1a237e",
}));

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  color: theme.palette.info.lighter,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.info.dark,
    0
  )} 0%, ${alpha(theme.palette.info.dark, 0.24)} 100%)`,
}));

// ----------------------------------------------------------------------

let TOTAL = 0;

export default function AppNewUsers() {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { users, error } = useSelector((state) => state.allUsers);

  if (users) {
    TOTAL = users.length;
  }
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getAllUsers());
  }, [dispatch, error, alert]);

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon="carbon:user-multiple" width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Total Users
      </Typography>
    </RootStyle>
  );
}
