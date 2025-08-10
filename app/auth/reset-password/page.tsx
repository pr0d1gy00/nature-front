'use client'
import Button from '@/components/button';
import Input from '@/components/input'
import useResetPassword from '@/hooks/auth/resetPassword/useResetPassword'
import Link from 'next/link';
import React from 'react'

export default function Page() {
	const { inputs,handleCodeChange,codeRefs,handleChange } = useResetPassword();
	return (
		<section className="max-md:w-[100%] max-md:items-start flex flex-col items-center justify-center h-auto w-full p-6 bg-gradient-to-br from-[#fdfee7] via-[#fdfee7] to-[#32384549]">
			<div className='max-md:w-full h-full flex flex-col items-center justify-center w-[60%]'>
				<div className='max-md:w-[90%] max-md:items-start flex flex-col items-start w-[70%]'>

						<h2 className='max-lg:text-6xl text-7xl font-bold text-[#7ed957]  break-words'>Cambia tu contraseña de <br /><span className='font-extrabold text-[#35384b]'>Nature!</span></h2>

						<h3 className='text-xl font-bold text-[#]'><span className='font-extrabold text-[#7ed957]'>ingresa la nueva contraseña</span> </h3>

						<h4 className='text-md text-[#35384b]'>
							ingresa el código que recibiste en tu correo para cambiar tu contraseña.
						</h4>

					</div>
					<form action="" className='max-md:w-[90%] w-[70%] flex flex-col items-start mt-6'>
						{inputs.map((input, index) => (
							<Input key={index} onChange={handleChange} id={input.id} name={input.id} type={input.type} placeholder={input.placeholder}/>
						))}
						<div className='flex justify-center gap-8 my-4'>
							{[...Array(6)].map((_, i) => (
								<Input key={i} type="text" maxLength={1} placeholder='X'
								className='w-[30px] text-center'
								ref={el => codeRefs.current[i] = el}
								onChange={e =>(
									handleCodeChange(e,i),
									handleChange(e)
								)}
								autoComplete="one-time-code"
								inputMode="numeric"
								name='code'

								/>
							))}
						</div>
						<div className='flex items-center justify-between w-full mb-4'>
							<label className='text-md text-[#35384b]'>No quieres cambiar contraseña?</label>
							<Link href="/auth" className='text-md font-bold text-[#35384b]'>Vuelve al login</Link>
						</div>
						<Button title="Enviar" />
					</form>
			</div>
		</section>
	)
}
