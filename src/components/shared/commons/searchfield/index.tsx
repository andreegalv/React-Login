import { InputBase, Paper } from "@mui/material";
import React, { memo } from "react";
import { memoizedComponentChecker } from "src/utils/utils";
import IconButton from "../iconbutton";
import { ISearchFieldProps } from "./index.t";

const SearchFieldMemo = memo((props:ISearchFieldProps) => {
	return (
		<Paper
			className={`search-bar-container ${props.className ?? ""}`.trim()}
			sx={{p: "0 10px", display: "flex", alignItems: "center", width: "auto"}}
			variant="outlined"
		>
			<InputBase
				placeholder={props.placeholder}
				sx={{ flex: 1 }}
			/>
			<IconButton
				className="search-button"
				name="search"
				sx={{ padding: "10px" }}
			/>
		</Paper>
	);
},
memoizedComponentChecker());

SearchFieldMemo.displayName = "SearchFieldMemo";

const SearchField = SearchFieldMemo;
export default SearchField;