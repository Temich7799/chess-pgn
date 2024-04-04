import React from 'react';
import { Square } from '../Square';
import { Box, Container, Stack } from '@mui/material';

export type FieldProps = {

}

const Field: React.FC<FieldProps> = ({ }) => {

	const rows = new Array(8).fill(null);
	const cols = rows;

	return (
		<Box sx={{ width: 'fit-content', margin: '0 auto' }}>
			{
				rows.map((col: null, rowIndex: number) =>
					<Stack direction="row" key={rowIndex}>
						{
							cols.map((row: null, colIndex: number) => <Square rowIndex={rowIndex} key={colIndex} />)
						}
					</Stack>)
			}
		</Box>
	);
};

export default Field;
