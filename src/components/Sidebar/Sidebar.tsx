import React from 'react';
import { Button, ButtonGroup, Stack } from '@mui/material';
import { MovesHistoryList } from '../MovesHistoryList';
import { PGNInputField } from '../PGNInputField';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { goToEnd, goToStart, selectMoves, switchNextMap, switchPrevMap } from '../../redux/slices/positionsMapSlice';
import { useDispatch, useSelector } from 'react-redux';

const Sidebar: React.FC = () => {

	const moves = useSelector(selectMoves);
	const isPGNProvided = moves.length > 0;

	const dispatch = useDispatch();

	const skipPreviousOnClickHandler = () => {
		dispatch(goToStart());
	}

	const navigateBeforeOnClickHandler = () => {
		dispatch(switchPrevMap());
	}

	const navigateNextOnClickHandler = () => {
		dispatch(switchNextMap());
	}

	const skipNextOnClickHandler = () => {
		dispatch(goToEnd());
	}

	return (
		<Stack spacing={6}>
			<PGNInputField isPGNProvided={isPGNProvided} />
			{/* {isPGNProvided && <MovesHistoryList />} todo */}
			<ButtonGroup disabled={!isPGNProvided} disableElevation variant="contained" sx={{ 'align-self': 'center' }}>
				<Button onClick={skipPreviousOnClickHandler}><SkipPreviousIcon /></Button>
				<Button onClick={navigateBeforeOnClickHandler}><NavigateBeforeIcon /></Button>
				<Button onClick={navigateNextOnClickHandler}><NavigateNextIcon /></Button>
				<Button onClick={skipNextOnClickHandler}><SkipNextIcon /></Button>
			</ButtonGroup>
		</Stack>
	);
};

export default Sidebar;
