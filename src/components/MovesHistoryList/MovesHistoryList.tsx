import { Box, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMap, selectMoves, selectSelectedIndex } from '../../redux/slices/positionsMapSlice';
import { Move } from '../../ts/MoveType';

const MovesHistoryList: React.FC = () => {

	const moves = useSelector(selectMoves);
	const selectedIndex = useSelector(selectSelectedIndex);

	const dispatch = useDispatch();

	const onClickHandler = (index: number) => {
		// dispatch(selectMap({ index }));
		console.log(index)
	}

	console.log(selectedIndex)
	const checkIsSelected = (index: number) => index === selectedIndex;

	return (
		<Box>
			<Typography variant='h6'>History</Typography>
			<List sx={{ 'height': '300px', overflow: 'scroll' }}>
				{
					moves.map((move: Move, moveIndex: number) => {

						const [moveWhite, moveBlack] = move;

						const [figureWhite, positionWhite, hitWhite] = moveWhite;
						const [figureBlack, positionBlack, hitBlack] = moveBlack;

						return (<ListItem key={moveIndex}>
							<ListItemText>
								<Stack direction="row">
									<ListItemText>{moveIndex + 1}</ListItemText>
									<ListItemButton color={`${checkIsSelected(moveIndex + 1) && 'yellow'}`} onClick={() => onClickHandler(moveIndex)}>
										{[figureWhite, hitWhite, positionWhite]}
									</ListItemButton>
									<ListItemButton color={`${checkIsSelected(moveIndex + 1) && 'yellow'}`} onClick={() => onClickHandler(moveIndex + 1)}>
										{[figureBlack, hitBlack, positionBlack]}
									</ListItemButton>
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
