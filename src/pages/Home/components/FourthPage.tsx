import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { HomeRanking } from "../../../components/HomeRanking";
import { client } from "../../../utils/api";
// import { GET_COLLECTION_ALL } from "../../../utils/graphql";
import { HomeRankingType } from "../../../model/HomeRanking";
import { Link, useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import { ListProps } from "antd";
import DataList from "../../../components/DataList";
import { CollectionAnalysisQuery, CollectionAnalysisReqResult, CollectionAnalysisSortType, CollectionQuery, CollectionResp, CollectionSortType } from "../../../utils/queryApi";
import { GET_COLLECTION, GET_COLLECTION_ANALYSIS } from "../../../utils/graphql";
import { LoadingDialog, LoadingInComponents } from "../../../components/LoadingDialog";
import { NoData } from "../../../components/NoData";
import { ScrollTop } from "../../../utils/scrollTop";
import { ButtonAnimation } from "../../../components/ButtonAnimation";
import LinKBut from "../../../components/LinKBut";

const Wrapper = styled.div`
  padding: 20px;
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:12px;
  @media (max-width: 500px) {
    display: grid;
    gap: 20px 0;
    /* border: 1px solid red; */
    grid-template-columns: repeat(auto-fill, 490px);
  }
`
const NFT_Content = styled.h3`
    display: flex;
    justify-content: space-between;
    h1 {
		margin: 1.5rem 0;
		font-size:1.5rem;
	}
	h3 {
		margin: 1.5rem 0;
		cursor: pointer;
	}
`


export const FourthPage = () => {
    const { t } = useTranslation()
    const [marketList, setMarketIdList] = useState<HomeRankingType[]>([])
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState<CollectionResp>({} as CollectionResp)
    const [passingParameters, setPassingParameters] = useState<CollectionQuery>({
        collection_id: '',
        name: "",
        owner: "",
        limit: 10,
        cursor: 0,
        sort_type: CollectionSortType.total_volume,
        reversed: true,
        type: [],
        both_type: true,
        ft_type: "",
        nft_type:"",
        is_certification:0
    })

    function fetchCollection() {
        setLoading(true)

        client.query({
            query: GET_COLLECTION(passingParameters)
        }).then((result) => {
            const d = result.data.getCollection
            setData(d as CollectionResp)
            setLoading(false)
        }).catch((err) => {

            console.error("request collectionAnalysis error: ", err)
            setLoading(false)
        })

    }

    useEffect(() => {
        // const params = JSON.stringify(passingParameters)
        fetchCollection()
    }, [])


    return (
        <>
            <Box sx={{ mb: 10 }}>
                {/**@title*/}
                <NFT_Content>
                    <h1 className="my-iconfont">Data Analyzer</h1>
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                        {/* <h3
                      style={{ display: "flex", alignItems: "center" }}
						onClick={() => {
							ScrollTop();
							navigate("/explore");
						}}>
                        <ButtonAnimation text={t("second.more")}/>
					</h3>
				</Stack>
						{t("second.more")}
					<img style={{ marginLeft: "0.5rem", width: "0.9375rem", height: "0.9375rem",marginTop:"0.2rem"  }}  src="/assets/xiangyou.svg" width={15} height={15}/>
					</h3> */}
                        <LinKBut title={'More Explore'} onClick={() => {
                            ScrollTop();
                            navigate("/explore");
                        }} />
                    </Stack>
                </NFT_Content>

                {/**@列表*/}
                {/* <Wrapper style={{}}>

                    {(marketList&&marketList.length>10? marketList.slice(0,10): marketList).map((t)=>{ // @ts-ignore
                        return <span key={t.collection_id}><HomeRanking data={t}/></span>})}
                </Wrapper> */}
                <Stack direction={"row"} spacing={2.5}>
                    {!isLoading ?

                        data.collection && data.collection.length >= 10 ?
                            <>
                                <DataList sx={{ flex: "1 1 50%" }} data={data.collection.slice(0, 5)} />
                                <DataList sx={{ flex: "1 1 50%" }} data={data.collection.slice(5, 10)} />
                            </>
                            :
                            data.collection && data.collection.length > 0 ? <DataList sx={{ flex: "1 1 50%" }} data={data.collection} />
                                :
                                <NoData />
                        :
                        <LoadingInComponents />
                    }
                </Stack>
            </Box>
        </>
    )
}