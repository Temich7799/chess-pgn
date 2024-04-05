import React from 'react';
import { Square } from '../Square';
import { Box, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectSelectedMap } from '../../redux/slices/positionsMapSlice';
import { FieldSquare } from '../../ts/FieldSquareType';

export type FieldProps = {

}

const Field: React.FC<FieldProps> = ({ }) => {

	const rows = useSelector(selectSelectedMap);

	return (
		<Box sx={{ width: 'fit-content', margin: '0 auto' }}>
			{
				rows.map((row: Array<FieldSquare>, rowIndex: number) =>
					<Stack direction="row" key={rowIndex}>
						{
							row.map((data: FieldSquare, colIndex: number) => <Square data={data} rowIndex={rowIndex} key={colIndex} />)
						}
					</Stack>)
			}
		</Box>
	);
};

export default Field;
