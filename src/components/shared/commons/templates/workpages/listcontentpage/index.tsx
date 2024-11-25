import React from "react";
import Box from "../../../box";

interface IListContentPage {
    children?:React.ReactNode,
    footerComponent?:React.ReactNode,
	headerComponent?:React.ReactNode
}

const ListContentPage = (props:IListContentPage) => {
	const FooterComponent = props.footerComponent ? (
		<Box className="footer-container">
			{props.footerComponent}
		</Box>
	) : null;

	const HeaderCompoennt = props.headerComponent ? (
		<Box className="header-container">
			{props.headerComponent}
		</Box>
	) : null;

	return (
		<Box className="list-content__page" sx={{ height: "100%" }}>
			{HeaderCompoennt}
			{props.children}
			{FooterComponent}
		</Box>
	);
};

export default ListContentPage;