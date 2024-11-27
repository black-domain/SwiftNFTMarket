import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ShopList from '../../Explore/components/ShopList';
import { ImageGrid } from '../../../components/PictureGridList';
import { ImageLoading } from '../../../components/ImageLoading';
import { ScrollTop } from '../../../utils/scrollTop';
import { useWallet } from '@suiet/wallet-kit';
import { client } from '../../../utils/api';
import { GET_SLINGSHOT_DATA } from '../../../utils/graphql';
import { LaunchpadCard } from './LaunchpadCard';
import { ButtonAnimation } from '../../../components/ButtonAnimation';
import LinKBut from '../../../components/LinKBut';


const Wid = styled.div`
	max-width: 100%;
	margin: 0 auto;
`;
const NFT_Content = styled.h3`
	display: flex;
	justify-content: space-between;
	h1 {
		margin: 1.5rem 0;
		font-size:1.5rem;
	}
	h3 {
		margin: 1.5rem 0;
		cursor: pointer;
	}
`;

function LaunchpadRanking() {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [collection, setCollection] = useState([] as any);
    const [isLoading, setLoading] = useState(false);
    const { address, connected, signAndExecuteTransactionBlock } = useWallet();
    const [launchpadData, setLaunchpadData] = useState<any[]>([])

    useEffect(() => {
        ScrollTop()
        if (!connected) { (document.querySelector('#connectWalletButton') as any)?.click() }

        address && client.query({
            query: GET_SLINGSHOT_DATA("", "")
        }).then(async (result) => {
            console.log(result, 'result');

            setLaunchpadData(result.data.getSlingshot.slingshot)

        }).catch((err) => {
            console.log(err, "error");
        })
    }, [address])
    return (
        <Wid>
            <NFT_Content>
                <h1 className='my-iconfont'>Launchpad</h1>
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    {/* <h3
                    style={{ display: "flex", alignItems: "center" }}
                        onClick={() => {
                            ScrollTop();
                            navigate("/explore");
                        }}>
                        <ButtonAnimation text={t("second.more")}/>
                    </h3>
                        {t("second.more")}
                    <img style={{ marginLeft: "0.5rem", width: "0.9375rem", height: "0.9375rem",marginTop:"0.2rem"  }} src="/assets/xiangyou.svg" width={15} height={15} />
                    </h3> */}
                    <LinKBut title={'More Explore'} onClick={() => {
                        ScrollTop();
                        navigate("/explore");
                    }} />
                </Stack>
            </NFT_Content>

            {!isLoading ?
                launchpadData.length >= 1 ?
                    <LaunchpadCard dataList={launchpadData.slice(0, 4)} />
                    :
                    <Stack alignItems={"center"} sx={{ padding: "2rem 0" }}>
                        <img src={"/assets/nothing.png"} />
                    </Stack>

                :
                <ImageGrid>
                    {[0, 1, 2, 3].map((item) => (
                        <ImageLoading key={item} />
                    ))}
                </ImageGrid>

            }
            {/* Unplayed
            {!isLoading ?
                collection.length >= 1 ?
                    <ShopList dataList={collection.slice(0, 4)} />
                    :
                    <Stack alignItems={"center"} sx={{ padding: "2rem 0" }}>
                        <img src={"/assets/nothing.png"} />
                    </Stack>

                :
                <ImageGrid>
                    {[0, 1, 2, 3].map((item) => (
                        <ImageLoading key={item} />
                    ))}
                </ImageGrid>

            } */}
            {/* Have ended
            {!isLoading ?
                collection.length >= 1 ?
                    <ShopList dataList={collection.slice(0, 4)} />
                    :
                    <Stack alignItems={"center"} sx={{ padding: "2rem 0" }}>
                        <img src={"/assets/nothing.png"} />
                    </Stack>

                :
                <ImageGrid>
                    {[0, 1, 2, 3].map((item) => (
                        <ImageLoading key={item} />
                    ))}
                </ImageGrid>

            } */}
        </Wid>
    )
}

export default LaunchpadRanking