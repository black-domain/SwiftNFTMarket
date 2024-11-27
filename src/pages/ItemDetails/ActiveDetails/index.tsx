import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EllipsisMiddle from '../../../components/EllipsisMiddle';
import { LoadingInComponents } from '../../../components/LoadingDialog';
import { NoData } from '../../../components/NoData';
import DateUtil from '../../../utils/formatData';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const index = ({ data, isLoading }: any) => {
    return (
        <TableContainer sx={{ bgcolor: "rgb(23, 24, 26)", flex: "auto", borderRadius: '1rem', padding: "0 1.5rem", height: '20.75rem' }} component={Paper}>
            <h2 style={{ color: "white", marginTop: 20 }}> Total Transaction ({data?.total_item_transaction} {data?.length>0?data?.length+" Messages":"serving"} )</h2>

            <Table sx={{ minWidth: 650, bgcolor: "rgb(23, 24, 26)" }} aria-label="simple table">
                <TableHead >
                    <TableRow>
                        <TableCell sx={{ color: "rgb(255, 255, 255)" }} align="center">Buyer</TableCell>
                        <TableCell sx={{ color: "rgb(255, 255, 255)" }} align="center">Seller</TableCell>
                        <TableCell sx={{ color: "rgb(255, 255, 255)" }} align="center">Price</TableCell>
                        <TableCell sx={{ color: "rgb(255, 255, 255)" }} align="center">Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!isLoading ?
                        data?.length > 0 ? data?.map((row: any) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                                {/* <TableCell sx={{ color: "rgb(255, 255, 255)" }} component="th" scope="row">
                                {row.name}
                            </TableCell> */}
                                <TableCell sx={{ color: "rgb(255, 255, 255)" }} align="center">{EllipsisMiddle({ suffixCount: 7, children: row.to })}</TableCell>
                                <TableCell sx={{ color: "rgb(255, 255, 255)" }} align="center">{EllipsisMiddle({ suffixCount: 7, children: row.from })}</TableCell>
                                <TableCell sx={{ color: "rgb(255, 255, 255)" ,display:"flex",justifyContent:"center"}} align="center"><div style={{display:"flex",justifyContent:"space-between",width:"50px"}}> <img src="/assets/suipng.png" style={{width:"1rem",height:"1rem"}} alt=""/>&nbsp;{(row.price / 10 ** 9).toFixed(2)}</div></TableCell>
                                <TableCell sx={{ color: "rgb(255, 255, 255)" }} align="center">{DateUtil.formatDate(Number(row.timestamp) / 1000)}</TableCell>
                            </TableRow>
                        )) :
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <NoData sx={{ p: 0 }} imgHeight={"10.75rem"} />
                                </TableCell>
                            </TableRow>
                        : <TableRow>
                            <TableCell colSpan={4}>
                                <LoadingInComponents style={{ padding: "2.5rem 0", backgroundColor: "transparent" }} />
                            </TableCell>

                        </TableRow>
                    }
                </TableBody>
            </Table>
        </TableContainer >
    )
}

export default index