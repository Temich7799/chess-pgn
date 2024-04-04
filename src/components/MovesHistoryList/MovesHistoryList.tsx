import { Box, DialogTitle, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import React from 'react';
import { Move } from '../../ts/MoveType';

export type MovesHistoryListProps = {
	data: Array<Move>
}

const MovesHistoryList: React.FC<MovesHistoryListProps> = ({ data: moves }) => {
	return (
		<Box>
			<Typography variant='h6'>History</Typography>
			<List sx={{ 'height': '300px', overflow: 'scroll' }}>
				{
					moves.map((move: Move, index: number) => {

						const [moveWhite, moveBlack] = move;

						const [figureWhite, positionWhite, hitWhite] = moveWhite;
						const [figureBlack, positionBlack, hitBlack] = moveBlack;

						return (<ListItem key={index}>
							<ListItemText>
								<Stack direction="row">
									<ListItemText>{index + 1}</ListItemText>
									<ListItemButton>{[figureWhite, hitWhite, positionWhite]}</ListItemButton>
									<ListItemButton>{[figureBlack, hitBlack, positionBlack]}</ListItemButton>
								</Stack>
							</ListItemText>
						</ListItem>)
					}
					)
				}
			</List>
		</Box>
	);
};

export default MovesHistoryList;
