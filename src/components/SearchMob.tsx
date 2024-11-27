import { Search } from '@web3uikit/icons';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { collectionListOnChain, getObjectList, requestMarket } from '../utils/request';
import { Box } from '@mui/material';
import { IconLoading } from '@arco-design/web-react/icon';
import EllipsisMiddle from './EllipsisMiddle';
import { client } from '../utils/api';
import { GET_COLLECTION } from '../utils/graphql';
import { CollectionQuery, CollectionSortType } from '../utils/queryApi';

const SearchDiv = styled.div`
	background: none;
	border: 1px solid #777;
	width: 21.875rem;
	height: 2.5rem;
	border-radius: 1.5rem;
	color: white;
	padding: 0 0.75rem;
	margin: 0 1.5rem;
	display: flex;
	align-items: center;
    font-family: "SimHei", "Hei", sans-serif;
    font-weight: bold;
	> input {
		background: none;
		border: none;
		margin: 0 0.5rem;
		outline: none;
		color: white;
		width: 100%;
		height: 100%;
	}
`;

function SearchMob() {
    const [inputValue, setInputValue] = useState("");
    const navigator = useNavigate();
    const [collection, setCollection] = useState([] as any);
    const [exist, setExist] = useState([]);
    const [loading, setLoading] = useState(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value.trim().replace(/\"/g, "").trim();

        setInputValue(val);
        setLoading(true);
        setTimeout(() => setLoading(false), 1500);

        // const result = collection.find(({ data: { objectId } }: any) => objectId.includes(val));
        const resultA = collection.filter((item: any) => item.collection_id.includes(val) || item.name.includes(val));

        setExist(resultA);
    };

    console.log(collection);
    

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
            is_certification: 0,
            nft_type: ""

        };
        client.query({
            query: GET_COLLECTION(defaultCollectionQuery),
        }).then(e => setCollection(e.data.getCollection.collection))

        setLoading(false)
    };
    useEffect(() => {
        getCollectionId();
    }, []);


    // const getCollectionId = async () => {
    //     const res = (await requestMarket(collectionListOnChain)) as any;


    //     if (res.data) {
    //         const cid = res.data.content?.fields.collection?.fields.contents;

    //         const data = cid?.map((item: any, index: number) => {  // 合约的collection Id  返回所有collection id的数组
    //             return item.fields.value;
    //         });

    //         const resp = await getObjectList(data); // 获取collection 详情  返回所有详情的数组
    //         setCollection(resp);
    //     }
    //     console.log(res);
    // };


    useEffect(() => {
        getCollectionId();
    }, []);

    return (
        <SearchDiv style={{ width: "33rem", borderRadius: "2rem", height: "3rem", position: "relative" }} className="search my-iconfont">
            <Search style={{ color: "grey" }} />
            <input
                style={{ fontSize: "0.5rem" }}
                value={inputValue}
                // onKeyDown={onKeyDown}
                onChange={onChange}
                placeholder={"Search Collection ID"}
                type="text"
            />
            {
                !inputValue ? ""
                    : <div
                        style={{
                            padding: "0.4rem 0rem 0 0.4rem",
                            position: "absolute",
                            width: "33rem",
                            height: "6.5rem",
                            background: "#2a4362",
                            left: "0",
                            borderRadius: "1rem",
                            bottom: "-7rem",
                        }}>
                        {
                            loading ? <div style={{ textAlign: "center", lineHeight: "5.4rem" }}>
                                <IconLoading />
                            </div> : <div style={{ height: "6rem", overflowY: "auto", }}>
                                {
                                    exist.length > 0 ? exist.map((item: any) => {
                                        return <Box sx={{
                                            margin: "0rem 0 0.6rem 0",
                                            height: "5.4rem",
                                            borderRadius: "0.6rem",
                                            textAlign: "center",
                                            background: "#3f5775",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-evenly",
                                            ':hover': {
                                                background: "#273950",
                                            }
                                        }} onClick={() => {
                                            setInputValue('')
                                            navigator(`/collection/${item.collection_id}`, { state: item })
                                        }} className='cursorDiv'>
                                            <div>Collections Name : {item.name}</div>
                                            <div> <EllipsisMiddle suffixCount={20}>{item.collection_id || ""}</EllipsisMiddle></div>

                                        </Box>
                                    })
                                        :
                                        <div style={{ fontStyle: "italic", textAlign: "center", lineHeight: "5.4rem" }}>No Results</div>
                                }
                            </div>
                        }
                    </div>
            }
        </SearchDiv>
    )
}

export default SearchMob