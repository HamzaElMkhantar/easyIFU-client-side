// import React from "react";
// import "./checkList.css";
// const CheckListTable = ({ checkList }) => {
//   console.log({ checkList });
//   return (
//     <div className="">
//       <table>
//         <thead>
//           <th>Questions</th>
//           <th>True</th>
//           <th>False</th>
//           <th>Not Applicable</th>
//         </thead>
//         <tbody>
//           {checkList?.map((item) => {
//             return (
//               <tr key={item._id}>
//                 <td>{item?.questionId?.question}</td>
//                 <td>{item?.answer === "true" && "✔"}</td>
//                 <td>{item?.answer === "false" && "✔"}</td>
//                 <td>{item?.answer === "not_applicable" && "✔"}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CheckListTable;


import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const CheckListTable = ({ checkList }) => {
  return (
    <TableContainer >
      <Table sx={{ minWidth: 650 }} aria-label="checklist table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:'700'}}>Questions</TableCell>
            <TableCell style={{fontWeight:'700'}} align="center">True</TableCell>
            <TableCell style={{fontWeight:'700'}} align="center">False</TableCell>
            <TableCell style={{fontWeight:'700'}} align="center">Not Applicable</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {checkList?.map((item) => (
            <TableRow key={item._id}>
              <TableCell style={{padding:'10px', fontSize:'13px'}} component="th" scope="row">
                {item?.questionId?.question}
              </TableCell>
              <TableCell style={{padding:'10px', fontSize:'13px'}} align="center">
                {item?.answer === "true" ? "✔" : ""}
              </TableCell>
              <TableCell style={{padding:'10px', fontSize:'13px'}} align="center">
                {item?.answer === "false" ? "✔" : ""}
              </TableCell>
              <TableCell style={{padding:'10px', fontSize:'13px'}} align="center">
                {item?.answer === "not_applicable" ? "✔" : ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CheckListTable;
