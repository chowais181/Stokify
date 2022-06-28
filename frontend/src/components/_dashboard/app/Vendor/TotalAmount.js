import { Icon } from "@iconify/react";
import React, { useEffect } from "react";
// material
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
// utils
import { fShortenNumber } from "../../../../utils/formatNumber";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders } from "../../../../actions/orderAction.js";
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: theme.palette.warning.lighter,
  backgroundColor: "black",
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
let totalAmount = 0;
export default function TotalAmount() {
  totalAmount = 0;
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.allOrders);
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon="emojione:money-bag" width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(totalAmount)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Total Amount Recieved
      </Typography>
    </RootStyle>
  );
}
