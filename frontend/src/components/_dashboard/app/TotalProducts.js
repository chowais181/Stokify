import { Icon } from "@iconify/react";
// material
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
// utils
import { fShortenNumber } from "../../../utils/formatNumber";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useAlert } from "react-alert";
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.lighter,
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
  color: theme.palette.primary.lighter,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.lighter,
    0
  )} 0%, ${alpha(theme.palette.primary.dark, 0.24)} 100%)`,
}));

// ----------------------------------------------------------------------

const StockInHand = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { productsCount , error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
  }, [dispatch, error, alert]);
  const TOTAL = productsCount;
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon="akar-icons:cart" width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Total Products
      </Typography>
    </RootStyle>
  );
};
export default StockInHand;
