import { SecondPage } from "./components/Second";
import { ThirdPage } from "./components/ThirdPage";
import themeSwitch from "../../utils/themeSwitch";
import React, { useEffect, useState } from "react";
import { ScrollTop } from "../../utils/scrollTop";
import MyCarousel from "../../components/Carousel";
import { FourthPage } from "./components/FourthPage";
import { Box } from "@mui/material";
import { getObjectList, requestMarket } from "../../utils/request";
import "./index.less";
import LaunchpadRanking from "./components/LaunchpadRanking";

const Index = () => {
	const col = themeSwitch();
	useEffect(() => {
		ScrollTop();
	}, []);
	return (
		<div id="home" style={{ width: "100%", color: col.fontColor, background: "rgb(0,0,0)" }}>
			{/**@首屏展示*/}

			<MyCarousel />

			{/** @第二屏展示 Collection前三*/}
			<Box sx={{
				// margin: "0 280px"
			}}>
				{/** @第四屏展示 Collection排名*/}
				<SecondPage />
				{/* <ThirdPage /> */}
				
				<LaunchpadRanking />
				{/** @第三屏展示 Pool列表*/}
				<FourthPage />
			</Box>
		</div>
	);
};

export default Index;
