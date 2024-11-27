import React, { ChangeEvent } from "react";
// import { Pagination, TablePaginationConfig } from "antd";
import Pagination from '@mui/material/Pagination';
import { TablePaginationConfig } from "antd";

interface Props {
	count: number;
	page: number;
	size?: "small" | "medium" | "large";
	onChange: (e: ChangeEvent<unknown>, pageSize: number) => void;
}
export default function MyPagingtion(props: Props) {
	const { count, page, size,onChange } = props;
	const pagingConfig: TablePaginationConfig = {
		total: count, // 总数据量
		defaultPageSize: 1,
		responsive: true, //
		current: page, // 当前的页码
		showQuickJumper: true,
		showSizeChanger: true,
	};
	return (
		<div style={{padding:'0.625rem 0'}}>
			<Pagination
				size={size}
        shape="rounded"
				count={pagingConfig.total}
				onChange={onChange}
			/>
		</div>
	);
}
