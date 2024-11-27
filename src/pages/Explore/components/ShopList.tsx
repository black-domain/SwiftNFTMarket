import React, { ChangeEvent, useEffect, useState } from "react";
import { ImageItem } from "../../../components/PictureGridList/components/_ImageItem";
import { ImageGrid } from "../../../components/PictureGridList/components/_ImageGrid";
import EllipsisMiddle from "../../../components/EllipsisMiddle";
import { useNavigate } from "react-router-dom";
import { ScrollTop } from "../../../utils/scrollTop";
import MyPagingtion from "../../../components/Pagingtion";
import Pagination from "@mui/material/Pagination";
import { getObjectList } from "../../../utils/request";

export default function ShopList(prop: any) {
	const { dataList } = prop;
	const navigate = useNavigate();
	const [collection, setCollection] = useState([] as any);

	const ck = async (collection_id: string) => {
		const filData = collection.filter((item: any) => item.data.objectId == collection_id)
		navigate(`/collection/${collection_id}`, { state: filData[0].data });
		
	}

	const getData = async (collectionArr: any[]) => {
		const resp = await getObjectList(collectionArr);
		setCollection(resp);
	}

	useEffect(() => {
		let arr = [] as any[];
		dataList.map((item: any) => arr.push(item.collection_id));
		getData(arr)
	}, [])


	return (
		<div className="shopList_container">
			{/* <GridPicList data={dataList} showMode="show" /> */}
			<ImageGrid>
				{dataList.map((_item: any, index: number) => {
					const { owner:receiver, logo_image, name, featured_image } = _item;
					const handleImg = () => {
						if (_item?.data?.content?.dataType === "moveObject") {
							return [
								"https://ipfs.io/ipfs/" + _item?.data?.content?.fields.logo_image.slice(7),
								"https://ipfs.io/ipfs/" + _item?.data?.content?.fields.featured_image.slice(7),
							];
						} else {
							return [logo_image, featured_image];
						}
					};
					return (
						<ImageItem
							key={index}
							className="item_container"
							// imageWidth={"20.3125rem"}
							imageHeight={"20.3125rem"}
							actionIcon={
								<img
									style={{
										width: "3rem",
										height: "3rem",
									}}
									src={_item.logo_image}
								/>
							}
							actionPosition="left"
							position="below"
							title={<div style={{display:"flex",alignItems:"center"}}>
								<span style={{marginRight:4,fontWeight:"bold"}}>{name}</span>
								{_item.is_certification&&<img src="/assets/verify_office.svg" style={{width:"1rem",height:"1rem"}} alt=""/>}
							</div>
							}
							subtitle={
								<span style={{ color: "rgba(255,255,255,.7)", display: 'flex', flexDirection: "row", alignItems: 'center' }}>
									Floor Price：{_item.floor_price/1e9} SUI
								</span>
							}
							imagePath={handleImg()[1]}
							onClick={() => {
								const collection_id = _item.data ? _item.data.objectId : _item.collection_id;
								// console.log(collection_id, 'collection_id');

								if (_item) {

									navigate(`/collection/${_item.collection_id}`, { state: _item });
								} else {
									ck(collection_id)
								}

								ScrollTop();
							}}></ImageItem>
					);
				})}
			</ImageGrid>
		</div>
	);
}
