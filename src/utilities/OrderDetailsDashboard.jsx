import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

const OrderDetailsDashboard = ({ data }) => {
  return (
    <TableContainer
      style={{ border: "1px solid #efefef", boxShadow: "none" }}
      component={Paper}
    >
      <Table sx={{ minWidth: 350 }} aria-label="order details table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ fontSize: "12px", textAlign:'left',  fontWeight: "bold" }}
              align="left"
            >
              ID
            </TableCell>
            <TableCell
              sx={{ fontSize: "12px", textAlign:'left',  fontWeight: "bold" }}
              align="left"
            >
              Order Name
            </TableCell>
            <TableCell
              sx={{ fontSize: "12px", textAlign:'left',  fontWeight: "bold" }}
              align="left"
            >
              Status
            </TableCell>
            <TableCell
              sx={{ fontSize: "12px", textAlign:'left',  fontWeight: "bold" }}
              align="left" 
            >
              Open
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item) => (
            <TableRow
              key={item._id}
              sx={{
                backgroundColor: "#4682A9",
                "&:hover": { backgroundColor: "#376F90" },
                borderRadius: "5px",
                mb: "2px",
              }}
            >
              <TableCell
                sx={{ fontSize: "12px", padding: "15px 10px" }}
                align="left"
              >
                {item.shortId}
              </TableCell>
              <TableCell
                sx={{ fontSize: "12px", padding: "15px 10px" }}
                align="left"
              >
                {item.labelName.length > 16
                  ? item.labelName.slice(0, 16) + "..."
                  : item.labelName}
              </TableCell>
              <TableCell
                sx={{ fontSize: "12px", padding: "15px 10px" }}
                align="left"
              >
                {item.status}
              </TableCell>
              <TableCell>
              <Link
                to={`/dashboard/project/review-approver/${item._id}`}
                style={{
                  color: "#021D41",
                  backgroundColor: "#efefef",
                  padding: "1px 5px",
                  borderRadius: "4px",
                }}
              >
                <VisibilityIcon
                  style={{
                    paddingBottom: "2px",
                    fontSize: "20px",
                  }}
                />
              </Link>
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderDetailsDashboard;
