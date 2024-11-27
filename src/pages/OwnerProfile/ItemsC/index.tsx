import { Collapse } from '@arco-design/web-react';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { ImageGrid, ImageItem } from '../../../components/PictureGridList';
import { Fab, Skeleton, Stack } from '@mui/material';
import EllipsisMiddle from '../../../components/EllipsisMiddle';
import NftListMit from '../NftListMit';
import { ChainStructure, Root, Root2 } from '../OwnerProfileType';
import { deepCopy } from '../../../utils/deepCopy';
import { ButtonAnimation } from '../../../components/ButtonAnimation';
import MyPagingtion from '../../../components/Pagingtion';

interface Props {
    item?: Root[];
    objectList: Root[];
    allCollectionType: any
    index: number
    nftItems: Root[][]
    selectedItems: Root2[]
    handleItemClick: (Root2: any) => void
    selectAllFunction: (e: any, currentData: any[]) => void
    clk: (objId: string) => void
}

function Index(props: Props) {
    const { item, allCollectionType, objectList, selectedItems, handleItemClick, selectAllFunction, clk } = props;
    const [isExpand, setIsExpand] = useState(false); // 判断下拉菜单的开启关闭
    const [open, setOpen] = useState(false); //mint 框


    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [totalPages, setTotalPages] = useState(0);
    const [currentData, setCurrentData] = useState([] as any[]);



    useEffect(() => {
        // 分页
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const totalPages = Math.ceil(objectList.length / pageSize);
        setTotalPages(totalPages)
        setCurrentData(objectList.slice(startIndex, endIndex));

    }, [objectList, currentPage, pageSize])

    function handlePageClick(e: ChangeEvent<unknown>, page: number) {
        setCurrentPage(page);
    }


    // mint 点击事件
    const handleClickOpen = () => {
        setOpen(true);
    };



    const isObject123InArray = (arr: any[], id: string) => {
        return arr.some((item: any) => item.objectId == id);
    };


    const handleClose = () => {
        setOpen(false);
    };

    const typeFunction = (type: string) => {
        const typeArr = selectedItems.filter((item: any) => item.type === type)
        if (typeArr.length === item?.length) {
            return true
        } else {
            return false
        }
    }





    return (

        <>
            {/* <button
                onClick={(e) => selectAllFunction(e, typeFunction(item[0].data.type), item, item[0].data.type)}
                style={{ background: "#1296db", border: "none", padding: "1rem", width: "10rem", borderRadius: "1rem", color: "#fff" }}>
                {typeFunction(item[0].data.type) ? "Cancel All" : "Select All"}
            </button> */}
            {/* <Collapse
                bordered={false}
                onChange={() => setIsExpand(!isExpand)}
                style={{ background: "none", display: "flex", flexWrap: "wrap", gap: 0, border: 0 }}
            >
                <Collapse.Item
                    header={
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <EllipsisMiddle disableHoverListener={true} suffixCount={18}>{"Type :" + item[0]?.data?.type}</EllipsisMiddle>
                            {isExpand && (
                                <div
                                    onClick={(e) => selectAllFunction(e, selectedItems.length === item.length, item, item[0].data.type)}>
                                    <ButtonAnimation text={selectedItems.length === item.length ? "Cancel All" : "Select All"}/>
                                </div>
                               
                            )}
                        </div>
                    }
                    name={""} > */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <div>
                    {objectList.length > pageSize ? <MyPagingtion count={totalPages} page={currentPage} onChange={handlePageClick} /> : <></>}
                </div>
                <div>
                    <button
                        onClick={(e) => selectAllFunction(e, currentData)}
                        style={{ background: "#1296db", border: "none", padding: "1rem", width: "10rem", borderRadius: "1rem", color: "#fff" }}>
                        {selectedItems.length === currentData.length ? "Cancel All" : "Select All"}
                    </button>
                </div>
            </div>
            <ImageGrid rowGap={20} sx={{ overflowY: "unset" }}>
                {currentData && currentData?.map((item: any, index: any) => (
                    <ImageItem
                        key={item.data?.objectId}
                        sx={{ overflowY: "hidden" }}
                        onClick={(evt) => {
                            evt.stopPropagation();
                            handleItemClick(item.data);
                        }}
                        imagePath={item.data?.display.data?.image_url}
                        actionIcon={<img src="/assets/logo.jpg" style={{ width: "2rem" }} />}
                        actionPosition="left"
                        title={item.data?.content.fields.name}
                        className={`picp ${isObject123InArray(selectedItems, item.data?.objectId) ? 'addBorder' : ""}`}
                        imageHeight={"20.3125rem"}
                        classNameBar="picc"
                        subtitle={
                            <Stack spacing={1} direction={"row"} alignItems={"baseline"}>
                                <span>ID:</span>
                                <EllipsisMiddle style={{ justifyContent: "left" }} suffixCount={8}>{item.data?.content.fields.id.id}</EllipsisMiddle>
                            </Stack>

                        }
                        sxBar={{ padding: ".5rem 1rem" }}
                    >
                        <div style={{ position: "absolute", right: "1rem", top: "1rem" }}>
                            <img style={{ width: "1.5rem" }} src={isObject123InArray(selectedItems, item.data?.objectId) ? "/assets/xuanzd.svg" : "/assets/xuanzzz.svg"} alt="" />
                        </div>
                    </ImageItem>
                ))}
            </ImageGrid>
            {/* </Collapse.Item>
            </Collapse> */}

            <NftListMit
                clk={clk}
                data={selectedItems}
                col={allCollectionType}
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose} />

            {
                selectedItems.length > 0 ? <Fab onClick={handleClickOpen} sx={{ width: "10rem", position: "fixed", right: '4rem', bottom: "20%", zIndex: 0 }} variant="extended">
                    view
                </Fab> : <></>
            }

            {
                objectList.length > pageSize ? <MyPagingtion count={totalPages} page={currentPage} onChange={handlePageClick} /> : ""
            }
        </>
    )
}
export default Index;

