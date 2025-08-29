import { toast } from 'react-hot-toast';

export const AlertAddToCart = (message:string) => {
    toast.success( message,{
        duration: 3000,
        style: {
            background: '#006fff',
            color: '#fff',
        },
        iconTheme: {
            primary: 'white',
            secondary: 'black',
        },
    });
};
