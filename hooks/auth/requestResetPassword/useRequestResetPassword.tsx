import React from 'react'

export default function useRequestResetPassword() {
	const [email, setEmail] = React.useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	console.log(email)
	return {
		email,
		handleChange
	}
}
