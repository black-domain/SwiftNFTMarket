import styled from "styled-components";

export const CollectionCardWrapper = styled.div`
    display:grid;
    grid-template-columns:1fr 1fr 1fr;
  @media (max-width: 1200px) {
    grid-template-columns:1fr 1fr;

  }
  @media (max-width: 700px) {
    grid-template-columns:1fr ;
    gap: 0.625rem;

  }
    @media (max-width: 500px) {
        display: grid;
        gap: 1.25rem 0;
        /* border: 1px solid red; */
        grid-template-columns: repeat(auto-fill, 30.625rem);
    }
`