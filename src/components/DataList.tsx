/*
 * @Author: qiancheng12 wancheng@storswift.com
 * @Date: 2023-04-24 15:37:04
 * @LastEditors: qiancheng12 wancheng@storswift.com
 * @LastEditTime: 2023-05-05 10:46:28
 * @FilePath: \Nft\nft-trading-website\src\components\DataList.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { Image } from "@mui/icons-material";
import { Box, Card, Divider, Grid, List, ListItem, ListItemIcon, Stack, SxProps, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { client } from "../utils/api";
import { GET_COLLECTION_ANALYSIS } from "../utils/graphql";
import { CollectionAnalysisReqResult, CollectionAnalysisQuery, CollectionAnalysisSortType, CollectionAnalysis, Collection } from "../utils/queryApi";



interface ListProps {
    data: Collection[]
    sx?: SxProps;
}
const DataList = (props: ListProps) => {
    const { data, sx } = props

    const Item = (p: { value: string, label: string }) => {
        return (
            <Stack spacing={1} >
                <Typography sx={{ fontWeight: 900, fontSize: "1rem" }}>{p.value}</Typography>
                <Typography sx={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.75rem" }}>{p.label}</Typography>
            </Stack>
        )
    }
    return (
        <Card sx={{ bgcolor: "#17181A", borderRadius: "1rem", color: "inherit", ...sx }}>
            <List sx={{ padding: "0.75rem " }}>

                {data.map((item, index) => {
                    return (
                        <Box sx={{ padding: "0 1rem" }} key={index}>
                            <ListItem sx={{ padding: "0.75rem 0" }}>
                                <Grid container spacing={2} direction={"row"} alignItems={"center"} sx={{ margin: 0, padding: 0, display: "contents" }}>
                                    <Grid sx={{display:"flex", alignItems:'center'}}>
                                        <ListItemIcon sx={{ borderRadius: "1rem", 'img': { borderRadius: "8px" } }}>
                                            <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "8px", backgroundImage: `url(${item.logo_image})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center" }} />
                                        </ListItemIcon>
                                    </Grid>
                                    <Grid sx={{ width: "14.3125rem" }}>
                                        <Typography component={Box} sx={{ ml: "0.75rem", color: "#fff !important",display:"flex",alignItems:"center", fontWeight: 600 }}>
                                            {item.name}&nbsp;{item.is_certification&&<img src="/assets/verify_office.svg" style={{width:"1rem",height:"1rem"}} alt=""/>}
                                        </Typography>
                                    </Grid>
                                    <Grid sx={{ width: "20.5rem", justifyContent: "space-between" }} >
                                        <Stack direction={"row"} width={"100%"} justifyContent={"space-between"}>
                                            <Item value={String((Number(item.floor_price)/1e9).toFixed(2))} label="Floor Price" />
                                            <Item value={item.on_sale_count.toString()} label="On Sell" />
                                            <Item value={String((Number(item.total_volume) / 1e9).toFixed(2))} label="Total Volume" />
                                            <Item value={item.item_count.toString()} label="Items" />
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </ListItem>

                            {index === 4 ? null : <Divider sx={{ borderColor: "rgb(45, 47, 51)" }} />}
                        </Box>
                    )
                })}
            </List>
        </Card>
    )


}

export default DataList;



