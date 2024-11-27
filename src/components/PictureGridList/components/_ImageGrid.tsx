import { ImageList, SxProps } from "@mui/material";
import { ElementType, ReactNode } from "react";

interface GridProps {
	children?: ReactNode;
	rowGap?: number;
	columnGap?: number;
	cols?: number;
	variant?: "masonry" | "quilted" | "standard" | "woven";
	sx?: SxProps;
}

export const ImageGrid = (props: GridProps) => {
	const { children, rowGap, columnGap, cols, variant, sx } = props;
	return (
		<ImageList
			cols={cols || 4}
			// gap={columnGap || 20}
			sx={{gap:`${columnGap || "1.25rem"}  !important`, rowGap: `${rowGap || 8} !important`, ...sx }}
			variant={variant || "quilted"}>
			<>{children}</>
		</ImageList>
	);
};
