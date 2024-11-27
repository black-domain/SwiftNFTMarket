/** @format */

import * as React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { SetStateAction, useEffect, useState } from "react";
import { ShopCard } from "../../components/ShopCard";
import { FilterCategories } from "../../components/FilterCategories";
import { ExhibitCard } from "./components/ExhibitCard";
import { client } from "../../utils/api";
import { ScrollTop } from "../../utils/scrollTop";
import { ShopCardWrapper } from "../../components/ShopCardWrapper";
import { getObjectList, requestCollectionsNFTList, requestMarket } from "../../utils/request";
import InformationCard from "./components/InformationCard";
import { useWallet } from "@suiet/wallet-kit";
import Sidebar from "./components/Sidebar";
import './index.less'
import { GET_COLLECTION } from "../../utils/graphql";
import { CollectionQuery, CollectionSortType } from "../../utils/queryApi";

/**
 * @tangs
 * 页面底部页脚信息
 * 显示版本相关内容或相关合作伙伴、相关联网页跳转标签等
 * */

const Wrapper = styled.div`
	color: white;
`;
const NFT_List = styled.div`
	width: 100%;
	padding: 0 4%;
	.div {
		display: flex;
		margin: 0.75rem 0;
		h1 {
			color: white;
			margin: 0 1.25rem;
		}
	}
`;

const Collections = () => {
    const navigator = useNavigate()
    const { state } = useLocation() as any
    const { id: collectionId } = useParams();
    const [nftData, setNftData] = useState<SetStateAction<any>>([])
    const [nftListData, setNftListData] = useState<SetStateAction<any>>([])
    const [logoAndFeatured, setLogoAndFeatured] = useState<any>({})
    const [collectionData, setCollectionData] = useState<any>({})
    const { col } = useParams()
    const { address, connected } = useWallet();


    useEffect(() => {
       
        ScrollTop()
        const defaultCollectionQuery: CollectionQuery = {
			collection_id: collectionId as string,
			name: '',
			owner: '',
			limit: 10,
			cursor: 0,
			sort_type: CollectionSortType.floor_price,
			reversed: false,
			type: [],
			both_type: false,
            ft_type: '',
            is_certification:0,
            nft_type:""
        };
        client.query({
			query: GET_COLLECTION(defaultCollectionQuery),
	}).then(e=>setCollectionData(e.data.getCollection.collection[0]))
    }, [])

    useEffect(() => {
        ScrollTop()
        if (!connected) { (document.querySelector('#connectWalletButton') as any)?.click() }

        // if (!state.collection){navigator('/explore')}
        (async function () {

            const nftList: any = await requestCollectionsNFTList(collectionId ?? state.id.id)
            const nft = await getObjectList(nftList.data.map((t: any) => t.name.value))
            setNftData(nft)
            setNftListData(nftList.data)

        })()
 
    }, [connected])

    

    const onSale = nftData.map((t: any) => t.on_sale).filter((t: any) => t && t).length
    
    return (
        <div style={{ display: "flex", margin: "0 -17.5rem", width: "100vw", justifyContent: "center",position:"relative" }} >
        <div style={{  width: "100vw",position:"fixed",top:0,left:0,height:"100vh",zIndex:-2, justifyContent: "center",backgroundImage:`url(${collectionData?.featured_image?collectionData?.featured_image:"/assets/default_featured_img.jpg"})`,backgroundPosition:"center",backgroundSize:"cover",filter:"blur(5px)",backgroundRepeat:"no-repeat" }} />
        <div style={{  width: "100vw",position:"fixed",top:0,left:0,height:"100%",zIndex:-1, justifyContent: "center",background:"rgba(0,0,0,0.7)" }} />
            
            {/* <Sidebar /> */}
            <Wrapper style={{ color: 'white' }}>
                {state?
                <InformationCard logo={state?.logo_image}
                    bgImage={state?.featured_image}
                    nftListData={nftListData}
                    CollectionType={state?.type} onSale={onSale} data={logoAndFeatured} state={state} nftData={nftData} />
                    :
                    <InformationCard logo={collectionData?.featured_image}
                    bgImage={collectionData?.featured_image}
                    nftListData={nftListData}
                    CollectionType={collectionData?.type} onSale={onSale} data={logoAndFeatured} state={collectionData} nftData={nftData} />
                }

            </Wrapper>
        </div>
    );
};
export default Collections;
