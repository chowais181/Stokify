// material
import React, { useEffect } from "react";
import { Card, CardHeader } from "@mui/material";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
// Importing toastify module
import {
  clearErrors,
  getAdminProduct,
} from "../../../../actions/vendorProductAction";
export default function DoughnutStockChart() {
  const dispatch = useDispatch();
  let outOfStock = 0;
  let inStock = 0;
  
  const { error, products, loading } = useSelector(
    (state) => state.vendorProducts
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getAdminProduct());
  }, [dispatch, error]);
    if (loading === false) {
      products &&
        products.forEach((item) => {
          if (item.Stock === 0) {
            outOfStock += 1;
          }
        });

   
    }

  if (products && loading === false) {
    inStock = products.length - outOfStock;
  }

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, inStock],
      },
    ],
  };

  return (
    <Card>
      <CardHeader title="Stock Status" subheader="Chart of In & Out Stock" />
      <div className="doughnutChart">
        <Doughnut data={doughnutState} />
      </div>
    </Card>
  );
}
