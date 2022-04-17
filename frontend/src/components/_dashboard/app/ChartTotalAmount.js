// material
import { Card, CardHeader } from "@mui/material";
import 'chart.js/auto';
import {  Line } from "react-chartjs-2";
// import { getAdminProduct } from "../../../actions/productAction";
// ----------------------------------------------------------------------

export default function ChartTotalAmount() {
  //   const { products } = useSelector((state) => state.products);

  

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 4000],
      },
    ],
  };

 
  return (
    <Card>
      <CardHeader title="Total Amount" subheader="-----" />
      <div className="lineChart"><Line data={lineState} /></div>
     
    </Card>
  );
}
