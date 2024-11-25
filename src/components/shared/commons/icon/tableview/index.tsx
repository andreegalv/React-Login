import React, { memo } from "react";
import TableViewRoundedIcon from "@mui/icons-material/TableViewRounded";
import { IBaseIconProps } from "../index.t";

const TableViewIconMemo = memo((props:IBaseIconProps) => {
	return <TableViewRoundedIcon {...props} />;
});

TableViewIconMemo.displayName = "TableViewIconMemo";

const TableViewIcon = TableViewIconMemo;
export default TableViewIcon;