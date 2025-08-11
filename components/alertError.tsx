import { toast } from 'react-hot-toast';

export function ShowErrorAlert(message: string) {
	toast.error(message, {
		duration: 5000,
		style: {
		background: '#6B0505',
		color: '#fff',
		},
		iconTheme: {
		primary: 'white',
		secondary: 'black',
		},
	});
}