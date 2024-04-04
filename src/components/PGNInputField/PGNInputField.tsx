import { TextField } from '@mui/material';
import React from 'react';

export type PGNInputFieldProps = {

}

const PGNInputField: React.FC<PGNInputFieldProps> = ({ }) => {
	return (
		<TextField
			label="Enter a PGN"
			variant="standard"
			color="warning"
			focused
		/>
	);
};

export default PGNInputField;
