import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import { AccordionSummary } from '@mui/material';
import { AccordionDetails } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AcronymWord } from '../utils/AcronymWord';
import { useState } from "react";
import { Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from "styled-components";
import EllipsisMiddle from './EllipsisMiddle';

const NFT_Details = styled.div`
  
`
const NFT_Wapper = styled.div`
    height: auto;
    
    flex:auto;
    @media (max-width:500px){
        width:38vw;
    }
`
const NFT_Content = styled.div`
    color:white;
    @media (max-width:500px){
        display: grid;
        grid-template-columns: repeat(auto-fill, 24vw);
        margin-left:-10%;
    }
`
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
];

interface Props {
    data?: any
    card?: any
    title?: any
    Div?:any
}

export function SimpleAccordion(props: Props) {
    const { data, card, title ,Div} = props
    const [state, setState] = useState<boolean>()
    function BasicTable() {
        return (

            <TableContainer component={Paper} sx={{ color: "white", background: "none", fontWeight: 900, borderBottom: "1px solid #333" }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ color: "white" }}>
                            <TableCell sx={{ color: "white", fontWeight: 900 }} align='center'>KEY</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: 900 }} align="center">Value</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: 900 }} align="center">Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ fontWeight: 900 }}>
                        {data && data.map((data: any, i: number) => (
                            <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 }, color: "white" }}>
                                <TableCell sx={{ color: "white", fontWeight: 900, borderBottom: "1px solid #333" }} component="th" scope="row" align='center'>
                                    <EllipsisMiddle suffixCount={3}>{data?.fields?.key}</EllipsisMiddle>
                                </TableCell>
                                <TableCell sx={{ color: "white", fontWeight: 900, borderBottom: "1px solid #333" }} align="center">{data?.fields?.value} </TableCell>
                                <TableCell sx={{ color: "white", fontWeight: 900, borderBottom: "1px solid #333" }} align="center">
                                    <EllipsisMiddle suffixCount={7}>{data?.type}</EllipsisMiddle>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
    return (
        <NFT_Wapper>

            {data ?
                <Accordion onChange={(a, e) => setState(e)} sx={{ background: "#171919", color: "white" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography sx={{ color: "white", fontWeight: 900 }}>{title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {data && data.length > 0 ?
                            <Typography sx={{ color: "white" }}>
                                <BasicTable />
                            </Typography>
                            : <div style={{ textAlign: "center" }}>NO DATA</div>}
                    </AccordionDetails>
                </Accordion>
                :
                card ?

                    <Accordion onChange={(a, e) => setState(e)} sx={{ background: "#171919", color: "white" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography sx={{ color: "white", fontWeight: 900 }}>{title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ borderRadius: 40 }}>
                            {card && card.length <= 0 && <div style={{ textAlign: "center" }}>NO DATA</div>}
                            <NFT_Details>
                                {card && card.length > 0 && card.map((t: any, i: number) => <NFT_Content>
                                    {t}

                                </NFT_Content>
                                )}
                                <NFT_Content>
                                    {Div && Div}
                                </NFT_Content>
                            </NFT_Details>
                        </AccordionDetails>
                    </Accordion>
                    : null
            }

        </NFT_Wapper>
    );
}