import styled from "styled-components";

export const ShopCardWrapper = styled.div`
  display: grid;
  min-width: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr ;
  @media(max-width: 1800px){
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr ;
  }
  @media(max-width: 1500px){
    grid-template-columns: 1fr 1fr 1fr 1fr ;
  }

  width:auto;
  @media(max-width: 1280px){
    grid-template-columns: 1fr 1fr 1fr  ;
  }
  @media(max-width: 800px){
    grid-template-columns: 1fr 1fr   ;
  }
  @media(max-width: 500px){
    grid-template-columns: 1fr 1fr;

  }
`