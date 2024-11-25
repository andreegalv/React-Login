import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import React, { memo } from "react";
import { IBaseIconProps } from "../index.t";

const FilterIconMemo = memo((props:IBaseIconProps) => {
	return <FilterAltRoundedIcon {...props} />;
},
() => true);

FilterIconMemo.displayName = "FilterIconMemo";

const FilterIcon = FilterIconMemo;
export default FilterIcon;