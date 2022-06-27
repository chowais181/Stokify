// import faker from 'faker';
import PropTypes from "prop-types";
import React, { useEffect } from "react";
// material
import { Card, Typography, CardHeader, CardContent } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineConnector,
  TimelineSeparator,
  TimelineDot,
} from "@mui/lab";
// utils
import { fDateTime } from "../../../../utils/formatTime";
import { useSelector, useDispatch } from "react-redux";
import { myOrders } from "../../../../actions/orderAction";
// ----------------------------------------------------------------------

let TIMELINES = [];

// ----------------------------------------------------------------------

OrderItem.propTypes = {
  item: PropTypes.object,
  isLast: PropTypes.bool,
};

function OrderItem({ item, isLast }) {
  const { title, time } = item;

  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          sx={{
            bgcolor:
              (title === "societies" && "red") ||
              (title === "grocery" && "primary.main") ||
              (title === "IT" && "secondary.main") ||
              (title === "sports" && "black") ||
              (title === "furniture" && "yellow") ||
              "error.main",
          }}
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {fDateTime(time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

export default function RequestOrderTimeline() {
  TIMELINES = [];
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.myOrders);

  orders &&
    orders.reverse().map((i) => {
      TIMELINES.push({
        title: i.department,
        time: i.createdAt,
      });
      return 1;
    });
  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);
  return (
    <Card
      sx={{
        "& .MuiTimelineItem-missingOppositeContent:before": {
          display: "none",
        },
      }}
    >
      <CardHeader title="Order Timeline" />
      <CardContent>
        <Timeline>
          {TIMELINES.map((item, index) => (
            <OrderItem
              key={item.title}
              item={item}
              isLast={index === TIMELINES.length - 1}
            />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}
