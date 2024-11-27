import React from 'react'
import styled from 'styled-components'


const BorderFlow = styled.div`
  position: relative;
  width: 10rem;
  height: 3.5rem;
  background: rgba(0, 0, 0.8);
  border-radius: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: none;

  &:hover::after, &:hover::before {
    animation-play-state: paused;
  }

  &::before {
    content: "";
    position: absolute;
    width: 25rem;
    height: 80%;
    //background: linear-gradient(#2eb972,#d500f9);
    //animation: rotate 4s linear infinite;
    border-radius: 1.25rem;
    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }

  &::after {
    border-radius: 1.25rem;
    content: "";
    position: absolute;
    background: rgb(215, 263, 227);
    inset: 2px;
  }

  button {
    color: rgb(58, 58, 58);
    font-size: 1.8rem;
    font-weight: bold;
    z-index: 1;
    border: none;
    background: none;
    cursor: pointer;
  }

`

interface Props {
    text: string
    handleEvent:()=>void
}

function Borders(props: Props) {

    const { text,handleEvent } = props

    return (
        <BorderFlow>
            <button onClick={handleEvent}>{text}</button>
        </BorderFlow>
    )
}

export default Borders