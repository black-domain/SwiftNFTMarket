import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useUserId } from "../stores/useUserId";
import "@suiet/wallet-kit/style.css";
import { ConnectButton, useWallet } from "@suiet/wallet-kit";
import { NavCreateSelect } from "./NavCreateSelect";
import { Search } from "@web3uikit/icons";
import styled from "styled-components";
import { WiredCard } from "wired-elements-react";
import { Button, IPosition, NotificationProvider, notifyType, useNotification } from "@web3uikit/core";
import { Dropdown, Menu } from "@arco-design/web-react";
import { NetChange } from "./NetChange";
import { ScrollTop } from "../utils/scrollTop";
import SearchMob from "./SearchMob";

const Wrapper = styled.div`
	position: fixed;
	z-index: 10;
	height: 3.75rem;
	width: 100%;
	padding: 3.125rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	top: 0;
	color: white;
	font-weight: 900;
	background: #17181a;
	/* display: grid; */
	/* border: 1px solid green; */
	/* gap: 10px;
    justify-content: space-between;
    grid-template-columns: 1fr 1fr 1fr; */
	@media (max-width: 500px) {
		width: 113%;
		background: #17181a;
		display: flex;
		margin-left: -12vw;
		justify-content: space-between;
		.search {
			display: none !important;
		}
		.logo {
			display: none !important;
		}
	}
`;

const NFT_Button = styled(ConnectButton)`
	width: 11.25rem;
`;
const NFT_Link = styled(Link)`
	transition: all 300ms;
	margin: 0.75rem;
	font-size: 1rem;
	&:hover {
		transition: all 300ms;
		background: linear-gradient(
			96deg,
			rgba(243, 110, 236, 1) 0%,
			rgba(207, 126, 236, 1) 53%,
			rgba(211, 210, 224, 1) 100%
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: hue 3s linear infinite;
	}
	@keyframes hue {
		0% {
			filter: hue-rotate(0deg);
		}
		100% {
			filter: hue-rotate(360deg);
		}
	}
`;

const NFT_Create = styled.span`
	margin: 0.75rem;
	font-size: 1.25rem;
	cursor: pointer;
`;
const NFT_Wallet = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Header = () => {
	const [account, setAccount] = useState<string>();
	const [visiable, setVisiable] = useState(false);
	const [visiableDe, setVisiableDe] = useState(false);
	const u: any = useUserId();
	const { t } = useTranslation();
	const navigator = useNavigate();
	const { connected, address, name, status } = useWallet();
	useEffect(
		function () {
			setAccount(address);
		},
		[connected]
	);

	// const handleOnClickI18n  = ()  => {
	//     const key = window.localStorage.getItem("i18nextLng")
	//     switch (key) {
	//         case "zh" :
	//             i18n.changeLanguage("en");
	//             break;
	//         case "en":
	//             i18n.changeLanguage("zh");
	//             break;
	//         default:
	//             i18n.changeLanguage("en");
	//     }
	// }

	const navData = {
		title: "Create",
		children: [
			// {"NFT": "/mint"},
			{ Collection: "/create-collection" },
		],
	};
	const defiData = {
		title: "Defi",
		children: [{ Pool: "/pool" }],
	};
	const userData = {
		title: (
			<img
				style={{ width: "2.5rem", margin: "0 0.75rem", cursor: "pointer" }}
				src={`https://api.multiavatar.com/${account}.svg`}
				onClick={function noRefCheck() { navigator("/me") }}
				alt=""
			/>
		),
		children: [
			// {"Mint NFT": "/mint"},
			// {"List NFT": "/listnft"},
			{ "Editor Profile": "/me" },
		],
	};


	const dropList = (
		<Menu>
			<Menu.Item key="1">testnet</Menu.Item>
			<Menu.Item key="2">devnet</Menu.Item>
		</Menu>
	);

	return (
		<>
			{/* 判断显示器像素宽度大小，小于500时呈现移动端布局方案*/}
			<Wrapper>
				{/*标签栏*/}
				{/*<MenuBar menus={MenuList()}/>*/}
				<div
					style={{
						display: "flex",
						alignItems: "center",
					}}>
					<Link className="logo" onClick={() => { navigator('/'), ScrollTop() }} to={"/"} style={{ margin: "0 2.5rem 0 0.75rem" }}>
						<div style={{ display: "flex", alignItems: "center" }}>
							<img src="/assets/nftlogo.png" style={{ height: "3.125rem", borderRadius: "50%" }} alt="" />
							<img src="/assets/4-2.png" style={{ height: "1.5rem" }} alt="" />
						</div>
					</Link>
					<NFT_Link className="my-iconfont" onClick={() => { navigator('/'), ScrollTop() }} to={"/"}>{"Home"}</NFT_Link>
					<NFT_Link className="my-iconfont" onClick={() => { navigator('/explore'), ScrollTop() }} to={"/explore"}>{t("user.explore")}</NFT_Link>
					{/* <NFT_Link to={"/create-collection"}>{t("user.create")}</NFT_Link> */}
					{/*<NFT_Create id="create"><NavCreateSelect data={navData}/> </NFT_Create>*/}
					<SearchMob />
				</div>

				<NFT_Wallet>
					{/* <NFT_A className="cursorDiv" onClick={() => { ScrollTop(), window.open("https://docs.google.com/forms/d/e/1FAIpQLSd0KAfh1z6qpI4e6C4nZjMO0zRX9roV305WaLbvdfZx-xpNlw/viewform?usp=sf_link", "_black") }} >
						<span className="circle" aria-hidden="true">
							<span className="icon arrow"></span>
						</span>
						<span className="button-text">Learn More</span>
					</NFT_A> */}

					<div className="apply-collection" onClick={() => {
						ScrollTop(),
							window.open("https://docs.google.com/forms/d/e/1FAIpQLSd0KAfh1z6qpI4e6C4nZjMO0zRX9roV305WaLbvdfZx-xpNlw/viewform?usp=sf_link", "_black")
					}}>
						<button className="learn-more">
							<span aria-hidden="true" className="circle">
								<span className="icon arrow"></span>
							</span>
							<span className="button-text">Apply Launchpad</span>
						</button>
					</div>

					{/* <NetChange /> */}

					{connected ? (
						<span>
							{userData.title}
							{/* <NavCreateSelect data={userData} /> */}
						</span>
					) : null}
					<NFT_Button children={<div id="connectWalletButton">Sui Wallet</div>} />
				</NFT_Wallet>
			</Wrapper>
		</>
	);
};

export default Header;
