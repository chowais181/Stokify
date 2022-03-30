import { Icon } from "@iconify/react";
import shoppingCartFill from "@iconify/icons-eva/shopping-cart-fill";
// material
// import { styled } from "@mui/material/styles";
import { Badge } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
// ----------------------------------------------------------------------
import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// ----------------------------------------------------------------------

export default function CartWidget() {
  const { cartItems } = useSelector((state) => state.cart);
  // const { department } = useParams();
  return (
    <Badge
      showZero
      badgeContent={cartItems.length}
      color="error"
      max={99}
      component={RouterLink}
      to={`/dashboard/requestinventory/inventoryitems/department/cart`}
    >
      <Icon icon={shoppingCartFill} width={24} height={24} />
    </Badge>
  );
}
