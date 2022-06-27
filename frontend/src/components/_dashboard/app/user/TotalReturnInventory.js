import { Icon } from "@iconify/react";
import React, { useEffect } from "react";
// material
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
// utils
import { fShortenNumber } from "../../../../utils/formatNumber";
import { useSelector, useDispatch } from "react-redux";
import { myRequests } from "../../../../actions/reqInventoryAction";
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: theme.palette.warning.lighter,
  backgroundColor: "brown",
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

export default function MyOrder() {
  const dispatch = useDispatch();
  var TOTAL = 0;
  const { requests, loading } = useSelector((state) => state.myRequests);
  if (loading === false) {
    requests &&
      requests.forEach((i) => {
        if (i.returnDate !== "") {
          TOTAL++;
        }
      });
  }

  useEffect(() => {
    dispatch(myRequests());
  }, [dispatch]);
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon="ic:baseline-inventory-2" width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Inventory to Return
      </Typography>
    </RootStyle>
  );
}
