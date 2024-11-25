import { ITypographyProps } from "../typography";

interface InterpolationObject {
	[key:string]: unknown
}

export interface ITextLabel {
    ns:string,
    value:string,
	interpolation?:InterpolationObject
}

export interface ITextProps {
    label?: string | ITextLabel,
    typographyOptions?:ITypographyProps,
    disableTypography?: boolean,
}
