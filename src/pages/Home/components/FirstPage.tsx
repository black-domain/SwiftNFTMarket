import styled from "styled-components";
import CountdownClock from "./CountdownClock";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@arco-design/web-react";

const Wrapper = styled.div`
	/* border: 1px solid red; */
	display: flex;
	height: 30rem;
	justify-content: space-between;
	align-items: center;
	flex-direction: row-reverse;
	> img {
		margin: 5%;
		border-radius: 1.25rem;
		animation: heart 3s ease-in-out infinite alternate;
		// box-shadow: 0 0 20px 10px rgba(255, 255, 255, 0.3),0 0 20px 10px rgba(255, 255, 255, 0.5), 0 0 20px 20px rgba(66, 133, 244, 0.3),0 0 20px 10px rgba(66, 133, 244, 0.5)
	}
	@media (max-width: 500px) {
		display: flex;
		/* width: 100%; */
		/* border: 1px solid rgba(255, 255, 255, 0.2); */
		> img {
			height: 30vh !important;
			width: 21.875rem;
			/* margin: -20% -70% 10% 15%; */
			margin: -20vw -70vw 10vw 15vw;
			border-radius: 1.25rem;
			animation: heart 3s ease-in-out infinite alternate;
			box-shadow: 0 0 20px 10px rgba(255, 255, 255, 0.3), 0 0 20px 10px rgba(255, 255, 255, 0.5),
				0 0 20px 20px rgba(66, 133, 244, 0.3), 0 0 20px 10px rgba(66, 133, 244, 0.5);
		}
	}
	@keyframes heart {
		from {
			transform: translate(0, 0);
		}
		to {
			transform: translate(0, 10px);
		}
	}
`;
const Word = styled.div`
	margin: 5% 5% 5% 0%;
	max-width: 50vw;
	/* color: col.fontColor; */
	font-size: 2em;
	> h1 {
		border: 1px solid red;
		font-size: 4.375rem;
	}
	> h3 {
		font-size: 1.25rem;
	}

	> h3::before {
		content: "\e91d";
	}
	@media (max-width: 500px) {
		/* margin: 50% 35% 0% 0%; */
		margin: 60vw 35vw 0 0;
		/* max-width: 50vw; */
		/* color: col.fontColor; */
		font-size: 2em;
		> h1 {
			border: 1px solid red;
			font-size: 4.375rem;
		}
		> h3 {
			font-size: 1.25rem;
		}

		> h3::before {
			content: "\e91d";
		}
		.collection {
			display: none !important;
		}
	}
`;

const H1_1 = styled.div`
	font-size: 4rem;
	font-weight: 900;
	@media (max-width: 1900px) {
		font-size: 3rem;
	}
	@media (max-width: 1300px) {
		font-size: 2rem;
	}
`;
const H1 = styled.div`
	font-size: 1.5rem;
	font-weight: 700;

	@media (max-width: 1900px) {
		font-size: 2rem;
	}
	@media (max-width: 1300px) {
		font-size: 1.3rem;
	}
`;

const BG = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	z-index: -1;
	-webkit-filter: blur(5px);
	background-size: cover;
	@media (max-width: 620px) {
		width: 37.5rem;
		display: grid;
		grid-template-columns: repeat(auto-fill, 590px);
	}
`;
export const FirstPage = (props: any) => {
	const { picture, deadline,data } = props;
	const [Expiry, setExpiry] = useState(false)
	const navigate = useNavigate()
	return (
		<div className="first_container">
			<BG
				style={{
					backgroundImage: `url(${picture})`,
					objectFit: "cover",
				}}
			/>
			<div className="wapper" onClick={() => {
				// navigate('/launchpad/'+"", { state: deadline })
				window.location.href=data.website

			}}>
				<img style={{ height: "19.375rem", width: "16.25rem", objectFit: "cover" }} src={`${picture}`} alt="" />
				<div className="word">
					{/* <h1>Collection</h1> */}
					<span style={{
						fontSize: '3.5rem'
					}}>
						{data.name}
					</span>
					{
						Expiry ? <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}> <Button shape='round' type='primary' style={{ width: "20rem", height: "3rem", background: "#201c1b" }}>
							MINT
						</Button></div> : <CountdownClock setExpiry={setExpiry} deadline={deadline} />
					}

				</div>
			</div>
			{/* <Wrapper>
				<BG
					style={{
						backgroundImage: `url(${picture})`,
						objectFit: "cover",
					}}
				/>
				<Word className="content">
					<H1_1 className="collection">Collection</H1_1>
					<H1>
						To Every Collection Adding Unique <strong style={{ fontWeight: 999 }}>Value</strong>
					</H1>
					<CountdownClock />
				</Word>
				<img style={{ height: "200px", width: "20%", objectFit: "cover" }} src={`${picture}`} alt="" />
			</Wrapper> */}
		</div>
	);
};
