import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function DashTable({recentLabels}) {

  return (
    <div style={{ border: '', boxShadow: 'none' }} className='card'>
        <TableContainer style={{ border: '1px solid #efefef', boxShadow: 'none' }} component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
            <TableHead>
            <TableRow style={{fontSize:'12px'}}>
                <TableCell sx={{ fontSize: '12px' }} align="left">ID</TableCell>
                <TableCell sx={{ fontSize: '12px' }} align="left">Name</TableCell>
                <TableCell sx={{ fontSize: '12px' }} align="left">Version</TableCell>
                <TableCell sx={{ fontSize: '12px' }} align="left">Status</TableCell>
            </TableRow>
            </TableHead> 
            <TableBody> 
            {recentLabels?.map((row) => (
            <TableRow
            key={row._id}
            sx={{
              '&:hover': { backgroundColor: 'rgba(244,117,96, .1)' },
            }}
          >
                <TableCell sx={{ fontSize: '12px' }} align="left">{row.shortId}</TableCell>
                <TableCell sx={{ fontSize: '12px' }} align="left">{row.labelName}</TableCell>
                <TableCell sx={{ fontSize: '12px' }} align="left">{row.labelVersion}</TableCell>
                <TableCell sx={{ fontSize: '12px' }} align="left">{row.status}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
  );
}
