import React from 'react';
import { Button, ButtonGroup, Stack } from '@mui/material';
import { MovesHistoryList } from '../MovesHistoryList';
import { PGNInputField } from '../PGNInputField';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

export type SidebarProps = {

}

const Sidebar: React.FC<SidebarProps> = ({ }) => {
	return (
		<Stack spacing={6}>
			<PGNInputField />
			<MovesHistoryList data={[[['K', 'a2', null], ['N', 'a4', 'x']], [['Q', 'a5', 'x'], ['B', 'b3', null]], [['K', 'a2', null], ['N', 'a4', 'x']], [['Q', 'a5', 'x'], ['B', 'b3', null]], [['K', 'a2', null], ['N', 'a4', 'x']], [['Q', 'a5', 'x'], ['B', 'b3', null]], [['K', 'a2', null], ['N', 'a4', 'x']], [['Q', 'a5', 'x'], ['B', 'b3', null]]]} />
			<ButtonGroup disableElevation variant="contained" sx={{ 'align-self': 'center' }}>
				<Button><SkipPreviousIcon /></Button>
				<Button><NavigateBeforeIcon /></Button>
				<Button><NavigateNextIcon /></Button>
				<Button><SkipNextIcon /></Button>
			</ButtonGroup>
		</Stack>
	);
};

export default Sidebar;
