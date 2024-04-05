import React from 'react';
import { Square } from '../Square';
import { Box, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectSelectedMap } from '../../redux/slices/positionsMapSlice';
import { FigurePosition } from '../../ts/FigurePositionType';

export type FieldProps = {

}

const Field: React.FC<FieldProps> = ({ }) => {

	const rows = useSelector(selectSelectedMap);

	return (
		<Box sx={{ width: 'fit-content', margin: '0 auto' }}>
			{
				rows.map((row: Array<FigurePosition>, rowIndex: number) =>
					<Stack direction="row" key={rowIndex}>
						{
							row.map((data: FigurePosition, colIndex: number) => <Square data={data} rowIndex={rowIndex} key={colIndex} />)
						}
					</Stack>)
			}
		</Box>
	);
};

export default Field;
