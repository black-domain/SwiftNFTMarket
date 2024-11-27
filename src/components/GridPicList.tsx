import { Box, Button, ImageList, ImageListItem, ImageListItemBar, Stack, SxProps, Typography } from "@mui/material"
import { HomePageNFT } from "../model/itype";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";


interface PicProps {
    data: HomePageNFT[] | any;
    showMode?: "show" | "buy" | "onlyPicture"
    rowGap?: number
    children?: ReactNode
}
export const GridPicList = (props: PicProps) => {
    const { data, showMode, rowGap, children } = props;
    const navigate = useNavigate()
    function getSubTitleStyle() {
        switch (showMode) {
            case "buy":
                return {
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "rgb(255, 255, 255) !important"
                } as SxProps
            default:
                return {
                    fontSize: "0.75rem",
                    color: "rgba(255, 255, 255, 0.7) !important"
                } as SxProps
        }
    }
    return (
        <ImageList cols={4} gap={20} sx={{ rowGap: `${rowGap ? rowGap : 8} !important` }} variant="quilted">
            {children}

            {data && data.length > 0 ? data.slice(0, 10).map((item: HomePageNFT, index: number) => {
                return (
                    <ImageListItem key={index}
                        onClick={() => {
                            if (showMode === "onlyPicture") {
                                navigate('/listnft', { state: { id: item.data.objectId, name: item.data.display?.data.description, img: item.data.display?.data.image_url } })
                            }
                        }}
                        className="imageitem"
                        sx={{
                            display: "grid",
                            'img': {
                                borderRadius: showMode === "buy" ? "1rem 1rem 0 0" : "1rem"
                            }
                        }}>
                        <img
                            src={item.data?.display.data.image_url}
                            alt=""
                            loading="lazy"
                        />
                        <ImageListItemBar
                            sx={{
                                backgroundColor: showMode === "buy" ? "rgb(23, 24, 26)" : undefined,
                                borderRadius: "0 0 1rem 1rem",
                                padding: "0.5rem 1rem",
                                // display:"none",
                                '.MuiImageListItemBar-actionIcon': {
                                    display: "flex",
                                    alignItems: "center",
                                    mr: 1.5,
                                },
                            }}
                            className="animated"
                            actionIcon={showMode === "buy" ? undefined : <img src="/assets/3.png" width={32} />}
                            actionPosition="left"
                            title={"Frank Boehm"}
                            subtitle={<Stack
                                direction={"row"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                                sx={getSubTitleStyle()}>
                                {/* Create By: Obxsbb…nansajsao */}
                                0.003 SUI
                                {showMode === "buy" ? <Button
                                    sx={{
                                        color: "rgb(255, 163, 97)",
                                        border: "1px solid rgb(255, 163, 97)",
                                        borderRadius: "0.5rem",
                                        padding: "0.5rem 0.75rem"
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                    }}>
                                    Buy Now
                                </Button> : null}
                            </Stack>}
                            position={showMode === "onlyPicture" ? "bottom" : "below"} />

                    </ImageListItem>
                )
            }) : null}
        </ImageList >
    )
}

