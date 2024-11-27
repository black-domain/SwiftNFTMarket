import {Button} from "./Button";
import styled from "styled-components";
import themeSwitch from "../utils/themeSwitch";
import {useNavigate} from "react-router-dom";
import {ScrollTop} from "../utils/scrollTop";
import {HandleImagePrefixe} from "../utils/handleImagePrefixe";
import {AcronymWord} from "../utils/AcronymWord";
import {NFT_Button} from "./NFT_Button";
import {useGetMoney} from "../hooks/useGetMoney";
import { useHandleBuyNft } from "../hooks/useBuyNft";

const Card = styled.div`
    max-width:92%;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    position:relative;
    height: 24.375rem;
    border-radius: 0.75rem;
    color: black;
    margin: 0.5rem;
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
            box-shadow: 0 0 0.3125rem 0.3125rem rgba(55, 87, 124,1);
        }
    }
`
const SellerInfo=styled.div`
  display: flex;
  margin: 0 0.625rem;
  align-items: center; 
  > div {
    display:flex;
    justify-content:space-between;
    width:100%;
  } 
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
    margin:0.25rem auto 0.625rem auto;
    overflow:hidden;
`
const NFT_CardDetails=styled.div`
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


interface Props{
    data:any
    owner?:boolean
}

export const ShopCard=(props:Props)=>{
    const {data:{data},owner} = props
    const col = themeSwitch()
    const navigate = useNavigate()
    const {money} = useGetMoney()


    const onClick =()=>{
        // if (data){
        //     navigate(`/item-details/${data.item_id}`,{state: {data}});
        //     ScrollTop()

        //  }
    }
    const imgUrl = data.display.data.image_url
    const seller_id = "data.seller"
    const {buyNft} = useHandleBuyNft()


    const handleLongName =(x:string)=>{
        if (x&&x.length>18){
            return x.slice(0,8)+'...'
        }
        return x
    }
    return(
        <Card style={{background:col.cardBg}}>

            <NFT_CardDetails onClick={onClick} >
                {/* <div>
                    {data.on_sale&&
                    <NFT_BuyBtn onClick={(e)=> {
                        e.stopPropagation();
                        buyNft(data, money)
                    }}> BUY </NFT_BuyBtn>}
                </div> */}
            </NFT_CardDetails>

            {/**@商品图片*/}
            <NFT_Iamge style={{backgroundImage:`url(${1===1?imgUrl:"/assets/a2.jpg"}`}}>
                {/*<img style={{padding:"0 6px",borderRadius:"12px",width:"100%",cursor:"pointer"}} src={data?data:"/assets/a2.jpg"} alt=""/>*/}
            </NFT_Iamge>
            {/**@文字信息*/}
            <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:":hover[:blue]"}}><span style={{fontWeight:700,marginLeft:"0.75rem",maxWidth:"80%"}}>{}22&nbsp;</span></div>
                <SellerInfo>
                    <span>
                        {/*<img src={`https://api.multiavatar.com/${data&&data.seller}.svg`}  style={{width:"35px",margin:"12px 12px 0 0"}} />*/}
                    </span>

                    <div style={{display:"flex",alignItems:"center",marginTop:10}}>
                        <div style={{position:"relative"}}>
                            {/* <div><i>{AcronymWord(data.item_id,5)}</i></div> */}
                        </div>

                        <div style={{position:"relative"}}>
                            &nbsp;

                            {/* {data.on_sale?owner?null:<span style={{fontWeight:"600"}}>{data.price/1000000000} SUI</span>:null} */}
                        </div>

                    </div>
                </SellerInfo>
            </div>

        </Card>
    )
}