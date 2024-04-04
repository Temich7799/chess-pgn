import { Container, Grid, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import React from 'react';
import { Field } from '../Field';
import { Sidebar } from '../Sidebar';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

export type AppProps = {

}

const theme = createTheme({
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
			<Provider store={store}>
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
			</Provider>
		</ThemeProvider>
	);
};

export default App;
