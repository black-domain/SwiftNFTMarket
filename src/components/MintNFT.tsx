import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import { Blob } from 'nft.storage'
import { CreateInput } from "./CreateInput";
import { packageObjectId, storage } from "../utils/request";
import { useWallet } from "@suiet/wallet-kit";
import { useNavigate } from "react-router-dom";
import { WiredButton, WiredCard } from "wired-elements-react";
import "wired-elements";
import { NFTListDialog } from "./NFTListDialog";
import { useAttrListStore } from "../stores/useDialog";
import { ScrollTop } from "../utils/scrollTop";
import { useNotification } from "@web3uikit/core";
import { useHandleNotify } from "../hooks/useNotify";
import { LoadingDialog } from "./LoadingDialog";
import { TransactionBlock } from "@mysten/sui.js";


const Title = styled.div`
  height: 15.625rem;
  margin-top: -55px;
  display: flex;
  justify-content: center;
  align-items: end;

  h1 {
    color: white;
    font-weight: 900;
    font-size: 3.125rem;
    margin-bottom: 1.25rem
  }
`
const Main = styled.div`

  width: 40vw;
  margin-left: 50%;
  transform: translateX(-50%);
  @media (max-width: 500px) {
    margin-left: 160px !important;
    /* width: 300px; */
    display: grid;
    gap: 1.25rem 0;
    grid-template-columns: repeat(auto-fill, 30rem);
    .NFT_Hr{
        width: 85vw !important;
    }
  }
  @media (max-width: 1280px ) and (min-width:500px){
    width: 65vw;
} 
@media (max-width: 1920px) and (min-width:1281px) {
    width: 45vw;
} 
@media (min-width: 1921px) {
    width: 35vw;
} 

  > aside {
    width: 50%;
  }

  > main {
    margin: 0 80px;

    > div {
      &:hover {
        cursor: pointer;

        button {
          background: white;
          color: black;
          transition: all 300ms;
          cursor: pointer;
        }

      }
    }
  }
`
const TButton = styled.button`
  background: none;
  color: white;
  border: 1px solid grey;
  padding: 12px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 700;
  margin: 12px;
  cursor: pointer;
`
const Background_1 = styled.div`
    width: 100%;
    height: 100%;
    background-image: url('/assets/6.png');
    background-repeat: no-repeat ;
    background-position: center;
    background-size: cover;
    position: absolute;
    z-index: -2;
`
const Background_2 = styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,1));
    position: absolute;
    z-index: -1;
`
const NFT_Logo = styled.div`
    width: 300px;
    height: 300px;
    border: 2px solid #555;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow:hidden;
    cursor:pointer;
    div:first-child {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width:100%;
        align-items: center;
    }
`
const NFT_Attribute = styled.div`
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .Come {
        color: grey;
        line-height: 10px;
        font-size: 8px;
    }
`
export const Mint = () => {
    const navigate = useNavigate()
    const [logo, setLogo] = useState<any>()
    const [inputName, setInputName] = useState<string>()
    const arr = useRef<any>()
    const { connected, signAndExecuteTransactionBlock } = useWallet()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        name: "32",
        description: "123",
        url: "23",
        collection_id: "23",
        symbol: "34",
        animation_url: "234",
        external_url: "234",
        attribute_keys: [23],
        attribute_values: [123],
    })

    const [dialogOpen, setDialogOpen] = useState(1)
    const onClickAttrDialog = () => {
        setDialogOpen((dialogOpen) => dialogOpen += 1)
    }

    async function uploadFile(file: any) {
        return await storage.storeBlob(new Blob([file]))
    }


    useEffect(() => {
        ScrollTop()
        if (!connected) {
            (document.querySelector('#connectWalletButton') as any)?.click()
        }
    }, [])

    useEffect(() => {
        (async function () {
            await uploadFile(logo && logo[0]).then(e => {
                if (e !== "bafkreihlaroxruttcbzurmbqbqa5fg3vkllcfk54n6xydm7mku2zvkmvbq") {
                    arr.current = "ipfs://" + e
                }
            })

        })()

    }, [logo])

    const param1 = useRef<any>()

    useEffect(() => {
        // param1.current = requestMint(Object.values(data))
    }, [data])

    const localUrl = logo && URL?.createObjectURL(logo && logo[0])

    const { handleNewNotification } = useHandleNotify()
    const onClick = () => {
        // if (RegexCheck(data.collection_id,'mint_collectionID')){return handleNewNotification('error','There is some thing wrong',"Collection ID")}
        if (!logo) { return handleNewNotification('error', 'Image not upload', 'Error') }
        setLoading(true)
        const timer = setInterval(async () => {
            // if (arr.current) { setData({ ...data, url: arr.current }) } else { return }

            // if (param1.current.arguments[2].length > 10) {
            clearInterval(timer)
            const tx = new TransactionBlock() as any;

            tx.moveCall({
                target: `${packageObjectId}::create_nft::mint_to_sender`,
                arguments: Object.values(data).map((item) => {
                    return tx.pure(item);
                })
            })

            console.log(tx, 'mint nft 交易参数');

            signAndExecuteTransactionBlock({ transactionBlock: tx }).then((res) => {
                setLoading(false)
                console.log(res, '交易成功了');
                handleNewNotification('success', 'success Mint NFT', 'Success')
            }).catch((err) => {
                setLoading(false)
                console.log(err, '交易失败了');
                handleNewNotification('error', 'Mint Failed With Some Error22', 'Error')
            })
            // }

        }, 500)

    }
    const list1 = useAttrListStore((s: any) => s.list1)
    const list2 = useAttrListStore((s: any) => s.list2)
    useEffect(() => {

        setData({ ...data, attribute_keys: list1, attribute_values: list2 })

    }, [list1, list2])
    return (
        <>
            <Background_1 />
            <Background_2 />

            <div>
                <Title>
                    <h1>Mint NFT</h1>
                </Title>

                <Main>

                    {/*@ts-ignore*/}
                    <div style={{ padding: "24px", width: "100%" }} elevation={5}>
                        {/*@ts-ignore*/}

                        <input onChange={e => {
                            setLogo(e.target.files);
                        }} id="uploadLogo" type="file" style={{display: "none"}}/>
                        {/*@ts-ignore*/}

                        <main style={{margin: "0 auto", width: "100%"}}>
                            <h1 style={{margin: "20px 0"}}>Logo image</h1>
                            <NFT_Logo  onClick={() => localUrl?null:(document.querySelector('#uploadLogo') as any)?.click()}>
                                <div>
                                    {localUrl ?
                                        <img onClick={() => (document.querySelector('#uploadLogo') as HTMLInputElement)?.click()} style={{ width: "100%", borderRadius: "12px" }} src={localUrl} alt="" /> : <>
                                            <TButton>Upload File</TButton>

                                            <div>PNG, JPG, GIF, WEBP</div>
                                        </>}
                                </div>
                            </NFT_Logo>

                            <div>
                                {/*name*/}

                                <div style={{ margin: "30px 0" }}>
                                    <h3>Name</h3>
                                    <br />

                                    <CreateInput onChange={(name: string) => setData({ ...data, name: name })}
                                        placeholder={'Collecctions Name'} />

                                </div>

                                {/*Description*/}
                                <div style={{ margin: "30px 0" }}>
                                    <h3>Description</h3>
                                    <br />
                                    <CreateInput
                                        onChange={(description: string) => setData({ ...data, description: description })}
                                        placeholder={'e.g. \'This is my collection\''} />

                                </div>
                            </div>


                            <div>

                                <div style={{ margin: "20px 0" }}>


                                    {/*collection_id*/}
                                    <div style={{ margin: "20px 0" }}>
                                        <h3> Collection Id</h3>
                                        <br />
                                        <CreateInput onChange={(collection_id: string) => setData({
                                            ...data,
                                            collection_id: collection_id
                                        })}
                                            placeholder={'collection id'} />

                                    </div>

                                    {/*symbol*/}
                                    {/*<div style={{margin: "20px 0"}}>*/}
                                    {/*    <h3>Symbol</h3>*/}
                                    {/*    <br/>*/}
                                    {/*    <CreateInput onChange={(symbol: string) => setData({...data, symbol: symbol})}*/}
                                    {/*                 placeholder={'symbol'}/>*/}

                                    {/*</div>*/}


                                    {/*animation_url*/}
                                    <div style={{ margin: "20px 0" }}>
                                        <h3>Animation Url</h3>
                                        <br />
                                        <CreateInput onChange={(animation_url: string) => setData({
                                            ...data,
                                            animation_url: animation_url
                                        })}
                                            placeholder={'animation url'} />

                                    </div>

                                    {/*external_url*/}
                                    <div style={{ margin: "20px 0" }}>
                                        <h3>External Url</h3>
                                        <br />
                                        <CreateInput onChange={(external_url: string) => setData({
                                            ...data,
                                            external_url: external_url
                                        })}
                                            placeholder={'external url'} />

                                    </div>

                                    {/*attribute_keys*/}
                                    <NFT_Attribute >
                                        <div>

                                            <h3>Attribute </h3>
                                            <i className="Come">Add NFT Attribute</i>
                                        </div>

                                        <div style={{ cursor: "pointer" }} onClick={onClickAttrDialog}>
                                            <img style={{ width: "40px", marginLeft: '-3.5vw' }} src="/assets/add.svg" alt="" />
                                        </div>

                                    </NFT_Attribute>


                                </div>
                            </div>
                            <NFTListDialog open={dialogOpen} />
                            <hr className="NFT_Hr" style={{ borderColor: "grey", width: '100%' }} />
                            <br />

                            {/*Create Collection*/}
                            {/*<Button onClick={()=>createCollection()} text={'Create Collection'}/>*/}
                            <WiredButton elevation={2} onClick={onClick}>
                                {/*@ts-ignore*/}
                                {"Submit"}
                            </WiredButton>
                            <br />
                            <br />
                            <br />
                        </main>
                    </div>
                    {loading && <LoadingDialog />}
                </Main>
                <br />
                <br />
                <br />
                <br />
            </div>
        </>
    )
}