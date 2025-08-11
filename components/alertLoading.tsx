import { toast } from 'react-hot-toast';

let loadingToastId: string | undefined;

export function ShowLoadingAlert(message: string) {

	loadingToastId = toast.loading(message, {
		duration: 10000,
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

	export function DismissLoadingAlert() {
	if (loadingToastId) {
		toast.dismiss(loadingToastId);
		loadingToastId = undefined;
	}
}