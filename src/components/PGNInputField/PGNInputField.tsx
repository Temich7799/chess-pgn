import React from 'react';
import { TextField } from '@mui/material';
import checkPGNFormat from '../../utils/checkPGNFormat';
import { useDispatch } from 'react-redux';
import { addPGN } from '../../redux/slices/positionsMapSlice';

type PGNInputFieldProps = {
	isPGNProvided: boolean
}

const PGNInputField: React.FC<PGNInputFieldProps> = ({ isPGNProvided }) => {

	const dispatch = useDispatch();

	const onChangeHandler = (({ target }: any) => {
		const { value } = target;
		const isValidPGN = checkPGNFormat(value);
		isValidPGN ? dispatch(addPGN({ pgn: value })) : alert('Invalid PGN format');
	});

	return (
		<TextField
			label={!isPGNProvided && 'Enter a PGN'}
			variant="standard"
			color={!isPGNProvided ? 'warning' : 'success'}
			focused
			// disabled={isPGNProvided}
			onChange={onChangeHandler}
		/>
	);
};

export default PGNInputField;
