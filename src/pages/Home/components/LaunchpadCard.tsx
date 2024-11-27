import { useNavigate } from "react-router-dom";
import EllipsisMiddle from "../../../components/EllipsisMiddle";
import { ImageGrid } from "../../../components/PictureGridList/components/_ImageGrid"
import { ImageItem } from "../../../components/PictureGridList/components/_ImageItem";
import { ScrollTop } from "../../../utils/scrollTop";

export const LaunchpadCard = ({dataList}: any) => {
    const navigate = useNavigate();

    return <>
        <ImageGrid>
            {dataList.map((t:any,i:number)=>{
                return <ImageItem
                key={i}
                className="item_container"
                // imageWidth={"20.3125rem"}
                imageHeight={"20.3125rem"}
                actionIcon={
                    <img
                        style={{
                            width: "3rem",
                            height: "3rem",
                        }}
                        src={"https://ipfs.bluemove.net/uploads/aaa/aptos-lazy-cats.png"}
                    />
                }
                actionPosition="left"
                position="below"
                title={ "NAN "}
                subtitle={
                    <span style={{ color: "rgba(255,255,255,.7)", display: 'flex', flexDirection: "row", alignItems: 'center' }}>
                        Created by：
                        {"receiver"
                            // ? EllipsisMiddle({ suffixCount: 7, children: receiver })
                            // : EllipsisMiddle({ suffixCount: 7,children: _item?.data?.content?.fields.receiver})}
                            ? <EllipsisMiddle suffixCount={7}>{"receiver"}</EllipsisMiddle>
                            : <EllipsisMiddle suffixCount={7}>{"_item?.data?.content?.fields.receiver"}</EllipsisMiddle>
                        }
                    </span>
                }
                imagePath={"https://ipfs.bluemove.net/uploads/aaa/aptos-lazy-cats.png"}
                onClick={() => {
                    navigate("/launchpad/"+t.slingshot_id,{state:{t,sale:t.sales[i]}})
                    ScrollTop();
                }}></ImageItem>
            })}
        </ImageGrid>
    </>
}