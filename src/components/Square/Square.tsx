import React from 'react';
import { Box } from '@mui/material';
import Piece from "@chessire/pieces";
import { FigurePosition } from '../../ts/FigurePositionType';

export type SquareProps = {
	rowIndex: number;
	data: FigurePosition;
}

const Square: React.FC<SquareProps> = ({ data, rowIndex }) => {

	const { figure: figureType, type: figureColor } = data;

	return (
		<Box height={65} width={65} sx={{
			bgcolor: 'primary.main',
			[`&:nth-child(${rowIndex % 2 ? 'odd' : 'even'})`]: {
				bgcolor: 'primary.dark',
			},
		}}>
			{(figureType && figureColor) && <Piece color={figureColor} width={65} piece={figureType} />}
		</Box>
	);
};

export default Square;
