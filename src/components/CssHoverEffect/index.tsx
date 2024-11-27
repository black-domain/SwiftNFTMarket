import React from 'react'
import styled from 'styled-components'


const CssHoverEffect = styled.button`
    color: white;
    border: none;
    background: none;
    font-size: 2rem;
    font-weight: 600;

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

    &::after,&::before{
        content: "";
        display: block;
        width: 0%;
        height: 2px;
        background: linear-gradient(
			96deg,
			rgba(243, 110, 236, 1) 0%,
			rgba(207, 126, 236, 1) 53%,
			rgba(211, 210, 224, 1) 100%
		);
        transition: 0.5s;
        margin: 0.2rem 0;

     

    }
    @keyframes hue {
		0% {
			filter: hue-rotate(0deg);
		}
		100% {
			filter: hue-rotate(360deg);
		}
	}
    &:hover::after,&:hover::before{
        width: 70%;
        animation-play-state: paused;
        transition: all 300ms;
    }
    &::before{
        margin-left: auto;
    }
`

interface Props {
    text: string
    NFT_A: any
}

function index(props: Props) {
    const { text, NFT_A } = props
    return (
        <CssHoverEffect>
            {text}
        </CssHoverEffect>
    )
}

export default index