import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { GridPicList } from "../../../components/GridPicList";

const Wrapper = styled.div`
  display: grid;
  gap: 10px;
  justify-content: space-between;
  grid-template-columns: 1fr 1fr 1fr;
  @media (max-width: 500px) {
    width: 500px;
    display: grid;
    gap: 20px 0;
    grid-template-columns: repeat(auto-fill, 490px);
  }
`
const Wid = styled.div`
  margin: 20px auto;
  @media (max-width: 620px) {
    width: 100%;
  }
`
export const ThirdPage = () => {
    const {t} = useTranslation()
    return (
        <Wid >
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <h1 style={{margin: "24px 24px"}}>Pool</h1>
            </div>
            <GridPicList data={[1, 2, 3]} showMode="show"/>
        </Wid>
    )
}