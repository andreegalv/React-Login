import React, { useMemo } from "react";
import { useTranslate } from "./translate";
import Typography, { ITypographyProps } from "../typography";
import { ITextLabel, ITextProps } from "./index.t";
import { isObject, isString, isStringNotEmpty } from "src/utils/utils";

export const useText = (props:{ label?: string | ITextLabel, typographyProps?:ITypographyProps, disableTypography?:boolean }) => {
	const Label = useMemo(() => {
		if (!props.label && !isStringNotEmpty(props.label)) {
			return null;
		}

		return ( 
			<Text
				disableTypography={props.disableTypography}
				label={props.label}
				typographyOptions={props.typographyProps}
			/>
		);

	}, [props.label, props.typographyProps, props.disableTypography]);

	return Label;
};

const Text = (props:ITextProps) => {
	const [setTranslation] = useTranslate();

	const { label } = props;
	const TextComponent = useMemo(() => {
		if (isString(label)) {
			if (label.includes("t@")) {
				//t@errors.valueAlreadyExists
				const splitText = label.replace("t@", "").split(":");
				return setTranslation({ namespace: splitText[0], value: splitText[1]});
			}

			return label as string;
		}
		else if (isObject(label)) {
			const textLabel = label as ITextLabel;
			return setTranslation({value: textLabel.value, namespace: textLabel.ns, interpolation: textLabel.interpolation});
		}

		return null;
	}, [label]);

	if (props.disableTypography) {
		return TextComponent;
	}

	const { component = "span", ...otherProps } = props.typographyOptions ?? {};

	return (
		<Typography {...otherProps} component={props.typographyOptions?.noWrap ? "div" : component} sx={props.typographyOptions?.sx}>
			{ TextComponent }
		</Typography>
	);
};

export default Text;