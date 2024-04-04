import { Container, Grid, ThemeProvider, createMuiTheme } from '@mui/material';
import React from 'react';
import { Field } from '../Field';
import { Sidebar } from '../Sidebar';

export type AppProps = {

}

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#fffbee',
			dark: '#f77474',
		},
	},
});

const App: React.FC<AppProps> = ({ }) => {
	return (
		<ThemeProvider theme={theme}>
			<Container>
				<Grid container spacing={2} sx={{ 'justify-content': 'center' }}>
					<Grid item xs="auto">
						<Field />
					</Grid>
					<Grid item xs={4}>
						<Sidebar />
					</Grid>
				</Grid>
			</Container>
		</ThemeProvider>
	);
};

export default App;
