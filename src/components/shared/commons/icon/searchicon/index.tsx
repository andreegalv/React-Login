import React, { memo } from "react";
import MaterialSearchIcon from "@mui/icons-material/Search";

const SearchIconMemoized = memo(() => {
	return <MaterialSearchIcon />;
},
() => true);

SearchIconMemoized.displayName = "SearchIconMemoized";

const SearchIcon = SearchIconMemoized;
export default SearchIcon;