import { Container, ThemeProvider, createMuiTheme } from '@mui/material';
import React from 'react';
import { Field } from '../Field';

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
				<Field />
			</Container>
		</ThemeProvider>
	);
};

export default App;
