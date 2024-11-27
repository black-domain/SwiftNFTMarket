/** @format */

import { useWallet } from "@suiet/wallet-kit";
import * as React from "react";
import { SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { collectionListOnChain, getObjectList, packageObjectId, requestCollectionsNFTList, requestMarket, requestUserAllObject, storage, LaunchpadListActivityList, getDynamicFields } from "../../utils/request";
import { Blob } from "nft.storage";
import { useNavigate } from "react-router-dom";
import { fetchImage, onClickGet } from "../../utils/requestBackend";
import { CollectionCard } from "../../components/CollectionCard";
import { AcronymWord } from "../../utils/AcronymWord";
import { Illustration, Tab, TabList, Upload, Card as Web3UIKITCard } from "@web3uikit/core";
import { Ada } from '@web3uikit/icons';
import { ShopCardWrapper } from "../../components/ShopCardWrapper";
import { CollectionCardWrapper } from "../../components/CollectionCardWrapper";
import { useHandleBuyNft } from "../../hooks/useBuyNft";
import { useGetMoney } from "../../hooks/useGetMoney";
import ItemsCard from "./ItemsCard";
import TransactionRecord from "./TransactionRecord";
import './index.less'

import { HomePageNFT } from "../../model/itype";
import { TransactionBlock, getObjectFields } from "@mysten/sui.js";
import { useHandleNotify } from "../../hooks/useNotify";
import { WiredButton } from "wired-elements-react";

import EllipsisMiddle from "../../components/EllipsisMiddle";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Fab, Modal, Stack, Typography } from "@mui/material";
import { CardLoading } from "../../components/CardLoading";
import { LoadingDialog, LoadingInComponents } from "../../components/LoadingDialog";
import { ImageGrid, ImageItem } from "../../components/PictureGridList";
import { Skeleton } from "@mui/material";
import { ScrollTop } from "../../utils/scrollTop";
import { Collapse } from '@arco-design/web-react';
import { client } from "../../utils/api";
import { GET_SLINGSHOT_DATA } from "../../utils/graphql";
import NftListMit from "./NftListMit";
import { ChainStructure, Root2, Slingshot } from "./OwnerProfileType";
import { deepCopy } from "../../utils/deepCopy";
import ListedItem from "./ListedItem";
import { BCS, getSuiMoveConfig } from "@mysten/bcs";
import { sha3_256 } from "js-sha3";
import { MerkleTree } from "merkletreejs";
import ItemsC from "./ItemsC";
import { ButtonAnimation } from "../../components/ButtonAnimation";
import { CopyButton } from "../../components/CopyButton";
import IitemRadioBut from "./Item/IitemRadioBut";
const CollapseItem = Collapse.Item;


/**
 * @tangs
 * 页面底部页脚信息
 * 显示版本相关内容或相关合作伙伴、相关联网页跳转标签等
 * */
const Item = styled.div`
    height: 14.6875rem;
    margin-top: 6.25rem;
    cursor: pointer;
    .uploadFeaturedOverLay {
        background:rgba(0,0,0,0.5);
        height:100%;
        width:100%;
        position:absolute;
        justify-content:center;
        align-items:center;
    }
    &:hover{
        > .uploadFeaturedOverLay{
            display: flex;
        }
    }
    > .uploadFeaturedOverLay{
        display: none;
    }
`
const Container = styled.div`
    // border: #099 solid 1px;
    // height: 22.5rem;
  width: 90%;

  margin: 0 auto;
  color:white; 
    //background-color: #14141f;
    border-radius: 0.9375rem;
  > .aa{
      &:hover{
        > .uploadLogoOverLay {
            display: flex;
        }
      }
      > .uploadLogoOverLay{
          display: none;
      }
  }
   
    h1{
        font-size: 3rem;
        margin-left: 1.25rem;
        margin-bottom: 1.25rem;
    }
    .tabs{
        margin-top: 3.125rem;
        margin-left: 1.25rem;
    }
`
const NFT_Acatar = styled.div`
    position:relative;
    height:9.25rem;
    width:9.25rem;
    cursor:pointer;
    overflow:hidden;
    border-radius:50%;
    margin-top:-3.0625rem;
    > img {
        width:100%;
    }
    > div {
        background:rgba(0,0,0,0.5);
        height:100%;
        width:100%;
        position:absolute;
        z-index:1;
        justify-content:center;
        align-items:center;
        border-radius:50%;
        top:0;
    }
`


const TButton = styled.button`
  background: none;
  color: white;
  border: 1px solid white ;
  padding: 0.75rem;
  border-radius: 1.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  margin: 0.75rem;
  cursor: pointer;

`
const NFT_Tabs = styled(TabList)`
	// border-bottom green line set none
	.gZspVm{
		border: none;
	}
  font-weight: 900;
  color:white;
  margin-bottom:5rem;
  > tab{
    color:orange;
  }
	.sc-ckCjom{
		padding-top: 1.5rem;
	}
  .css-k7y545-MuiButtonBase-root-MuiTab-root{
    color: white;
    font-size: 1.25rem;
    font-weight: 900;
  }
  .css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected,.css-k7y545-MuiButtonBase-root-MuiTab-root.Mui-selected{
    color: #2EBAC6;
  }
  .css-1h9z7r5-MuiButtonBase-root-MuiTab-root{
    color: white;
    font-size: 1.25rem;
    font-weight: 900;
  }
  .css-1aquho2-MuiTabs-indicator{
    background-color: white;
  }
  .sc-cgFpzT{
	margin:0 3.25rem 1.5rem 0;
  }
  .sc-hbjaKc{
	padding: 0.375rem 0;
  }
`



interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}


export const OwnerProfile = () => {
	const [loading, setLoading] = useState<any>(false)
	const [launchpadUploadData, setLaunchpadUploadData] = useState<string[]>([])
	const [launchpadUploadIPFS, setLaunchpadUploadIPFS] = useState<string>("")

	const [data, setData] = useState<any>()
	const [logo, setLogo] = useState<any>()
	const [image, setImage] = useState<any>()
	const navigate = useNavigate()
	const { address, connected, signAndExecuteTransactionBlock,account } = useWallet();
	const [nftItems, setNftItems] = useState([] as any)
	const [collectionList, setcollectionList] = useState<any>([])
	const [isLoading, setIsLoading] = useState(false)
	const { handleNewNotification } = useHandleNotify()
	const [launchpadData, setLaunchpadData] = useState<Slingshot[]>([])
	const [allCollectionType, setAllCollectionType] = useState<any>([])
	const [slingshotType, setSlingshotType] = useState([] as any);
	const [saleWhiteList, setSaleWhiteList] = useState([] as any);
	const [IitemRadioButType, setIItemRadioButType] = useState([] as any[])
	const [filteredArr, setFilteredArr] = useState([] as any[])


	const [selectedItems, setSelectedItems] = useState([] as any);
	function handleItemClick(item: Root2) {

		const index = selectedItems.findIndex((selectedItem: any) => selectedItem.objectId === item.objectId);
		if (index > -1) {
			const newSelectedItems = [...selectedItems];
			newSelectedItems.splice(index, 1);
			setSelectedItems(newSelectedItems);
		} else {
			setSelectedItems([...selectedItems, item]);
		}
	}



	const selectAllFunction = (
		e: any,
		currentData: any[]
	) => {

		if (selectedItems.length === currentData.length) {
			setSelectedItems([])
		} else {

			let aa = currentData.map((item) => {
				return item.data
			})
			setSelectedItems(aa);
		}
		e.stopPropagation();

	};



	const clk = (objId: string) => {
		const arr: ChainStructure = deepCopy(selectedItems);

		const filteredArr = arr.filter((item) => item.objectId !== objId);

		if (filteredArr.length === 0) {
			setOpen(false);
		}

		setSelectedItems(filteredArr);
	};



	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	function flattenArray(arr: any) {
		return arr.reduce((acc: any, val: any) => Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val), []);
	}
	// console.log(address, connected, 'address');
	useEffect(() => {
		ScrollTop()
		if (!connected) { (document.querySelector('#connectWalletButton') as any)?.click() }
		address && getNftFunction(address)

		address && client.query({
			query: GET_SLINGSHOT_DATA(address, "")
		}).then(async (result) => {
			setLaunchpadData(result.data.getSlingshot.slingshot)
			getObjectList(result.data.getSlingshot.slingshot.map((t: any) => t.slingshot_id)).then(e => setSlingshotType(e.map((t: any) => t.data?.content.type)))
			getObjectList(flattenArray(result.data.getSlingshot.slingshot.map((t: any) => (t?.sales)))).then(e => setSaleWhiteList(e.map((t: any) => t.data.content.fields)))
		}).catch((err) => {
			console.log(err, 111);
		})
	}, [address])


	const resRef = useRef<any>({})
	const resArr = useRef<any>([])
	const arr: any = []
	const [objectList, setObjectList] = useState<any>([]) // 第一页的nft

	const handleGetObjectNextCursor = async (address: string, nextPage?: string, isTrue?: boolean) => {
		if (Object.keys(resRef.current).length <= 0) {
			const res2 = await requestUserAllObject(address)
			setObjectList(res2.data)
			if (!res2.hasNextPage) {
				return
			}
			resArr.current.push(...res2.data)
			resRef.current = res2
		}
		if (resRef.current.hasNextPage) {
			const idList = await requestUserAllObject(address, resRef.current.nextCursor)
			resArr.current.push(...idList.data)
			resRef.current = idList
			if (!resRef.current.hasNextPage) {
				setObjectList(resArr.current)
				const uniqueTypes = [...new Set(resArr.current.map((item: any) => item.data.type))];
				setIItemRadioButType(uniqueTypes)
				setFilteredArr(resArr.current)
				return
			}
			resRef.current.hasNextPage && handleGetObjectNextCursor(address, resRef.current.nextCursor as any, resRef.current.hasNextPage)
		}

		return resArr.current
	}




	const getNftFunction = async (address: string) => {
		setIsLoading(true)
		try {
			const idList = await handleGetObjectNextCursor(address)
			const market = await requestMarket(collectionListOnChain)
			setAllCollectionType((market?.data?.content as any).fields?.collection.fields.contents.map((t: { [fields: string]: { [key: string]: string } }) => t.fields))
			let collectionIdList = (market?.data?.content as any).fields?.collection.fields.contents.map((t: { [fields: string]: { [key: string]: string } }) => t.fields.value)
			const collectionListResponse = await getObjectList(collectionIdList)
			console.log(collectionListResponse, 'collectionListResponse');

			setcollectionList(collectionListResponse.filter(t => (t.data?.content as any).fields?.receiver === address && t))

			const resp = idList.data.map((item: any) => {
				return item.data.objectId
			})
			getObjectList(resp).then((res: any) => {
				setIsLoading(false)
			})
		} catch (error) {
			setIsLoading(false)
		}
	};
	useEffect(() => {
		const newData = (objectList as any as HomePageNFT[]).filter((item) => item.data.display?.data && item)
		const result = newData.reduce((acc: any, curr: any) => {
			const index = acc.findIndex((arr: any) => arr.length > 0 && arr[0].data.type === curr.data.type);
			if (index !== -1) {
				acc[index].push(curr);
			} else {
				acc.push([curr]);
			}
			return acc;
		}, []);

		const a = objectList.filter((t: any) => t.data.type.indexOf("ob_kiosk") >= 0 && t)
		a.length === 0 && setNftItems(result)
		getObjectList(objectList.filter((t: any) => t.data.type.indexOf("ob_kiosk") >= 0 && t).map((tt: any) => tt.data.objectId)).then(e => e.forEach(t2 => {
			getDynamicFields((t2?.data?.content as any).fields.kiosk)
				.then(e2 => {
					const arr = e2.data.filter((t: any) => t.name.type === "0x2::kiosk::Item")
					getObjectList(arr.map(t3 => t3.objectId)).then(e3 => {
						e3.forEach((t4: any) => {
							if (t4 && typeof t4.data === 'object') {
								t4.data['kioskId'] = (t2?.data?.content as any).fields.kiosk;
								t4.data['kiosk'] = t2?.data
								t4.data['type'] = "ob_kiosk"
							}
						});
						e3.length > 0 && result.push(e3)
						setTimeout(() => {
							setNftItems(result)
						}, 1000)
					})
				}
				)
		}))

	}, [objectList])


	const typeFunctions = (key: string, event: any, keyPath: string[]) => { //IitemRadioBut 组件类型切换
		const filteredArray = filteredArr.filter((item: any) => item.data.type === key);
		setObjectList(filteredArray)
	}


	async function uploadFile(file: any) {
		return await storage.storeBlob(new Blob([file]))
	}



	useEffect(() => {
		if (logo || image) {
			(async function () {
				const img = await uploadFile(image && image[0])
				const lg = await uploadFile(logo && logo)
				if (lg !== "bafkreihlaroxruttcbzurmbqbqa5fg3vkllcfk54n6xydm7mku2zvkmvbq" && address) {
					await fetchImage(true, lg, address) && setData(await onClickGet(address))
				}
				if (img !== "bafkreihlaroxruttcbzurmbqbqa5fg3vkllcfk54n6xydm7mku2zvkmvbq" && address) {
					await fetchImage(false, img, address) && setData(await onClickGet(address))
				}
			})()
		}
	}, [logo, image])


	const url = "https://bafybeibqnng7dkhduq3pzp52chkhe4xuxu3hoenj5nkqzjrrm6fqizkiny.ipfs.nftstorage.link/"

	const withdraw = (x: any) => {
		const argType = x.data.content.type.slice(x.data.content.type.indexOf("<") + 1, -1)
		const tx = new TransactionBlock() as any;

		tx.moveCall({
			target: `${packageObjectId}::market::collect_profit_collection`,
			typeArguments: [argType],
			arguments: [
				tx.pure(x.data.content.fields.id.id),
				tx.pure(address),
			]
		})

		signAndExecuteTransactionBlock({ transactionBlock: tx }).then((res) => {
			console.log(res, 'transaction successfully executed');
			handleNewNotification('success', 'success Mint NFT', 'Success')
		}).catch((err) => {
			console.log(err, 'transaction failed');
			handleNewNotification('error', 'Mint Failed With Some Error22', 'Error')
		})
	}

	// useEffect(() => {
	// 	requestCollectionsNFTList("0x70ff93c511341f14d2bf88016b1be91bfc9d43fa79a9f8d6ced270e973e38388").then(e => setLaunchpadData(e.data))
	// }, [])


	function isObject123InArray(arr: any, id: string) {
		return arr.some((item: any) => item.objectId == id);
	}
	const onListItem = (x: any, sale: string) => {

		const tx = new TransactionBlock() as any;
		alert(1)
		tx.moveCall({
			target: `${packageObjectId}::launchpad::list_item`,
			typeArguments: ["0xf75b6e1c935c8922c52ca40e2bb9c2dd62eafe8f3db55238d09f97c55004e941::my_swift::AnimalFruit", "0x2::sui::SUI"],
			arguments: [
				tx.pure(x.slingshot_id),
				tx.pure(sale),
				tx.pure("0x06"),
				tx.makeMoveVec({
					objects: [
						tx.object("0x15653615e7d9261e4bf637fe1d2fcde1ab49d59dea71f9b84f768b233180545c"),
						tx.object("0x0f749122efe868c3f33b83de3fc3e6d2803697b01a3d4ab03eac025c0635e3ce")
					]
				}),

			]
		})
		console.log(tx);

		signAndExecuteTransactionBlock({ transactionBlock: tx }).then((res) => {
			console.log(res, 'transaction successfully executed');
			handleNewNotification('success', 'success Mint NFT', 'Success')
		}).catch((err) => {
			console.log(err, 'transaction failed');
			handleNewNotification('error', 'Mint Failed With Some Error22', 'Error')
		})
	}






	const createWhiteList = (lp: any, saleId: string, i: number) => {

		// if(launchpadUploadIPFS==""){
		// 	return alert("Please Waiting Upload File")
		// }
		let typeArguments = slingshotType[i].slice(slingshotType[i].lastIndexOf("<") + 1, slingshotType[i].indexOf(">"))
		typeArguments = typeArguments.toString().split(",").map((t: any) => t.trim());
		const tx = new TransactionBlock() as any;
		console.log(tx);

		// execute function
		const bcs = new BCS(getSuiMoveConfig());

		//@ts-ignore
		const leaves = JSON.parse(launchpadUploadData).map(t => bcs.ser(BCS.ADDRESS, t).toBytes()).map(x => sha3_256(x));

		const tree = new MerkleTree(leaves, sha3_256, { sortPairs: true });
		const root = Array.from(tree.getRoot());


		tx.moveCall({
			target: `${packageObjectId}::launchpad::create_whitelist`,
			typeArguments,
			arguments: [
				lp?.slingshot_id,
				LaunchpadListActivityList,
				saleId,
				root,
				"ipfs://" + launchpadUploadIPFS
			].map((item: any) => tx.pure(item))
		})

		signAndExecuteTransactionBlock({
			transactionBlock: tx, options: {
				showInput: true,
				showEffects: true,
				showEvents: true,
				showObjectChanges: true,
				showBalanceChanges: true
			}
		}).then((res) => {
			console.log(res, 'success transaction');
			handleNewNotification('success', 'Success Create Collection,Please Wait 10-30 Second', 'Success')

		}).catch((err) => {
			console.log(err, 'fail transaction');
			handleNewNotification('error', `${err}`, "Error");
		})

	}

	const whitelistModalStyle = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 800,
		bgcolor: 'background.paper',
		border: '2px solid #ccc',
		boxShadow: 24,
		maxHeight: 800,
		p: 4,
	};
	const [whitelistOpen, setWhitelistOpen] = React.useState(false);
	const handleWhitelistOpen = () => setWhitelistOpen(true);
	const handleWhitelistClose = () => setWhitelistOpen(false);
	const [showWhitelist, setShowWhitelist] = useState("")
	const [selectedTabButton, setSelectedTabButton] = useState(1)


	return (
		<>
			<div className="PersonalDetails">
				<Item className="owner_img" style={{
					background: "grey",
					backgroundImage: `url("/assets/logo.jpg")`,
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
					position: "relative",
					backgroundSize: "100%"
				}}>

					{/*<div className="uploadFeaturedOverLay"*/}
					{/*	onClick={() => (document.querySelector("#uploadFeatured") as HTMLInputElement)?.click()}>*/}
					{/*	<TButton >upLoad files</TButton>*/}
					{/*</div>*/}
				</Item>
				{/*<input type="file" id="uploadFeatured" style={{ display: "none" }} onChange={e => setImage(e.target.files)} />*/}
				{/*<input type="file" id="uploadLogo" style={{ display: "none" }} onChange={e => setLogo(e.target.files)} />*/}

				<div className="PersonalDetails-div owner_img">
					<NFT_Acatar className="aa">
						<img src={`https://api.multiavatar.com/${address}.svg`} alt="" className="Item-img" />
						{/*<div className="uploadLogoOverLay"*/}
						{/*	onClick={() => (document.querySelector("#uploadLogo") as HTMLInputElement)?.click()}>*/}
						{/*	<TButton className="my-iconfont">upLoad files</TButton>*/}
						{/*</div>*/}
					</NFT_Acatar>

					<div style={{ marginLeft: "1.5rem", }}>
						<br />
						{/* <p className="my-iconfont" style={{ fontSize: "1rem", marginBottom: "0.625rem", }}>James Gasila</p> */}
						<p className="my-iconfont" style={{ marginBottom: "0.625rem", fontSize: "0.1rem", color: "rgb(255, 163, 97)" }} >
							<span style={{ marginRight: "0.2rem" }}>{address}</span>  <CopyButton style={{ verticalAlign: "sub" }} text={address ? address : ""} />
						</p>
						<p className="my-iconfont" style={{ fontSize: "1rem", color: "rgb(137, 145, 153)" }}>Joined June 2022</p>
					</div>
				</div>

				<NFT_Tabs
					defaultActiveKey={1}
					onChange={function noRefCheck(e) { setSelectedTabButton(e) }}
					tabStyle="bar"
				>
					<Tab
						tabKey={1}
						tabName={<div style={{ display: 'flex', position: "relative" }}>
							<ButtonAnimation selected={selectedTabButton === 1 ? "selected" : ""} text={"Item"} /><span style={{ paddingLeft: '0.25rem' }}>{' '}</span></div>}
					>


						{!isLoading ? (
							<div className="collpaseNft">
								<div style={{ marginBottom: "1rem" }}>
									<IitemRadioBut typeFunctions={typeFunctions} IitemRadioButType={IitemRadioButType} />
								</div>

								<ItemsC
									clk={clk}
									objectList={objectList}
									selectAllFunction={selectAllFunction}
									handleItemClick={handleItemClick}
									selectedItems={selectedItems}
									nftItems={nftItems}
									allCollectionType={allCollectionType}
								 	index={1}/>

							</div>
						) : (
							<LoadingInComponents />
						)}

					</Tab>

					<Tab tabKey={2} tabName={<div style={{ display: 'flex' }}><span style={{ paddingLeft: '0.25rem' }}>
						<ButtonAnimation selected={selectedTabButton === 2 ? "selected" : ""} text={"Listed"} /></span></div>}>
						<ListedItem />
					</Tab>

					<Tab
						tabKey={3}
						tabName={<div style={{ display: 'flex' }}><span style={{ paddingLeft: '0.25rem' }}><ButtonAnimation selected={selectedTabButton === 3 ? "selected" : ""} text={"Collection"} />{' '}</span></div>}
					>

						<CollectionCardWrapper>
							{collectionList.length > 0 ? collectionList.map((t: any, i: number) => {
								// console.log(t, '123');

								return <div>
									<CollectionCard key={i} stateData={t.data} objectid={t?.data.objectId} data={t?.data?.content.fields} />
									{/*@ts-ignore */}
									<div style={{ display: "flex", justifyContent: "space-between", padding: "0.25rem 0.5rem", alignItems: "center" }}>
										<span>Balance： {t?.data?.content?.fields?.balance.fields.balance / 1000000000 ?? "0"} SUI</span>
										<WiredButton elevation={2} onClick={() => withdraw(t)}>
											{/*@ts-ignore*/}
											{"withdraw"}
										</WiredButton>
									</div>

								</div>
							}) : "NO DATA"}
						</CollectionCardWrapper>

					</Tab>
					<Tab
						tabKey={4}
						tabName={
							<div style={{ display: 'flex' }}>
								<span style={{ paddingLeft: '0.25rem' }}>
									<ButtonAnimation selected={selectedTabButton === 4 ? "selected" : ""} text={"Launchpad"} />
								</span>
							</div>}
					>

						<div className="collpaseNft">
							{
								launchpadData.length > 0 ? launchpadData.map((item: any, index: any) => {
									return <Collapse defaultActiveKey={['0']} style={{ background: "#000000", color: "#fff", display: "flex", flexWrap: "wrap", gap: 0, border: 0, minWidth: "10rem" }} >
										<CollapseItem header={`slingshot ${index + 1}`} name={index}>
											{/* <Button sx={{ border: "1px solid grey" }}>List Item</Button>
										<br />
										<br />
										<Button sx={{ border: "1px solid grey" }}>DeList Item</Button> */}

											<div style={{ display: "flex" }}>

												{item.sales.map((t: string, i: number) => {

													const whitelistTrueObj = saleWhiteList.filter((x: any) => x.id.id === t && x)[0]
													let typeArguments = whitelistTrueObj?.launchpad.type.slice(whitelistTrueObj?.launchpad.type.lastIndexOf("<") + 1, whitelistTrueObj?.launchpad.type.indexOf(">")).split(",").map((t: any) => t.trim())[0];

													return <Card sx={{ maxWidth: 345, margin: 1 }}>
														{whitelistTrueObj?.whitelist ? <Upload
															onChange={async function noRefCheck(e: any) {
																setLoading(true)
																const reader = new FileReader();
																reader.onload = (event: any) => {
																	const content = event.target.result;
																	setLaunchpadUploadData((content));
																};
																reader.readAsText(e);
																setLoading(false)
																const fileHash = await uploadFile(e)
																setLaunchpadUploadIPFS(fileHash)
																console.log(fileHash);
															}}
															theme="textOnly"
														/> : <Web3UIKITCard
															onClick={function noRefCheck() { }}
															setIsSelected={function noRefCheck() { }}
														>
															<div>
																<Illustration
																	height="180px"
																	logo="servers"
																	width="100%"
																/>
															</div>
														</Web3UIKITCard>
														}

														{loading ? <LoadingDialog /> : null}
														<CardContent>
															<Typography gutterBottom variant="h5" component="div">
																<EllipsisMiddle suffixCount={13}>{t}</EllipsisMiddle>
															</Typography>
														</CardContent>
														<CardActions>
															{/* <Button onClick={()=>onListItem(item,t)} size="small">List</Button> */}
															<Button onClick={() => { handleWhitelistOpen(); setShowWhitelist(typeArguments) }} size="small">List</Button>
															<Button size="small">withdraw</Button>
															{whitelistTrueObj?.whitelist && <Button size="small" onClick={() => createWhiteList(item, t, i)}>CreateWhiteList</Button>}
														</CardActions>
													</Card>
												}
												)}
											</div>
										</CollapseItem>
									</Collapse>
								}) : <>NO DATA</>
							}
						</div>

						<Modal
							open={whitelistOpen}
							onClose={handleWhitelistClose}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description"
						>
							<Box sx={whitelistModalStyle}>
								{
									nftItems.map((item: any, index: any) => {

										return showWhitelist === item[0]?.data?.type && <Collapse
											style={{ background: "#000000", color: "#fff", display: "flex", flexWrap: "wrap", gap: 0, border: 0 }}
										>
											<CollapseItem
												header={`Type: ${item[0].data.type}`}
												name={""}
											>
												{!isLoading ?
													// <GridPicList data={nftItems} rowGap={20} showMode="onlyPicture" />
													<ImageGrid rowGap={20} >
														{item.map((item: any, index: any) => {

															return <ImageItem
																onClick={(evt) => {
																	evt.stopPropagation();
																	// UploadedFunction(item)
																	// navigate('/listnft', { state: { id: item.data.objectId, name: item.data.display.data.name, img: item.data.display.data.image_url } })
																}}
																imagePath={item.data.display.data.image_url}
																actionIcon={<img src="/assets/logo.jpg" style={{ width: "2rem" }} />}
																actionPosition="left"
																title={item.data.content.fields.name}
																className={`picp ${isObject123InArray(selectedItems, item.data.objectId) ? 'addBorder' : ""}`}
																imageHeight={"20.3125rem"}
																classNameBar="picc"
																subtitle={
																	<Stack spacing={1} direction={"row"} alignItems={"baseline"}>
																		<span>ID:</span>
																		<EllipsisMiddle style={{ justifyContent: "left" }} suffixCount={8}>{item.data.content.fields.id.id}</EllipsisMiddle>
																	</Stack>

																}
																sxBar={{ padding: ".5rem 1rem" }}
															>
																{
																	isObject123InArray(selectedItems, item.data.objectId) ? <div style={{ position: "absolute", right: "1rem", top: "1rem" }}>
																		<img style={{ width: "1.5rem" }} src="/assets/xuanzd.svg" alt="" />
																	</div> : <div style={{ position: "absolute", right: "1rem", top: "1rem" }}>
																		<img style={{ width: "1.5rem" }} src="/assets/xuanzzz.svg" alt="" />
																	</div>
																}

															</ImageItem>

														})}

													</ImageGrid>
													: <ImageGrid >
														{
															[0, 1, 2, 3].map(() => (
																<Skeleton
																	sx={{
																		bgcolor: "grey.900",
																		borderRadius: "16px",
																		mb: 4
																	}}
																	// animation="wave"
																	variant="rectangular"
																	width={'20rem'}
																	height={"20.3125rem"}
																/>
															))
														}
													</ImageGrid>
												}
												<NftListMit clk={clk} data={selectedItems} col={allCollectionType} open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />
											</CollapseItem>
										</Collapse>
									})
								}
							</Box>
						</Modal>

					</Tab>
					<Tab
						tabKey={5}
						tabName={<div style={{ display: 'flex' }}><span style={{ paddingLeft: '0.25rem' }}><ButtonAnimation selected={selectedTabButton === 5 ? "selected" : ""} text={"Activity"} />{' '}</span></div>}
					>
						<TransactionRecord />
					</Tab>
				</NFT_Tabs>
			</div >
		</>
	)

};
