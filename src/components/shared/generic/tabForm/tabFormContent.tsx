import React, { useMemo } from "react";
import { useFormContext } from "../../commons/form/context";
import GridColumn from "../../commons/grid/gridcolumn";
import Box from "../../commons/box";
import Text from "../../commons/text";
import FormColumnGroup from "../../commons/form/groups";
import { useTranslate } from "../../commons/text/translate";

const TabFormContent = () => {
	const { formikValues } = useFormContext();
	const [setTranslate] = useTranslate();

	const Items = useMemo(() => {
		const formikErrorKeys = Object.keys(formikValues?.errors);
		if (formikErrorKeys.length <= 0) {
			return null;
		}

		return formikErrorKeys.map((k, i) => (
			<GridColumn columnSizes={[{ lg: 4}, { lg: 8}]} key={`form-feedback-contnet-${k}-${i}`}>
				<Text label={setTranslate({ namespace: "fields", value: k })} />
				<Text label={formikValues.errors[k]} />
			</GridColumn>
		));
	}, [formikValues?.errors]);

	return (
		<Box className="__form-feedback">
			<FormColumnGroup isCollapsable title="Errores">
				{Items}
			</FormColumnGroup>
		</Box>
	);
};

export default TabFormContent;