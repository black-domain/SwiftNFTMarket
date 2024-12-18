import styled from "styled-components";

const ButtonWrapper = styled.button`
  padding: 0.1em 0.25em;
  width: 13em;
  height: 4.2em;
  background-color: #212121;
  border: 0.08em solid #fff;
  border-radius: 0.3em;
  font-size: 12px;
  /* font-family: "SimHei", "Hei", sans-serif; */
  font-family: 'Press Start 2P', cursive;

  font-weight: bold;

  & span {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0.4em;
    width: 10.35em;
    height: 2.9em;
    background-color: #212121;
    border-radius: 0.2em;
    font-size: 1.2em;
    color: #fff;
    border: 0.08em solid #fff;
    box-shadow: 0 0.4em 0.1em 0.019em #fff;
  }

  & span:hover {
    transition: all 0.5s;
    transform: translate(0, 0.4em);
    box-shadow: 0 0 0 0 #fff;
  }
  .selected{
    transform: translate(0, 0.4em);
    box-shadow: 0 0 0 0 #fff;
  }
  > span:not(hover) {
    transition: all 1s;
  }
`;

export const ButtonAnimation = ({selected,text}:any) => {
    
  return (
    <>
      <ButtonWrapper>
        <span className={selected}>{text}</span>
      </ButtonWrapper>
    </>
  );
};
