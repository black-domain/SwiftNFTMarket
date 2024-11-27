import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  --primary-color: #111;
  --hovered-color: linear-gradient(
			96deg,
			rgba(243, 110, 236, 1) 0%,
			rgba(207, 126, 236, 1) 53%,
			rgba(211, 210, 224, 1) 100%
		);
  position: relative;
  display: flex;
  font-weight: 600;
  font-size: 1rem;
  gap: 0.5rem;
  align-items: center;
  color:#fff;
  p{
    margin: 0;
     position: relative;
    font-size: 1.25rem;
     color:#fff;
  }

  &::after {
  position: absolute;
  content: "";
  width: 0;
  left: 0;
  bottom: -0.4375rem;
  background: linear-gradient(
			96deg,
			rgba(243, 110, 236, 1) 0%,
			rgba(207, 126, 236, 1) 53%,
			rgba(211, 210, 224, 1) 100%
		);
  height: .125rem;
  transition: 0.3s ease-out;
  animation: hue 3s linear infinite;
}

p::before {
  position: absolute;
/*   box-sizing: border-box; */
  content: "More Explore";
  width: 0%;
  inset: 0;
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
  overflow: hidden;
  transition: 0.1s ease-out;
}
&:hover::after {
  width: 100%;
}

&:hover p::before {
  width: 100%;
}
&:hover  {
}
&:hover path,svg{
    transform: translateX(4px);
    color: linear-gradient(
			96deg,
			rgba(243, 110, 236, 1) 0%,
			rgba(207, 126, 236, 1) 53%,
			rgba(211, 210, 224, 1) 100%
		);
    fill:linear-gradient(
			96deg,
			rgba(243, 110, 236, 1) 0%,
			rgba(207, 126, 236, 1) 53%,
			rgba(211, 210, 224, 1) 100%
		);
    transition: 0.3s ease-out;
}
svg {
  color:#fff;
  transition: 0.2s;
  position: relative;
  width: .9375rem;
  transition-delay: 0.2s;
  top: 0.2rem;
  overflow: inherit;
}

`

interface Props {
  title: string
  onClick: () => void;
}

function LinKBut(props: Props) {

  const { title, onClick } = props;

  return (
    <Button className='cursorDiv my-iconfont' onClick={onClick}>
      <p>{title}</p>
      <svg stroke-width="4" stroke="currentColor" viewBox="0 0 24 24" fill="none" className="h-6 w-6" xmlns="/assets/xiangyou.svg">
        <path fill-rule="evenodd" fill="#FFFFFF" d="M12.405 6.31273L4.43164 0.306305C3.97388 -0.0384674 3.35767 -0.0970154 2.84167 0.155228C2.32568 0.407471 1.99951 0.926834 2 1.49515L2 13.5061C2 14.0742 2.32642 14.5931 2.84229 14.845C3.35815 15.097 3.97412 15.0383 4.43164 14.6937L12.405 8.68727C12.78 8.40468 13 7.96565 13 7.5C13 7.03435 12.78 6.59532 12.405 6.31273L12.405 6.31273Z" stroke-linejoin="round" stroke-linecap="round"></path>
      </svg>
    </Button>
  )
}

export default LinKBut