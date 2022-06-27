// material
import * as React from "react";
import { Card, CardHeader } from "@mui/material";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
// Importing toastify module

export default function DoughnutStockChart() {
  let outOfStock = 0;
  let inStock = 0;
  let len = 0;
  const { allProducts, loading } = useSelector((state) => state.products);

  allProducts &&
    allProducts.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  if (loading === false) {
    len = allProducts && allProducts.length;
  }

  if (allProducts && loading === false) {
    inStock = len - outOfStock;
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
