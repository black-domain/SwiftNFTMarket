import styled from "styled-components";

export const CardLoading = styled.div`
  height: 100%;
  border-radius: 0.75rem 0.75rem 0 0;
  &::before{
    content: '';
    position: absolute;
    -webkit-filter: blur(4.0625rem);
    width: 10%;
    height: 100%;
    background: grey;
    animation: move 2s linear infinite;  }
  @keyframes move {
    from {
      left: -100%;
    }
    to {
      left: 100%;
    }
  }
`