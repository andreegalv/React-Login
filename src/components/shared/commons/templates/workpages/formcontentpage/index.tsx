import React from "react";
import _ from "lodash";
import FormLoading from "../../../form/loading";
import Form from "../../../form";
import { IFormProps } from "../../../form/index.t";

interface IFormContentPageProps extends IFormProps {
	isLoading?:boolean,
}
const FormContentPage = (props:IFormContentPageProps) => {
	if (props.isLoading) {
		return <FormLoading />;
	}
	
	return <Form sx={{
		height: "100%"
	}} {..._.omit(props, ["isLoading"])} />;
};

export default FormContentPage;