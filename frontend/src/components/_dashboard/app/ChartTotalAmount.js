// material
import { Card, CardHeader } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders } from "../../../actions/orderAction.js";
import React, { useEffect } from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";

// ----------------------------------------------------------------------
let totalAmount = 0;
export default function ChartTotalAmount() {
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

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  return (
    <Card>
      <CardHeader title="Total Amount" subheader="-----" />
      <div className="lineChart">
        <Line data={lineState} />
      </div>
    </Card>
  );
}
