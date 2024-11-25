import React from "react";
import { IIConProps } from "./index.t";
import MenuIcon from "./menuicon";
import NotificationIcon from "./notificationicon";
import HelpIcon from "./helpicon";
import SearchIcon from "./searchicon";
import ArrowBackIcon from "./arrowbackicon";
import EditIcon from "./editicon";
import VerticalEllipsisIcon from "./vertellipsisicon";
import MoveDownIcon from "./movedownicon";
import CompareArrowIcon from "./comparearrowicon";
import HomeIcon from "./homeicon";
import MosaicIcon from "./mosaicicon";
import LocalShippingIcon from "./localshippingicon";
import WarehouseIcon from "./warehouseicon";
import KeyboardArrowRight from "./keyboardarrowdown";
import KeyboardArrowDown from "./keyboardarrowright";
import EditColoredIcon from "./editicon/color";
import BoxesColoredIcon from "./boxesicon/color";
import PurchaseIcon from "./purchaseicon";
import FilterColoredIcon from "./filtericon/colored";
import AddLoupedIcon from "./addloupe";
import CancelIcon from "./cancelicon";
import CityColoredIcon from "./cityicon/colored";
import PromptIcon from "./prompticon";
import CheckCircleIcon from "./checkicon";
import CheckListIcon from "./checklisticon";
import KeyboardArrowUp from "./keyboardarrowup";
import PlaylistAddIcon from "./playlistaddicon";
import CollapseIcon from "./collapseIcon";
import ExpandIcon from "./expandIcon";
import FilterIcon from "./filtericon";
import DownloadIcon from "./downloadicon";

const Icon = (props:IIConProps) => {
	switch(props.name) {
		case "menu":
			return <MenuIcon />;
		case "notifications":
			return <NotificationIcon />;
		case "help":
			return <HelpIcon />;
		case "search":
			return <SearchIcon />;
		case "arrow-back":
			return <ArrowBackIcon />;
		case "edit":
			return <EditIcon {...props} />;
		case "edit-colored":
			return <EditColoredIcon />;
		case "vert-ellipsis":
			return <VerticalEllipsisIcon />;
		case "move-down":
			return <MoveDownIcon />;
		case "compare-arrow":
			return <CompareArrowIcon />;
		case "home":
			return <HomeIcon />;
		case "mosaic":
			return <MosaicIcon />;
		case "local-shipping":
			return <LocalShippingIcon />;
		case "warehouse":
			return <WarehouseIcon />;
		case "arrow-up":
			return <KeyboardArrowUp {...props} />;
		case "arrow-down":
			return <KeyboardArrowDown {...props} />;
		case "arrow-right":
			return <KeyboardArrowRight {...props} />;
		case "boxes-colored":
			return <BoxesColoredIcon />;
		case "purchase":
			return <PurchaseIcon />;
		case "filter":
			return <FilterIcon {...props} />;
		case "filter-colored":
			return <FilterColoredIcon />;
		case "add-louped":
			return <AddLoupedIcon {...props} />;
		case "cancel":
			return <CancelIcon {...props} />;
		case "city-colored":
			return <CityColoredIcon />;
		case "prompt":
			return <PromptIcon />;
		case "check":
			return <CheckCircleIcon {...props} />;
		case "checklist":
			return <CheckListIcon {...props} />;
		case "playlist-add":
			return <PlaylistAddIcon {...props} />;
		case "collapse-arrow":
			return <CollapseIcon />;
		case "expand-arrow":
			return <ExpandIcon />;
		case "download":
			return <DownloadIcon {...props} />;
		case "none":
			return null;
		default:
			return "NO-ICON-FOUND";
	}
};

export default Icon;