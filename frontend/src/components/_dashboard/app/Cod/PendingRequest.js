import { Icon } from "@iconify/react";
import React, { useEffect } from "react";
// material
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
// utils
import { fShortenNumber } from "../../../../utils/formatNumber";
import { useSelector, useDispatch } from "react-redux";
import { getAllRequest } from "../../../../actions/reqInventoryAction.js";
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: theme.palette.warning.lighter,
  backgroundColor: "#880e4f",
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
  color: theme.palette.warning.lighter,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.warning.dark,
    0
  )} 0%, ${alpha(theme.palette.warning.dark, 0.24)} 100%)`,
}));

// ----------------------------------------------------------------------

export default function TotalRequest() {
  const dispatch = useDispatch();
  const { requests, loading } = useSelector((state) => state.allRequest);
  let TOTAL = 0;

  useEffect(() => {
    dispatch(getAllRequest());
  }, [dispatch]);
  if (loading === false) {
    requests &&
      requests.forEach((item) => {
        if (item.requestStatus === "Processing") {
          TOTAL++;
        }
      });
  }

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon="ic:baseline-inventory-2" width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Pending Inventory Requests
      </Typography>
    </RootStyle>
  );
}
