import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

export type SquareProps = {
	children?: ReactNode;
	rowIndex: number;
}

const Square: React.FC<SquareProps> = ({ children: Figure, rowIndex }) => {
	return (
		<Box height={65} width={65} sx={{
			bgcolor: 'primary.main',
			[`&:nth-child(${rowIndex % 2 ? 'odd' : 'even'})`]: {
				bgcolor: 'primary.dark',
			},
		}}>
			{Figure}
		</Box>
	);
};

export default Square;
