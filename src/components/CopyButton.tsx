import { CSSProperties, useEffect, useState } from "react";
import copy from "copy-to-clipboard";
import { Box } from "@mui/material";
import { Tooltip } from "@mui/material";
interface CopyProps {
    text: string;
    width?: number | string;
    height?: number | string;
    style?: CSSProperties
}

export const CopyButton = (props: CopyProps) => {
    const { text, width, height, style } = props
    const [isCopy, setCopy] = useState(false)
    useEffect(() => {
        if (isCopy) {
            setTimeout(() => {
                setCopy(false)
            }, 3000)
        }
    }, [isCopy])
    return (
        <i>
            <Tooltip title={"Copy"}>
                {!isCopy ?
                    <img src="/assets/copy.svg"
                        style={style}
                        width={width ? width : 16}
                        height={height ? height : 16}
                        alt="copy"
                        onClick={() => {
                            setCopy(true)
                            copy(text)
                        }}
                    /> :
                    <img style={style} src="/assets/duigou.svg" width={width ? width : 20} height={height ? height : 20} alt="" />
                }
            </Tooltip>
        </i>

    )
}