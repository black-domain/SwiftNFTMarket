import styled from "styled-components";

export const NFT_Button=styled.button`
  background-image: linear-gradient(96deg, rgba(203,110,236,1) 0%, rgba(107,126,236,1) 53%, rgba(11,210,224,1) 100%);
  transform: perspective(1px) translateZ(0);
  position: relative;
  overflow: hidden;
  transition: color 0.3s;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    opacity: 0;
    border-radius: 3.125rem;
    background: linear-gradient(96deg, rgba(243,110,236,1) 0%, rgba(207,126,236,1) 53%, rgba(211,210,224,1) 100%);
    transform: scaleX(0);
    transform-origin: 0 50%;
    transition: all 0.3s ease-out;
  }
  &:hover {

    color: white;
  }
  &:hover:before {
    opacity: 0.3;

    transform: scaleX(1);
  }
  
`
