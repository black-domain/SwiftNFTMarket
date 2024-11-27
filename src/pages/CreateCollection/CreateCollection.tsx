import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import { NFTStorage, Blob } from 'nft.storage'
import { JsonRpcProvider, MoveCallTransaction, SuiJsonValue, TransactionBlock } from '@mysten/sui.js';
import { useWallet } from "@suiet/wallet-kit";
import { useNavigate } from "react-router-dom";
import { WiredButton, WiredCard, WiredInput } from "wired-elements-react";
import { IPosition, notifyType, useNotification } from "@web3uikit/core";
import { ScrollTop } from "../../utils/scrollTop";
import { adminPermission, collectionListOnChain, marketID, packageObjectId, storage } from "../../utils/request";
import { CreateInput } from "../../components/CreateInput";
import { LoadingDialog } from "../../components/LoadingDialog";
import { useHandleNotify } from "../../hooks/useNotify";
import { AcronymWord } from "../../utils/AcronymWord";
import { CollectionCard } from "../../components/CollectionCard";
import { RegexCheck } from "../../utils/regexCheck";
import { handleInputLength } from "../../utils/handleInputLength";
import { Checkbox } from "antd";


const Title = styled.div`
  //background: rgba(0,0,0,0.2);
  height: 21.875rem;
  margin-top: -3.4375rem;
  display: flex;
  justify-content: center;
  align-items: end;
  h1 {
    color:white;
    font-weight:900;
    font-size:3.125rem;
    margin-bottom: 7.5rem
  }
`
const Main = styled.div`
  max-width: 80rem;
  margin:-6.25rem auto 3.75rem auto;
  color:white;
  display: flex;
  font-family: "SimHei", "Hei", sans-serif;
    font-weight: bold;
  > aside {
    width: 30%;
  }
  > main {
    margin: 0 13.125rem;
    
    @media (max-width: 500px) {
        margin-left: 0.625rem;
        max-width: 31.25rem;
        > main {
            margin: 0 10px !important;
        }
    }
  }
`
const TButton = styled.button`
  background: none;
  color: white;
  border: 1px solid grey ;
  padding: 0.75rem;
  border-radius: 1.5rem;
  font-size: .875rem;
  font-weight: 700;
  margin: .75rem;
  cursor: pointer;

`
const Royalties = styled.div`
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  transition: all 300ms;
  
  > input {
    color: white;
  }
  &.selected{
    background: white;
    color:black;
  }
`
const NFT_Back1 = styled.div`
    width:100vw;
    height:100%;
    // background-image: url('/assets/6.png');
    background-repeat: no-repeat ;
    background-position: center;
    background-size: cover;    position:absolute;
    z-index:-2;
`
const NFT_Back2 = styled.div`
    width:100vw;
    height:100%;
    background:linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,1));
    position:absolute;
    z-index:-1;
`
const NFT_Preview = styled.div`
    margin:-76px 0px 0 0 ;
    > h1 {
        margin:20px 0 20px 50%;
        transform:translateX(-70%);
        white-space:nowrap;
    }
    > div {
        height:18.75rem;
        width:29.375rem;
        position:relative;
        border-radius:.75rem;
        overflow:hidden;
        .div{
            height:60%;
            background:#485462;
            border-radius:.75rem .75rem 0 0;
        }
    }
    @media (max-width: 500px) {
        margin-top: .625rem;
        width: 100%;
        > h1 {
            margin:1.25rem 0 1.25rem 41%;
        }
    }
`
const NFT_PreDivFir = styled.div`
    height:100%;
    background:rgba(52, 52, 68,0.95);
    border-radius:0 0 .75rem .75rem;
    position:absolute;
    top:50%;
    z-index:0;
    width:100%;
`
const NFT_PreDivThr = styled.div`
    position:absolute;
    top:70%;
    left:50%;
    transform:translateX(-50%);
    display:flex;
    align-items:center;
    overflow: hidden;
    .first {
        width:3.75rem;
        height:3.75rem;
        border-radius:8px;
        background:#7d8ca9;
      overflow: hidden;
      display: flex;
      align-items: center;
        img {
          
            width:100%;
        }
    }
`
const NFT_Featured = styled.div`
    width:50rem;
    height:12.5rem;
    border:2px solid #555;
    border-radius:.75rem;
    display:flex;
    justify-content:center;
    align-items:center;
    overflow:hidden;
  &:hover{
    cursor: pointer;

    button{
      background: white;
      color:black;
      transition: all 500ms;
    }
  }
    > img {
        width:100%;
        border-radius:.75rem;
    }
    > div {
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
    }
    @media (max-width:500px) {
        width:100%;
    }
`
const NFT_Roya = styled.div`
    width:100%;
    background:#202123;
    height:3.125rem;
    display:flex;
    border-radius:.75rem;
    overflow:hidden;
    margin-top:.875rem;
`
const NFT_Socials = styled.div`
    margin:1.25rem 0;
    span {
        color:grey;
        font-size:12px;
        font-weight:500;
    }
`
const NFT_Logo = styled.div`
    display:flex;
    justify-content:space-between;
    .LogoDiv {
        width:18.75rem;
        height:18.75rem;
        border:2px solid #555;
        border-radius:.75rem;
        display:flex;
        justify-content:center;
        align-items:center;
        overflow:hidden;
      &:hover{
        cursor: pointer;

        button{
          background: white;
          color:black;
          transition: all 500ms;
        }
      }
        div {
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            img {
                width:100%;
                border-radius:12px;
            }
        }
    }
    @media (max-width: 500px) {
        display: flex;
        flex-direction: column;
    }
`






export const CreateCollection = () => {
    const navigate = useNavigate()
    const { connected, address, signAndExecuteTransactionBlock } = useWallet();
    const [logo, setLogo] = useState<any>()
    const [loading, setLoading] = useState<any>(false)
    const [image, setImage] = useState<any>()
    const [inputName, setInputName] = useState<string>()
    const [royalty, setRoyalty] = useState(1)
    const arr = useRef<SuiJsonValue[]>([])
    const [customType, setCustomType] = useState<string>('')
    const { handleNewNotification } = useHandleNotify()

    const [data, setData] = useState<SuiJsonValue[] | any>({
        _admin: adminPermission,
        collection_list:collectionListOnChain,
        market: marketID,
        name: "",
        description: "",
        tags: [],
        logo_image: "",
        featured_image: "",
        website: "",
        tw: "",
        discord: "",
        royaltiy: "500",
    })


    async function uploadFile(file: any) {
        return await storage.storeBlob(new Blob([file]))
    }


    useEffect(() => {
        arr.current = [marketID, "", "", ["Art"], "", "", "", "", "", "500"];
        ScrollTop()

        if (!connected) {
            (document.querySelector('#connectWalletButton') as any)?.click()
        }
    }, [])

    useEffect(() => {
        (async function () {
            console.log(image, 'imageimage');

            const img = await uploadFile(image && image[0])
            const lg = await uploadFile(logo && logo[0])
            if (lg !== "bafkreihlaroxruttcbzurmbqbqa5fg3vkllcfk54n6xydm7mku2zvkmvbq") {
                arr.current[4] = 'ipfs://' + lg
            }
            if (img !== "bafkreihlaroxruttcbzurmbqbqa5fg3vkllcfk54n6xydm7mku2zvkmvbq") {
                arr.current[5] = 'ipfs://' + img

            }
        })()
    }, [logo, image])



    const localUrl = logo && logo[0] && URL?.createObjectURL(logo && logo[0])
    const localImageUrl = image && image[0] && URL?.createObjectURL(image && image[0])

    const handleExecute = async () => {
        
        const tx = new TransactionBlock() as any;
        const mydata = data
        mydata.logo_image = arr.current[4]
        mydata.featured_image = arr.current[5]
        
        console.log(tx);

        tx.moveCall({
            target: `${packageObjectId}::market::create_collection`,
            typeArguments: [customType],
            arguments: Object.values(mydata).map((item: any) => tx.pure(item))
        })

        signAndExecuteTransactionBlock({ transactionBlock: tx }).then((res) => {
            setLoading(false)
            console.log(res, 'success transaction');
            handleNewNotification('success', 'Success Create Collection,Please Wait 10-30 Second', 'Success')

        }).catch((err) => {
            setLoading(false)
            console.log(err, 'fail transaction');
            handleNewNotification('error', `${err}`, "Error");
        })

    }


    async function createCollection() {
        if (connected) {
            if (data.tw && RegexCheck(data.tw, "tw")) { return handleNewNotification('error', 'The input format is not normal', 'twitter') }
            if (data.discord && RegexCheck(data.discord, "discord")) { return handleNewNotification('error', 'The Discord format is not normal', 'Discord') }
            if (data.website && RegexCheck(data.website, "website")) { return handleNewNotification('error', 'The input format is not normal', 'WebSite') }
            if (data.royaltiy.toString().indexOf('-') > -1) { return handleNewNotification('error', 'Royaltiy Error', 'Royaltiy') }
            if (data.name === "") { return handleNewNotification('error', 'Name Empty', 'Name') }
            // if (data.description===""){return handleNewNotification('error','Description Empty','Description')}
            if (!customType) { return handleNewNotification('error', 'Type Empty', 'Type') }
            if (handleInputLength(data.name)) { return handleNewNotification('error', 'The maximum number of characters cannot exceed 30', 'Input Error') }

            if (logo && logo[0] && image[0]) {

                setLoading(true)
                const timer = setInterval(async () => {

                    if (arr.current[4] && arr.current[5]) {
                        console.log(arr.current[4] && arr.current[5]);
                        setData({ ...data, featured_image: arr.current[5], logo_image: arr.current[4] })
                        // if (param1.current?.arguments[4] && param1.current?.arguments[5]) {
                        clearInterval(timer)
                        await handleExecute()
                        // }
                    }
                }, 1000)

            } else {
                handleNewNotification('error', 'please insert logo & image', "Error")
            }
        } else {
            handleNewNotification('error', "Please conection Wallet", "Error")
        }
    }

    const handleTypeInput = (data: string) => {
        let a = data.trim().replace(/\"/g, '').trim()
        if (a === "devnet_nft::DevNetNFT") {
            return "0x2::devnet_nft::DevNetNFT"
        }
        return a
    }

    const plainOptions = [
        'Art',
        'Gaming',
        'Sports',
        'Music',
        'Domains',
        'Fashion',
        'Memes',
        'Metaverse',
        'Utility',
        'Licensing',
        'Others'
      ];
      const onChangeTags = (checkedValues: any[]) => {
        console.log('checked = ', checkedValues);
        setData({...data,tags:checkedValues})
      };
      
    return (
        <>
            <NFT_Back1 />
            <NFT_Back2 />

            <div>
                <Title>
                    <h1>Create Collection</h1>
                </Title>
                <Main>


                    <main>
                        {/*@ts-ignore*/}
                        <WiredCard style={{ padding: "1.5rem", height: "100%" }} elevation={5}>
                            {/*@ts-ignore*/}

                            <div style={{ padding: "1.5rem", height: "100%" }}>

                                <h1 style={{ margin: "1.25rem 0" }}>Logo image</h1>

                                <NFT_Logo>

                                    <div className="LogoDiv" onClick={() => localUrl ? null : (document.querySelector('#uploadLogo') as HTMLInputElement)?.click()}>
                                        <div>
                                            {localUrl ? <img onClick={() => (document.querySelector('#uploadLogo') as HTMLInputElement)?.click()} src={localUrl} alt="" /> : <>
                                                <TButton >Upload File</TButton>
                                                <div>PNG, JPG, GIF, WEBP </div>
                                                <div>or MP4. Max 5mb.</div>
                                            </>}

                                        </div>
                                    </div>


                                    {/**@preview*/}
                                    <NFT_Preview>

                                        <h1>Preview Collection</h1>
                                        <div>
                                            <div className="div">
                                                {localImageUrl ? <img style={{ width: "100%", borderRadius: "12px" }} src={localImageUrl} alt="" /> : ""}
                                            </div>
                                            <NFT_PreDivFir />
                                            {/*<div style={{height:"90px",width:"90px",position:"absolute",top:"50%",left:"50%",background:"#7d8ca9",transform:"translate(-50%,-50%)",borderRadius:"15px",border:"3px solid #343444"}}>{localUrl?<img style={{width:"100%",height:"100%",borderRadius:"12px"}} src={localUrl} alt=""/>:""}</div>*/}
                                            <NFT_PreDivThr>
                                                <div className="first">{localUrl ? <img style={{ width: "100%" }} src={localUrl} alt="" /> : ""}</div>
                                                <div style={{ margin: "0 0.625rem", whiteSpace: "nowrap" }}>
                                                    <div style={{ fontSize: 18, fontWeight: 700 }}>{inputName ? inputName : 'Unnamed Collection'}</div>
                                                    <div style={{ fontWeight: 400, fontSize: 14 }}> <span style={{ color: "grey" }}>Created by</span> {AcronymWord(address, 7)}</div>
                                                </div>
                                            </NFT_PreDivThr>
                                        </div>
                                    </NFT_Preview>


                                </NFT_Logo>

                                <input onChange={e => setLogo(e.target.files)} id="uploadLogo" type="file" style={{ display: "none" }} />

                                <input onChange={e => setImage(e.target.files)} id="uploadImage" type="file" placeholder="file" style={{ display: "none" }} />

                                <h1 style={{ margin: "1.25rem 0" }}>Featured image</h1>
                                <NFT_Featured
                                    onClick={() => localImageUrl ? null : (document.querySelector('#uploadImage') as HTMLInputElement)?.click()}>
                                    {/* ts-ignore */}
                                    {localImageUrl ? <img onClick={() => (document.querySelector('#uploadImage') as HTMLInputElement)?.click()} src={localImageUrl} alt="" /> : <>
                                        <div>

                                            <TButton >Upload File</TButton>
                                            <div>PNG, JPG, GIF, WEBP </div>
                                            <div>or MP4. Max 5mb.</div>
                                        </div>

                                    </>}

                                </NFT_Featured>
                                <div>
                                    {/*name*/}
                                    

                                    <div style={{ margin: "1.875rem 0" }}>
                                        <h2>NAME</h2>
                                        <br />
                                        <CreateInput onChange={(name: string) => {
                                            setInputName(name)
                                            setData({ ...data, name })
                                        }} placeholder={'Collecctions Name'} />

                                    </div>

                                    {/*Description*/}
                                    <div style={{ margin: "1.875rem 0" }}>
                                        <h2>Description</h2>
                                        <br />
                                        <CreateInput textarea onChange={(description: string) => setData({ ...data, description })} placeholder={'e.g. \'This is my collection\''} />

                                    </div>
                                    <Checkbox.Group options={plainOptions} defaultValue={['Apple']} onChange={onChangeTags} />


                                    {/*type*/}
                                    <div style={{ margin: "1.875rem 0" }}>
                                        <h2>Type</h2>
                                        <br />

                                        <CreateInput style={{ marginTop: "0.625rem" }} onChange={(type: string) => setCustomType(handleTypeInput(type))} placeholder={'Please select a currency type'} />
                                    </div>
                                </div>

                                {/*Royalites*/}
                                <div style={{ margin: "1.5rem 0" }}>
                                    <h2>Royalties</h2>
                                    <NFT_Roya>
                                        <Royalties onClick={() => { setRoyalty(1); setData({ ...data, royaltiy: "500" }); arr.current[10] = "500" }} className={royalty === 1 ? 'selected' : ''}>5.0%</Royalties>
                                        <Royalties onClick={() => { setRoyalty(2); setData({ ...data, royaltiy: "1000" }); arr.current[10] = "1000" }} className={royalty === 2 ? 'selected' : ''}>10.0%</Royalties>
                                        <Royalties onClick={() => { setRoyalty(3); setData({ ...data, royaltiy: "1500" }); arr.current[10] = "1500" }} className={royalty === 3 ? 'selected' : ''}>15.0%</Royalties>
                                        <Royalties className={royalty === 4 ? 'selected' : ''} ><input onChange={(e) => { console.log(e.target.value); setRoyalty(4); setData({ ...data, royaltiy: String(parseInt(e.target.value) * 100) }); arr.current[10] = String(parseInt(e.target.value) * 100) }} placeholder={"customize     %"} type="text" style={{ color: royalty === 4 ? "black" : "white", fontWeight: 700, fontSize: "14px", background: "none", width: "120%", height: "100%", border: "none", padding: " 0 46px", outline: "none" }} /><div style={{ marginRight: "18px" }}>%</div></Royalties>
                                    </NFT_Roya>
                                </div>

                                {/*Socials*/}
                                <div>
                                    <h1>Socials</h1>
                                    <div style={{ margin: "1.25rem 0" }}>

                                        {/*twitter*/}
                                        <NFT_Socials>
                                            <h3>Twitter <span>{data && " Website: " + data.tw}</span></h3>
                                            <br />
                                            <CreateInput onChange={(tw: string) => setData({ ...data, tw: tw.indexOf("https://") > -1 ? tw : "https://twitter.com/" + tw })} placeholder={'https://twitter.com/xxx'} />
                                        </NFT_Socials>

                                        {/*Discord*/}
                                        <NFT_Socials style={{ margin: "1.25rem 0" }}>
                                            <h3>Discord<span>{data && " Website: " + data.discord}</span></h3>
                                            <br />
                                            <CreateInput onChange={(discord: string) => setData({ ...data, discord: discord.indexOf("https://") > -1 ? discord : "https://" + discord })} placeholder={'https://discord.com/xxx'} />

                                        </NFT_Socials>

                                        {/*Instagram*/}
                                        <NFT_Socials style={{ margin: "1.25rem 0" }}>
                                            <h3>Website<span>{data && " Website: " + data.website}</span></h3>
                                            <br />
                                            <CreateInput onChange={(website: string) => setData({ ...data, website: website.indexOf("https://") > -1 ? website : "https://" + website })} placeholder={'https://website.com'} />

                                        </NFT_Socials>
                                    </div>
                                </div>

                                {/*Create Collection*/}
                                {/*@ts-ignore*/}
                                <WiredButton elevation={2} onClick={createCollection}>
                                    {/*@ts-ignore*/}
                                    {"Submit"}
                                </WiredButton>
                            </div>
                            {/*<wired-button onClick={()=>{}}>Submit</wired-button>*/}
                        </WiredCard>

                    </main>
                    {loading ? <LoadingDialog /> : null}

                </Main>

            </div>
        </>
    )
}

export default CreateCollection;