import { useWallet } from "@suiet/wallet-kit";
import { Input, Tab, TabList } from "@web3uikit/core";
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
import { NFT_Button } from "../../components/NFT_Button";
import { useHandleNotify } from "../../hooks/useNotify";
import { usePreview } from "../../stores/useTheme";
import { AcronymWord } from "../../utils/AcronymWord";
import themeSwitch from "../../utils/themeSwitch";

const NFT_CardDetails = styled.div`
  flex-direction: column;
  background:rgba(0,0,0,0.5);
  height:100%;
  width:100%;
  position:absolute;
  border-radius:0.75rem;
  align-items: center;
  display: flex;
  opacity: 0;
  justify-content: center;
  >div{
    top: 3.125rem;
    display: flex;
    flex-direction: column;
    > button{
      border: none;
      /* padding: 8px; */
      /* margin: 8px; */
    }
  }
  
`

const NFT_BuyBtn = styled(NFT_Button)`
    padding: 0.625rem 2.5rem;
    border-radius: 1.25rem;
    margin: 0.5rem ;
    cursor:pointer;
    font-weight:900;
    color:white;
    font-size:1.25rem;
`

const NFT_Iamge = styled.div`
    border-radius:0.75rem;
    display:flex;
    align-items:center;
    background-size:cover;
    width:100%;
    height:25rem;
    background-position:center;
    justify-content:center;
    margin:0 auto 0.625rem auto;
    overflow:hidden;
`

const Card = styled.div`
    max-width:92%;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    position:relative;
    height: 24.375rem;
    border-radius: 0.75rem;
    color: black;
    margin: 0.5remm;
    transition: all 300ms;
    cursor: pointer;
    &:hover{
        transform: scale(1.01) translateY(-3%);
        transition: all 300ms;
        box-shadow: 0 0 0.3125rem 0.3125rem rgba(55, 87, 124,1);
     > div{
       transition: all 300ms;
        opacity: 1
      }
    }
    > img{
        margin:0.75rem 0 0 50%;
        transform: translateX(-50%);
        width: 17.5rem;
    }
    @media (max-width: 500px) {
        display: flex;
        &:hover{
            transform: scale(0.9) translateY(-5%);
            transition: all 300ms;
            box-shadow: 0 0 5px 5px rgba(55, 87, 124,1);
        }
    }
`
const SellerInfo = styled.div`
  display: flex;
  margin: 0 0.625rem;
  align-items: center; 
  > div {
    display:flex;
    justify-content:space-between;
    width:100%;
  } 
`


interface ItemProps {
  item: any;

}

const ItemsCard = (props: ItemProps) => {

  const { item } = props

  const [Selling, setSelling] = useState('')
  const navigate = useNavigate()
  const { handleNewNotification } = useHandleNotify()
  const col = themeSwitch()
  const { connected } = useWallet();

  const t = item.data.display.data.image_url


  // const UploadedFunction = async (t: any) => {

  //   if (t && Selling != '') {
  //     console.log(t);

  //     let nft = t.details.reference.objectId
  //     let collection = t.details.owner.AddressOwner
  //     let amount = Selling

  //     //TODO 待修复

  //     if (parseInt(amount) <= 0 || collection === "") { return handleNewNotification('error', 'Please enter the correct content', 'Error') }
  //     const param = requestListParam(Object.values({ collection, nft, amount }), t.details.data.type)

  //     console.log(param, 'param');


  //     if (connected) {
  //       let res = await executeMoveCall(param)
  //       console.log(res);
  //       if (res) { handleNewNotification('success', 'Please wait 10-30 second', "Success") }

  //     } else {
  //       handleNewNotification('error', 'Please conection Wallet', 'Error')
  //     }



  //   } else { // 价格为空提示
  //     handleNewNotification('error', 'Please enter the amount you want to sell', 'Error')
  //   }

  // }

  const handleLongName = (x: string) => {
    if (x && x.length > 18) {
      return x.slice(0, 8) + '...'
    }
    return x
  }
  const handleUrl = (url: any) => {
    let u = undefined
    Object.keys(url).forEach(t => {
      if (t.indexOf("url") >= 0) {
        if (url[t]?.indexOf("http") < 0) {
          return u = "https://ipfs.io/ipfs/" + url[t].slice(7)
        }
        return u = url[t]
      }
    })
    return u
  }

  return (
    <>
      <Card style={{ background: col.cardBg }}>

        <NFT_CardDetails onClick={() => { }} >

          {/* <div className="intput-div">
            <Input
              style={{ color: '#fff', fill: '#f5f5f5' }}
              label="Selling Price"
              width="120px"
              labelBgColor="#fff"
              name="Test text Input"
              onBlur={function noRefCheck(e) {  setSelling(e.target.value) }}
              onChange={function noRefCheck() { setSelling('') }}
              validation={{
                characterMaxLength: 6
              }}
            />
          </div> */}

          <div style={{ width: "80%" }}>
            <NFT_BuyBtn onClick={(e) => {
              e.stopPropagation();
              // UploadedFunction(item)
              navigate('/listnft', { state: { id: item.data.objectId, name: item.data.display.data.description, img: item.data.display.data.image_url } })
            }}> Uploaded </NFT_BuyBtn>

          </div>



        </NFT_CardDetails>



        <NFT_Iamge style={{ backgroundImage: `url(\"${t ? t.indexOf("http") > -1 ? t : `https://ipfs.io/ipfs/${t.slice(7)}` : "/assets/a2.jpg"}` }}></NFT_Iamge>
        {/* <NFT_Iamge style={{ backgroundImage: `url(\"${handleUrl(t)??"/assets/a2.jpg"}` }}></NFT_Iamge> */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: ":hover[:red]" }}><span style={{ fontWeight: 700, marginLeft: "0.75rem", maxWidth: "80%" }}>{handleLongName(item.data.display.data.description)}&nbsp;</span></div>
          <SellerInfo>
            <span>
              {/*<img src={`https://api.multiavatar.com/${data&&data.seller}.svg`}  style={{width:"35px",margin:"12px 12px 0 0"}} />*/}
            </span>

            <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
              <div style={{ position: "relative" }}>
                <div><i>{AcronymWord(item.data.objectId, 5)}</i></div>
              </div>

              <div style={{ position: "relative" }}>
                &nbsp;
                {/* <span style={{ fontWeight: "600" }}>{t.fee / 1000000000} SUI</span> */}
              </div>

            </div>

          </SellerInfo>
        </div>
      </Card>
    </>
  )
}

export default ItemsCard

