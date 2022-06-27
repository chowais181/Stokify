import React from "react";
import "./CartItemCard.css";
import { Divider} from "@material-ui/core";
const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <div>
        <h4>{item.name}</h4>
        <Divider/>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
