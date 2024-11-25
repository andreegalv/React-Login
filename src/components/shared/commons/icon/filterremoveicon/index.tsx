import FilterAltOffRoundedIcon from "@mui/icons-material/FilterAltOffRounded";
import React, { memo } from "react";
import { IBaseIconProps } from "../index.t";

const FilterRemoveIconMemo = memo((props:IBaseIconProps) => {
	return <FilterAltOffRoundedIcon {...props} />;
},
() => true);

FilterRemoveIconMemo.displayName = "FilterRemoveIconMemo";

const FilterRemoveIcon = FilterRemoveIconMemo;
export default FilterRemoveIcon;