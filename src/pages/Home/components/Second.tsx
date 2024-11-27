
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Button } from "../../../components/Button";
import { ShopCard } from "../../../components/ShopCard";
import { CollectionCard } from "../../../components/CollectionCard";
import { ScrollTop } from "../../../utils/scrollTop";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "../../../utils/api";
import { GET_COLLECTION } from "../../../utils/graphql";
import { CollectionCardWrapper } from "../../../components/CollectionCardWrapper";
import { ClientWidth } from "../../../utils/ClientWidth";
import { collectionListOnChain,  getDynamicFields, getObjectList, requestMarket } from "../../../utils/request";

import { ImageCardData } from "../../../model/NFT";
import { GridPicList } from "../../../components/GridPicList";
import { ImageGrid, ImageItem } from "../../../components/PictureGridList";
import EllipsisMiddle from "../../../components/EllipsisMiddle";
import { Grid, Skeleton, Stack } from "@mui/material";
import ShopList from "../../Explore/components/ShopList";
import { CollectionQuery, CollectionSortType, UserTransactionQuery, UserTransactionSortType } from "../../../utils/queryApi";

import { BorderRight } from "@mui/icons-material";
import { ImageLoading } from "../../../components/ImageLoading";
import { ButtonAnimation } from "../../../components/ButtonAnimation";
import LinKBut from "../../../components/LinKBut";

const Wrapper = styled.div`
	display: grid;
	justify-content: space-between;
	grid-template-columns: 1fr 1fr 1fr;
	@media (max-width: 500px) {
		width: 500px;
		display: grid;
		gap: 20px 0;
		grid-template-columns: repeat(auto-fill, 490px);
	}
`;
const Wid = styled.div`
	max-width: 100%;
	margin: 0 auto;
`;
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
`;
export const SecondPage = () => {
	const navigate = useNavigate();
	const [collection, setCollection] = useState([] as any);
	const [isLoading, setLoading] = useState(false);

	const getCollectionId = async () => {
		setLoading(true)

		const defaultCollectionQuery: CollectionQuery = {
			collection_id: '',
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
	}).then(e=>setCollection(e.data.getCollection.collection))
		
		setLoading(false)
	};
	useEffect(() => {
		getCollectionId();
	}, []);

	return (
		<Wid>
			<NFT_Content>
				<h1 className="my-iconfont" style={{fontSize:"1.5rem"}}>Collections</h1>
				<Stack direction={"row"} spacing={1} alignItems={"center"}>
					{/* <h3
						style={{ display: "flex", alignItems: "center" }}
						onClick={() => {
							ScrollTop();
							navigate("/explore");
						}}>
						<ButtonAnimation text={t("second.more")}/>
					</h3>
						{t("second.more")}
						<img style={{ marginLeft: "0.5rem", width: "0.9375rem", height: "0.9375rem",marginTop:"0.2rem" }} src="/assets/xiangyou.svg" />
					</h3> */}
					<LinKBut title={'More Explore'} onClick={() => {
						ScrollTop();
						navigate("/explore");
					}} />
				</Stack>
			</NFT_Content>
			{!isLoading ?
				collection.length >= 1 ?
					<ShopList dataList={collection.slice(0, 4)} />
					:
					<Stack alignItems={"center"} sx={{ padding: "2rem 0" }}>
						<img src={"/assets/nothing.png"} />
					</Stack>

				:
				<ImageGrid>
					{[0, 1, 2, 3].map((item) => (
						<ImageLoading key={item} />
					))}
				</ImageGrid>

			}
		</Wid>
	);
};
