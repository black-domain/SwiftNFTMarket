import { Carousel } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";
import { FirstPage } from "../pages/Home/components/FirstPage";
import { GET_ROTATION_CHART } from "../utils/graphql";
import { useEffect, useState } from "react";
import { client } from "../utils/api";
import '../styles/Carousel.less'
interface getRotationChart {
	__typename: string;
	website: string;
	name: string;
	description: string;
	start_time: number;
	image_url: string;
}

function MyCarousel() {
	const [imageSrc1, setImageSrc1] = useState<getRotationChart[]>([]);
	useEffect(() => {
		getData();
	}, []);

	// 请求轮播数据
	const getData = async () => {
		const res = await client.query({
		  query: GET_ROTATION_CHART,
		});
		if (res.data) {
		  const rotationChart = res.data.getRotationChart;
		  let arr = [...rotationChart];
	  
		  while (arr.length < 3) {
			arr.push(...rotationChart.slice(0, 3 - arr.length));
		  }
	  
		  setImageSrc1(arr);
		}
	  };

	return (
		<div className="myCarousel">
			<Carousel
				autoPlay
				animation="card"
				showArrow="always"
				indicatorPosition="outer"
				style={{ width: "100%", height: '25.5rem' }}>
				{imageSrc1.map((item, index) => (
					<div key={index} style={{ width: "81.25rem" }}>
						<FirstPage deadline={item.start_time} picture={item.image_url} data={item} style={{ width: "100%" }} />
					</div>
				))}
			</Carousel>
		</div>
	);
}

export default MyCarousel;
