import { Stack, SxProps } from "@mui/material"
interface NoDataProps {
    sx?: SxProps
    className?: string
    imgWidth?: number | string
    imgHeight?: number | string
}
export const NoData = (props: NoDataProps) => {
    const { sx, className, imgWidth, imgHeight } = props
    return (
        <Stack className={className} sx={{ padding: "1.25rem 0", width: "100%", ...sx }} alignItems={"center"}>
            <img src="/assets/nothing.png" style={{ height: imgHeight, width: imgWidth }} alt="No available data" />
        </Stack>
    )
}