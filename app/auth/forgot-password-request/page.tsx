'use client'
import Button from '@/components/button'
import Divider from '@/components/divider';
import Input from '@/components/input'
import Layout from '@/components/layout';
import useRequestResetPassword from '@/hooks/auth/requestResetPassword/useRequestResetPassword';
import Link from 'next/link'
import React from 'react'
import { Toaster } from 'react-hot-toast';

export default function Page() {
	const { handleChange, handleSubmit, email, loading } = useRequestResetPassword();
	return (
		<Layout>
		<section className="max-md:w-[100%] max-md:items-start flex flex-col items-center justify-center h-screen w-full bg-gradient-to-br from-[#fdfee7] via-[#fdfee7] to-[#32384549]">
			<Toaster/>
			<div className='max-md:w-full h-full flex flex-col items-center justify-center w-[60%]'>
				<div className='max-md:w-[90%] max-md:items-start flex flex-col items-start w-[70%]'>

						<h2 className='max-lg:text-6xl text-7xl font-bold text-[#7ed957]'>Ingresa tu correo para <br /><span className='font-extrabold text-[#35384b]'>cambiar tu contraseña!</span></h2>

						<h3 className='text-xl font-bold text-[#]'><span className='font-extrabold text-[#7ed957]'>Recupera tu contraseña</span> </h3>

						<h4 className='text-md text-[#35384b]'>Luego de enviar la solicitud, recibirás un correo con instrucciones para restablecer tu contraseña.</h4>

					</div>

					<form action="POST" onSubmit={handleSubmit} className='max-md:w-[90%] w-[70%] flex flex-col items-start mt-6'>

						<Input type="email" placeholder="Ingresa tu correo" onChange={handleChange} value={email} />

						<div className='flex items-center justify-between w-full mb-4'>
							<label className='text-md text-[#35384b]'>¿Ya tienes un código?</label>
							<Link href="/auth/reset-password" className='text-md font-bold text-[#35384b]'>Vamos a cambiar la contraseña</Link>
						</div>

						<Divider/>

						<div className='w-full flex items-center justify-center my-2'>

							<Link href="/auth" className='text-2xl font-bold text-[#7ed957] text-center'>Vuelve a <span className='text-[#35384b]'>Login</span></Link>

						</div>

						<Button title="Enviar" type='submit' disabled={loading}/>
					</form>
			</div>
		</section>
		</Layout>
	)
}
