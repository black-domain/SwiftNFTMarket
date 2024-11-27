import { Box, Button, Card, Grid, IconButton, LinearProgress, Stack, Tooltip, Typography, linearProgressClasses, styled } from "@mui/material"
import { ImageItem } from "../../components/PictureGridList"
import { ReactNode, useEffect, useState } from "react";
import { StepsCard } from "./components/StepsCard";
import { ProgressCard } from "./components/ProgressCard";
import { Image } from "@mui/icons-material";
import { TransactionBlock } from "@mysten/sui.js";
import { getObjectList, packageObjectId, requestCollectionsNFTList, requestMarket } from "../../utils/request";
import { useWallet } from "@suiet/wallet-kit";
import { useHandleNotify } from "../../hooks/useNotify";
import { client } from "../../utils/api";
import { GET_SLINGSHOT_DATA } from "../../utils/graphql";
import Title from "@arco-design/web-react/es/Typography/title";
import Paragraph from "@arco-design/web-react/es/Typography/paragraph";
import { Space } from "@arco-design/web-react";
import copy from "copy-to-clipboard";
import { useLocation, useNavigate, useParams } from "react-router-dom";


export interface LaunchpadData {
    allow_count: string
    balance: Balance
    claimed: Claimed
    end_time: string
    id: Id2
    max_count: string
    minted_count: string
    price: string
    start_time: string
}

export interface Balance {
    type: string
    fields: Fields
}

export interface Fields {
    balance: string
    id: Id
}

export interface Id {
    id: string
}

export interface Claimed {
    type: string
    fields: Fields2
}

export interface Fields2 {
    contents: Content[]
}

export interface Content {
    type: string
    fields: Fields3
}

export interface Fields3 {
    key: string
    value: string
}

export interface Id2 {
    id: string
}

interface DocuProps {
    title: ReactNode
    text: ReactNode
}
const RoadMapDocument = (props: DocuProps) => {
    const { title, text } = props
    return (
        <Box>
            <Typography sx={{ fontSize: "1.5rem", color: "rgb(255, 163, 97)" }}>{title}</Typography>
            <Typography >
                {text}
            </Typography>
        </Box>
    )
}

export const Launchpad = () => {

    const { handleNewNotification } = useHandleNotify()
    const [launchpadData, setLaunchpadData] = useState<LaunchpadData[]>()
    const [saleIdList, setSaleIdList] = useState([])
    const location = useLocation()
    const [time, settime] = useState('')
    const {id:slingshotId} = useParams()

    const localImage = 'https://i.seadn.io/gae/fevOWJMFf3Kv-knvsWvS76GADLxt9O6Hkdex17vh03d9zLGQ-8SfVLEcl5CDRb58i4AMh-a3kpOe-YMSzzcqZDGjbJZR_9mZkjDBgg?auto=format&w=1000'
    const { signAndExecuteTransactionBlock } = useWallet()
    

    useEffect(() => {
        client.query({
            query: GET_SLINGSHOT_DATA("",slingshotId)
        }).then((result) => {
            setSaleIdList(result.data.getSlingshot.slingshot[0].sales)
            console.log(result);
        }).catch((err) => {
            console.log(err, "error");
        })
    }, [])

    useEffect(() => {
            
        saleIdList&&getObjectList(saleIdList).then(e => {
               const arr = e.map((t: any) => t.data.content.fields)
               setLaunchpadData(arr)
    });
    }, [saleIdList])


    useEffect(() => {
        settime(location.state as any)
    }, [location.state])


    
    return (
        <Box sx={{ padding: "2.5rem 0 5rem" }}>
            <Stack direction={"row"}>

                <Stack sx={{ position: "relative", flexBasis: "31.875rem", mr: "3rem" }}>
                    <Stack sx={{
                        position: "absolute",
                        align: "center",
                        cursor: 'pointer',
                        ':hover': {
                            '>img': { width: "4.3rem" }
                        }
                    }} direction={"row"} spacing={1}>

                        <img className="img-1" src="/assets/3.png" style={{ width: "4rem" }} />


                        <div style={{ marginLeft: "1.5rem", }} >
                            <Space direction='vertical'>
                                <div className="div-1" style={{ display: "flex", alignItems: "center", height: "1.5rem", }}>
                                    <Typography sx={{ marginRight: "0.2rem", marginBottom: "0.5rem" }}>Cheapskates</Typography>
                                    <img src="/assets/duigou2.svg" style={{ width: "1.125rem", height: "1.125rem" }} />
                                </div>
                            </Space> 
                        </div>

                    </Stack>

                    <div style={{ position: "absolute", left: "5.4rem", top: "2rem", cursor: 'pointer', }}>
                        <img src="/assets/twitter.svg" width={24} />
                        <span>@Cheapskates</span>
                    </div>

                    <ImageItem
                        sx={{ mb: "2rem", marginTop: "5rem", }}
                        imageHeight={"50.125rem"}
                        imageWidth={"44.125rem"}
                        imagePath={localImage}
                        noItembar
                    />

                    <div className="Typography-text">
                        <Typography style={{ color: "#fff" }} >
                            <Title style={{ marginTop: "0", color: "#fff" }}>Design system</Title>
                            <Paragraph>
                                A design is a plan or specification for the construction of an object or system or for the
                                implementation of an activity or process
                            </Paragraph>
                            <Paragraph>
                                In some cases, the direct construction of an object without an explicit prior plan (such as
                                in craftwork, some engineering, coding, and graphic design) may also be considered
                            </Paragraph>
                            <Paragraph>
                                In some cases, the direct construction of an object without an explicit prior plan (such as
                                in craftwork, some engineering, coding, and graphic design) may also be considered
                            </Paragraph>
                            <Paragraph>
                                In some cases, the direct construction of an object without an explicit prior plan (such as
                                in craftwork, some engineering, coding, and graphic design) may also be considered
                            </Paragraph>
                        </Typography>
                    </div>

                </Stack>
                <Stack sx={{ flex: "0 1 auto", width: "100%", marginTop: "5rem" }}>
                    <Stack sx={{ width: "80%", p: "0", marginBottom: "3rem" }}>
                        <Typography sx={{ fontSize: "3rem", marginBottom: "1.5rem", p: "0" }}>Cheapskates</Typography>

                        {launchpadData?.map((t: any, i: number) => {
                           return new Date().getTime() > t.launchpad.fields?.start_time && new Date().getTime() < t.launchpad.fields?.end_time && <Stack spacing={2}>
                            <RoadMapDocument
                                title={
                                    <Stack sx={{ marginBottom: "0.78rem" }} direction={"row"} justifyContent={"space-between"}>
                                        <Typography style={{ fontSize: "1.5rem" }}>
                                            Total Items: {t.launchpad.fields?.max_count}
                                        </Typography>
                                        <Typography component={Stack} sx={{ flexDirection: "row", alignItems: "center", fontSize: "1.5rem", 'img': { ml: 1 } }}>
                                            View Collection
                                            <img src="/assets/xiangyou.svg" width={15} height={15} />
                                        </Typography>
                                    </Stack>
                                }
                                text={<Grid container rowGap={".5rem"}>
                                    <ProgressCard sx={{ borderRadius: "0", background: "#000", padding: "0" }} data={t} slingshotId={slingshotId??""} saleId={saleIdList[i]} />
                                </Grid>} />
                        </Stack>
                        })}


                        <RoadMapDocument title={<div style={{ marginBottom: "0.78rem", marginTop: "1.5rem" }}>Description</div>} text={"White Swan, an exclusive NFT by Linco7n Concept created in 2016."} />


                        <RoadMapDocument title={<div style={{ marginBottom: "0.78rem", marginTop: "1.5rem" }}>Share this artwork</div>} text={
                            <>
                                <Stack direction={"row"} spacing={2}>


                                    <Stack sx={{
                                        paddingLeft: "0rem",
                                        color: "#fff",
                                        borderRadius: "16px",
                                        ':hover': {
                                            bgcolor: 'grey.900'
                                        }
                                    }} component={Button} direction={"row"} spacing={1}>

                                        <img src="/assets/twitter.svg" width={24} />
                                        <Typography>24.41K</Typography>

                                    </Stack>

                                    <Stack sx={{
                                        color: "#fff",
                                        borderRadius: "16px",
                                        ':hover': {
                                            bgcolor: 'grey.900'
                                        }
                                    }} component={Button} direction={"row"} spacing={1} alignItems={'center'}>

                                        <img src="/assets/discord.svg" height={20} />
                                        <Typography>4.69K</Typography>

                                    </Stack>
                                    <Stack sx={{
                                        ':hover': {
                                            bgcolor: 'grey.900',
                                        }
                                    }} component={IconButton} direction={"row"} spacing={1}>

                                        <img src="/assets/quanqiu.svg" height={22} />

                                    </Stack>


                                    <Stack sx={{
                                        color: "#fff",
                                        borderRadius: "16px",
                                        ':hover': {
                                            bgcolor: 'grey.900'
                                        }
                                    }} component={Button} direction={"row"} spacing={1} alignItems={'center'}>
                                        <Tooltip title={"Copy"}>
                                            <img onClick={() => {
                                                copy('https://market.swiftnftmarket.io/launchpad')
                                            }} style={{ width: "1.5rem" }} src="/assets/copy11.svg" alt="" />
                                        </Tooltip>
                                    </Stack>
                                </Stack>
                            </>
                        } />



                    </Stack>
                    <Stack spacing={2.5} sx={{ width: "80%", color: "#e0e0e0" }} >
                        <Grid container rowGap={"1.5rem"}  >
                            {saleIdList.map((t: any, i: number) => {
                           return  <StepsCard id={1} isEnd info={"w1 · 2 per Wallet · 16 SUI"} />
                                
                            })}
                        </Grid>
                        <Typography sx={{ fontSize: "2rem" }}>Roadmap</Typography>
                        {/* <Stack spacing={2}>
                            <RoadMapDocument
                                title={"Stage 1"}
                                text={"Branding Storywriting Building Tech Creating artwork"} />
                            <RoadMapDocument
                                title={"Stage 2"}
                                text={"Official website Preparing NFT contracts Community Building Whitelisting"} />
                            <RoadMapDocument
                                title={"Stage 3"}
                                text={"Mint Creating CheapFund Merch Store Launching Partnerships"} />
                            <RoadMapDocument
                                title={"Stage 4"}
                                text={"Cheap DAO Fund Management Solutions New generations NFT’s to support CheapDao Dividend Distributions to CheapstakeHolders"} />
                        </Stack> */}
                    </Stack>
                </Stack>
            </Stack>
        </Box >
    )
}

