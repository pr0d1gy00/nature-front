import { toast } from 'react-hot-toast';

export function ShowSuccessAlert(message: string) {
	toast.success(message, {
		duration: 3000,
		style: {
		background: '#7ed957',
		color: '#35384b',
		},
		iconTheme: {
		primary: 'white',
		secondary: 'black',
		},
	});
}