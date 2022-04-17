import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { useTheme, styled } from "@mui/material/styles";
import { Card, CardHeader } from "@mui/material";
// utils
import { fNumber } from "../../../utils/formatNumber";
//
import { BaseOptionChart } from "../../charts";
//
import { getProduct } from "../../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useAlert } from "react-alert";
//
// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled("div")(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  "& .apexcharts-canvas svg": { height: CHART_HEIGHT },
  "& .apexcharts-canvas svg,.apexcharts-canvas foreignObject": {
    overflow: "visible",
  },
  "& .apexcharts-legend": {
    height: LEGEND_HEIGHT,
    alignContent: "center",
    position: "relative !important",
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------
// const Categories = ["grocery", "IT", "furniture", "societies", "sports"];
let CHART_DATA = [1, 1, 1, 1, 1];

export default function TotalProductsByCategory() {
  let gro = 0,
    it = 0,
    fur = 0,
    soc = 0,
    spo = 0;
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, allProducts, loading } = useSelector(
    (state) => state.products
  );

  allProducts &&
    allProducts.forEach((item, index) => {
      if (item.department === "grocery") {
        gro++;
      } else if (item.department === "IT") {
        it++;
      } else if (item.department === "furniture") {
        fur++;
      } else if (item.department === "societies") {
        soc++;
      } else if (item.department === "sports") {
        spo++;
      }
    });

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProduct());
  }, [dispatch, error, alert]);

  if (loading === false) {
    CHART_DATA[0] = gro;
    CHART_DATA[1] = it;
    CHART_DATA[2] = fur;
    CHART_DATA[3] = soc;
    CHART_DATA[4] = spo;
  }

  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.info.main,
      theme.palette.warning.main,
      theme.palette.error.main,
    ],
    labels: ["Grocery", "IT", "Furniture", "Socities", "Sports"],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: "center" },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
  });

  return (
    <Card>
      <CardHeader
        title="Stock By Categories"
        subheader="Chart of Available Products of each category"
      />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart
          type="pie"
          series={CHART_DATA}
          options={chartOptions}
          height={280}
        />
      </ChartWrapperStyle>
    </Card>
  );
}
