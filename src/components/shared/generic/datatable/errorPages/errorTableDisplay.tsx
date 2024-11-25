import React, { memo, useRef } from "react";
import Box from "src/components/shared/commons/box";
import BrokenImageRoundedIcon from "@mui/icons-material/BrokenImageRounded";
import Text from "src/components/shared/commons/text";
import { red } from "@mui/material/colors";
import { useTranslate } from "src/components/shared/commons/text/translate";

const useTitles = () => {
	const [setTranslate] = useTranslate();
	const titlesRef = useRef({
		cantLoadTable: { label: setTranslate({ namespace: "errors", value: "cantLoadTable" }) },
		unknownError: { label: setTranslate({ namespace: "errors", value: "unknownError"}) }
	});

	return titlesRef.current;
};

const ErrorTableDisplayMemo = memo((props: { errorMessage?:string, height?: string | number }) => {
	const titles = useTitles();
	return (
		<Box sx={{ width: "100%", height: props.height ?? "auto", display: "flex", flexDirection: "column", placeContent: "center", placeItems: "center" }}>
			<Box sx={{ borderTop: 2, borderBottom: 2, borderColor: red[200], p: 4, display: "flex", flexDirection: "column", placeContent: "center", placeItems: "center" }}>
				<BrokenImageRoundedIcon color="error" fontSize="large" />
				<Text label={titles.cantLoadTable.label} typographyOptions={{ variant: "h5" }} />
				<Box sx={{ mt: 2 }}>
					<Text label={props.errorMessage ?? titles.unknownError.label} typographyOptions={{ variant: "h6", sx: { color: "error.light", fontWeight: 600 } }} />
				</Box>
			</Box>
		</Box>
	);
});

ErrorTableDisplayMemo.displayName = "ErrorTableDisplayMemo";
const ErrorTableDisplay = ErrorTableDisplayMemo;

export default ErrorTableDisplay;