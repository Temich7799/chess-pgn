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
		dispatch(selectMap({ index }));
	}

	const checkIsSelected = (index: number) => index === selectedIndex

	return (
		<Box>
			<Typography variant='h6'>History</Typography>
			<List sx={{ 'height': '300px', overflow: 'scroll' }}>
				{
					moves.map((move: Move, moveIndex: number) => {

						const [moveWhite, moveBlack] = move;

						const [figureWhite, positionWhite, hitWhite] = moveWhite;
						const [figureBlack, positionBlack, hitBlack] = moveBlack;

						const isWhiteStepSelected = checkIsSelected(moveIndex + 1 + moveIndex);
						const isBlackStepSelected = checkIsSelected(moveIndex + 2 + moveIndex);

						const getBackgroundSx = (color: string, show: boolean) => {
							return show ? { backgroundColor: color } : undefined;
						}

						return (<ListItem sx={getBackgroundSx('primary.main', isWhiteStepSelected || isBlackStepSelected)} key={moveIndex}>
							<ListItemText>
								<Stack direction="row">
									<ListItemText>{moveIndex + 1}</ListItemText>
									<ListItemButton sx={getBackgroundSx('primary.dark', isWhiteStepSelected)} onClick={() => onClickHandler(moveIndex + 1 + moveIndex)}>
										{[figureWhite, hitWhite && <strong style={{ color: 'red' }}>x</strong>, positionWhite]}
									</ListItemButton>
									<ListItemButton sx={getBackgroundSx('primary.dark', isBlackStepSelected)} onClick={() => onClickHandler(moveIndex + 2 + moveIndex)}>
										{[figureBlack, hitBlack && <strong style={{ color: 'red' }}>x</strong>, positionBlack]}
									</ListItemButton>
								</Stack>
							</ListItemText>
						</ListItem>)
					}
					)
				}
			</List>
		</Box >
	);
};

export default MovesHistoryList;
