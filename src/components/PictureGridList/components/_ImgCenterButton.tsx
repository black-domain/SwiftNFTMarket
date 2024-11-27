import { Box, Button, SxProps } from "@mui/material"

interface ButtonProps {
    text: string
    onClick:() => void
    classNmae?: string
    sx?: SxProps
}
export const ImgCenterButton = (props:ButtonProps) => {
    const {text, onClick,classNmae, sx} = props
    return (
        <Box  sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)"
        }}>
            <Button className={classNmae} sx={{
                bgcolor: "rgb(255, 163, 97)",
                color: "rgb(0, 0, 0)",
                borderRadius: "0.5rem",
                padding: "0.5rem 1rem",
                ':hover': {
                    bgcolor: "rgb(255, 180, 125)"
                },
                ...sx
            }} variant="contained" onClick={onClick}>
                {text}
            </Button>
        </Box>
    )
}
