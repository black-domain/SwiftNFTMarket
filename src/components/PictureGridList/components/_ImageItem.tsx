import { Box, ImageListItem, ImageListItemBar, ImageListItemBarClasses, ImageListItemBarProps, Stack, SxProps, Theme } from "@mui/material"

import { DOMAttributes, MouseEventHandler, ReactNode, useEffect, useState } from "react"
//@ts-ignore
import ColorThief from 'colorthief';

interface PicItemProps {
    onClick?: MouseEventHandler<any> | undefined
    className?: string
    sx?: SxProps<Theme>;
    classNameBar?: string
    // @audit-info 必传，用于展示图片
    imagePath: string
    imageHeight?: number | string
    imageWidth?: number | string
    children?: ReactNode
    detailsButton?: ReactNode
    // 是否展示图片介绍栏
    noItembar?: boolean
    /**
     * 一下均为图片标题何子标题等设置相关属性
     * */
    // 介绍栏图标
    actionIcon?: React.ReactNode;
    // 图标位置
    actionPosition?: 'left' | 'right';
    classes?: Partial<ImageListItemBarClasses>;
    // 介绍拦位置
    position?: 'below' | 'top' | 'bottom';
    subtitle?: React.ReactNode;
    sxBar?: SxProps<Theme>;
    title?: React.ReactNode;
}
export const ImageItem = (props: PicItemProps) => {
    const { onClick, children, sx, sxBar, className, classNameBar, imagePath, detailsButton, imageHeight, imageWidth, actionIcon, noItembar, actionPosition, classes, position, subtitle, title } = props
    const [dominantColor, setDominantColor] = useState<string | null>(null);

    useEffect(() => {
        const img = new Image();
        img.src = imagePath;
        img.crossOrigin = "Anonymous";
        

        img.onload = () => {
            const colorThief = new ColorThief();
            const color = colorThief.getColor(img);

            setDominantColor(`rgb(${255 - color[0] - 30}, ${255 - color[1] - 90}, ${color[2] + 30})`);
            // setDominantColor(`rgb(${(color[0] + color[1] + color[2]) < 250 ? "255,255,255" : "0,0,0"})`);
        };
    }, [imagePath]);
    return (
        <ImageListItem
            className={className}
            onClick={onClick}
            sx={{
                display: "grid",
                position: "relative",
                'img': {

                    objectFit: "cover",
                    objectPosition: "center center",
                    // background: dominantColor,
                },
                ...sx
            }} >
            <Stack className="img-card" sx={{
                height: imageHeight,
                width: imageWidth,
                overflow: "hidden",
                borderRadius: noItembar !== undefined && !noItembar ? "16px 16px 0 0" : "16px",
                position: "relative"
            }}>
                <img
                    style={{ width: "100%", height: "100%" }}
                    src={imagePath}
                    alt=""
                    loading="eager"
                />
                {
                    detailsButton ?
                        <Box className="center-button" sx={{
                            position: "absolute",
                            top: 0,
                            width: "100%",
                            height: "100%",
                        }}>
                            {detailsButton}
                        </Box>
                        : null
                }
                {children}
            </Stack>
            {
                !noItembar && <ImageListItemBar
                    sx={{
                        borderRadius: "0 0 16px 16px",
                        padding: "0.75rem 1rem",
                        // display:"none",
                        '& .MuiImageListItemBar-actionIcon': {
                            display: "flex",
                            alignItems: "center",
                            mr: 1.5,
                            'img': {
                                borderRadius: "50%"
                            }
                        },
                        '& .MuiImageListItemBar-titleWrap': {
                            p: 0
                        },
                        '& .MuiImageListItemBar-subtitle': {
                            color: "rgba(255,255,255, .7)"
                        },
                        ...sxBar
                    }}
                    className={classNameBar}
                    title={title}
                    subtitle={subtitle}
                    position={position}
                    actionIcon={actionIcon}
                    actionPosition={actionPosition}
                >

                </ImageListItemBar>
            }
        </ImageListItem>
    )
}

