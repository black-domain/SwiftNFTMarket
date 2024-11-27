import { Illustration, Card } from '@web3uikit/core'
import React, { useState } from 'react'

interface Props {
    item: any
    chae: any
}

function Pload(props: Props) {
    const { item, chae } = props

    const [Selected, setSelected] = useState(false)

    const noRefCheck = (value: boolean) => {
        setSelected(value)
    }

    const onc = (id: any) => {
        console.log(id);
    }

    return (
        <Card
            isSelected={Selected}
            description="Create your own cryptocurrency / token"
            //@ts-ignore
            onClick={() => chae(item)}
            setIsSelected={noRefCheck}
            title="ERC20-Token"
            tooltipText="Create your own ERC20 Token"
        >
            <div>
                <Illustration
                    height="180px"
                    logo="token"
                    width="100%"
                />
            </div>
        </Card>
    )
}

export default Pload