import { PopoverDropdown, PopoverElement } from "@web3uikit/core";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const Wrapper = styled.div`
  &:hover{
    transition: all 300ms;
    height: 1.25rem;
    background: linear-gradient(96deg, rgba(243,110,236,1) 0%, rgba(207,126,236,1) 53%, rgba(211,210,224,1) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation:  hue 3s linear infinite;
  }
  @keyframes hue {
    0% {
      filter: hue-rotate(0deg);
    }
    100% {
      filter: hue-rotate(360deg);
    }
}
`
const Wid = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`
export const NavCreateSelect = (props: any) => {
  const { data } = props
  const navigator = useNavigate()

  return (
    <Wid>
      <PopoverDropdown
        parent={data.title === "Create" ? <Wrapper>{data.title}</Wrapper> : data.title}
        position="bottom"
      >
        {data.children.map((t: { string: string }, index: number) => {
          return <PopoverElement
            key={index}
            backgroundColor="transparent"
            height={50}
            iconSize={30}
            icon={<span />}
            onClick={function noRefCheck() { navigator(Object.values(t)[0]) }}
            text={Object.keys(t)[0]}
            textColor="#FFFFFF"
            textSize={20}

          />
        })}
      </PopoverDropdown>
    </Wid>
  )
}