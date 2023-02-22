import {
	extendTheme,
	withDefaultColorScheme,
	theme as baseTheme,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
export const customTheme = extendTheme(
	{
		fonts: {
			body: 'montserrat',
			heading: 'montserrat',
		},
		colors: {
			primary: {
				50: '#00ADB5',
			},
			border: '#00ADB5',
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
					bg: mode('#f8f9fb', '#202020')(props),
				},
				'*::placeholder': {
					color: mode('gray.400', 'whiteAlpha.400')(props),
				},
			}),
		},
	},
	withDefaultColorScheme({ colorScheme: 'primary' }),
);
