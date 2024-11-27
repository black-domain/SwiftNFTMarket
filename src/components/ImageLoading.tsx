
import { Box, Button, Skeleton, Stack } from "@mui/material"


interface LoadingProps {
    type?: "show" | "buy"
    height?: number | string
}
export const ImageLoading = (props: LoadingProps) => {
    const { type, height } = props
    return (
        <Stack spacing={2}>
            <Skeleton
                sx={{
                    bgcolor: 'grey.900',
                    borderRadius: type !== "buy" ? "1rem" : "1rem 1rem 0 0"
                }}
                animation="wave"
                variant="rectangular"
                height={height ? height : "20.3125rem"}
            />
            {type !== "buy" ?
                <Stack direction={"row"} spacing={2} sx={{ padding: '0 0.5rem' }}>
                    <Skeleton
                        sx={{ bgcolor: 'grey.900', }}
                        variant="circular"
                        // animation="wave"
                        width={56}
                        height={48} />

                    <Stack sx={{ width: "100%" }}>
                        <Skeleton
                            sx={{ bgcolor: 'grey.900', }}
                            animation="wave"
                            variant="text"
                            width={"60%"}
                            height={24}
                        />
                        <Skeleton
                            sx={{ bgcolor: 'grey.900', }}
                            animation="wave"
                            variant="text"
                            width={"85%"}
                            height={24}
                        />
                    </Stack>
                </Stack> :
                <Stack
                    spacing={1}
                    style={{margin:0}}
                    sx={{
                        bgcolor: "rgb(23, 24, 26)",
                        height: "112px",
                        padding: "0.75rem 1rem",
                        borderRadius: "0 0 1rem 1rem",
                    }} >
                    <Skeleton
                        sx={{ bgcolor: 'grey.600', }}
                        // animation="wave"
                        variant="text"
                        height={24}
                        width={"75%"}
                    />
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <Box sx={{ fontSize: "1.5rem", color: "white" }} flex="1 1 60%" display="flex" alignItems={"center"}>
                            <Skeleton
                                sx={{ bgcolor: 'grey.700', mr: 1 }}
                                // animation="wave"
                                variant="text"
                                height={32}
                                width={"45%"}
                            /> SUI
                        </Box>
                        <Button sx={{
                            color: "rgb(255, 163, 97)",
                            border: "1px solid rgb(255, 163, 97)",
                            padding: "8px 12px",
                            borderRadius: "8px"
                        }}>
                            Buy Now
                        </Button>
                    </Stack>
                </Stack>
            }
        </Stack >
    )
}