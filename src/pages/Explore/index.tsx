/** @format */
import React, { ChangeEvent, useEffect, useState } from "react";
import { ScrollTop } from "../../utils/scrollTop";
import styled from "styled-components";
import MenuList from "./components/MenuList";
import ShopList from "./components/ShopList";
import { GET_COLLECTION } from "../../utils/graphql";
import { client } from "../../utils/api";
import { CollectionQuery, CollectionResp, CollectionSortType } from "../../utils/queryApi";
import MyPagingtion from "../../components/Pagingtion";
import { ImageGrid } from "../../components/PictureGridList";
import { ImageLoading } from "../../components/ImageLoading";
import { ExploreType, Root } from "./Explore";
import { getObjectList } from "../../utils/request";

const Wapper = styled.div`
	margin-top: 8.75rem;
	color: white;
	display: flex;
	flex-flow: column;
	min-height: 100%;
`;
/**
 * @tangs
 * 页面底部页脚信息
 * 显示版本相关内容或相关合作伙伴、相关联网页跳转标签等
 * */
const Explore = () => {
	const [collection, setCollection] = useState<Root>([]);
	const [count, setCount] = useState(0);
	const [page, setPage] = useState(0);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		ScrollTop();
		getCollection(param);
	}, []);
	const param = {
		collection_id: "",
		name: "",
		type: [],
		owner: "",
		limit: 12,
		cursor: 0,
		sort_type: CollectionSortType.floor_price,
		reversed: false,
		both_type: true,
		ft_type: '',
		is_certification:0,
		nft_type:""
	};
/**
 * 获取集合数据的异步函数
 * @param prop 包含查询集合所需参数的对象
 */
const getCollection = async (prop: any) => {
	try {
	  // 发起 GraphQL 查询请求
	//   const { data } = await client.query({
	// 	query: GET_COLLECTION(prop),
	//   });
  
	//   // 如果响应中不存在 data 属性，则直接返回
	//   if (!data) return;
  
	//   // 获取响应中的 collection 和 total_collection 属性
	//   const { collection: collections, total_collection: totalCollections } = data.getCollection;
  
	//   // 计算出总页数，并更新状态
	//   const pageCount = Math.ceil(totalCollections / 12);
	//   setCount(pageCount);
  
	//   // 获取每个集合的 ID，以便后续请求该集合下的所有对象
	//   const collectionIds = collections.map(({ collection_id }: any) => collection_id);
  
	//   // 根据集合 ID 请求该集合下的所有对象，并更新状态
	//   const objectList = await getObjectList(collectionIds);
	const defaultCollectionQuery: CollectionQuery = {
		collection_id: '',
		name: '',
		owner: '',
		limit: 10,
		cursor: 0,
		sort_type: CollectionSortType.floor_price,
		reversed: false,
		type: prop?.type,
		both_type: false,
		ft_type: '',
		is_certification:0,
		nft_type:""
	};
	client.query({
		query: GET_COLLECTION(defaultCollectionQuery),
}).then(e=>setCollection(e.data.getCollection.collection))
	} catch (error) {
	  // 如果有任何错误，都在控制台打印出来
	  console.error(error);
	}
  };
  


	// 分类查询处理函数
	const categorySearch = (prop: string[]) => {
		getCollection({ ...param, type: prop.indexOf("All")>=0?[]:prop });
	};
	// 分页
	const onChange = (e: ChangeEvent<unknown>, page: number) => {
		setLoading(true);
		getCollection({ ...param, cursor: page - 1 });
		setTimeout(() => {
			setLoading(false);
		}, 3000);
	};
	setTimeout(() => {
		setLoading(false);
	}, 3000);
	return (
		<>
			<Wapper>
				{/* 筛选列表tag */}
				<MenuList handler={categorySearch} />
				{/*商品展示内容    */}
				{loading ? (
					<ImageGrid>
						{[0, 1, 2, 3].map(item => (
							<ImageLoading key={item} />
						))}
					</ImageGrid>
				) : collection.length > 0 ? (
					<ShopList dataList={collection} />
				) : (
					<img style={{ margin: "0 auto" }} width={200} src="/assets/nothing.png" alt="" />
				)}

				{/* 分页 */}
				{collection.length > 0 ? <MyPagingtion count={count} page={page} onChange={onChange} /> : ""}
			</Wapper>
		</>
	);
};
export default Explore;
