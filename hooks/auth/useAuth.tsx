import React from 'react'

export default function useAuth() {
	  // This hook can be used to manage authentication state, such as user login, logout, and session management.
	const inputs = [
		{ id: 'email', type: 'email', placeholder: 'Ingresa tu correo' },
		{ id: 'password', type: 'password', placeholder: 'Ingresa la contraseña' },
	]

	return {inputs}
}

