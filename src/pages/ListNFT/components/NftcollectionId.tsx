import { Input } from '@web3uikit/core'
import React from 'react'
import { usePreview } from '../../../stores/useTheme';
interface Props {
    nftid: any;
}
const NftcollectionId = (props: Props) => {


    const { nftid } = props
    const init = usePreview((s: any) => s.init)

 
    return (

        <div className="Component NftObjectId" id="Fixed">
            <h2 style={{ margin: "15px 0" }}>Collection Id </h2>
            <Input
                style={{ height: "50px", border: "1px solid #c0c0c0", color: "#fff" }}
                width='100%'
                disabled={true}
                labelBgColor={'background: "rgba(0,0,0,0.5)"'}
                label={init.type && <p style={{ color: "lightblue", background: "rgba(0,0,0,0.5)" }}>😁 {init.type}</p>}
                name="Test text Input"
                onBlur={function noRefCheck() { }}
                onChange={function noRefCheck() { }}
                value={nftid}
            />
        </div>

    )
}

export default NftcollectionId