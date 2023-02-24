import {
	extendTheme,
	withDefaultColorScheme,
	theme as baseTheme,
} from '@chakra-ui/react';
// import { Input } from './components/input.theme';
import { mode } from '@chakra-ui/theme-tools';
// import { Button } from './components/button.theme';
// import { Container } from './components/container.theme';
// import { Select } from './components/select.theme';
export const customTheme = extendTheme(
	{
		fonts: {
			body: 'poppins',
			heading: 'poppins',
		},
		colors: {
			primary: {
				50: '#00ADB5',
			},
			border: '#646D73',
			dark: {
				50: '#303841',
			},
			light: {
				50: '#3A4750',
			},
		},
		styles: {
			global: (props) => ({
				body: {
					bg: mode('#303841', '#303841')(props),
				},
				'*::placeholder': {
					color: mode('#3A4750', '#3A4750')(props),
				},
			}),
		},
		// components: {
		// 	Input,
		// 	Button,
		// 	Container,
		// 	Select,
		// },
	},
	withDefaultColorScheme({ colorScheme: 'primary' }),
);
