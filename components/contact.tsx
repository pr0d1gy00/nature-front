"use client"
import { Mail, Phone, MapPin } from "lucide-react"
import { motion } from "framer-motion"

export default function ContactPage() {
    return (
        <section id="contact" className="max-md:w-[100%] min-h-screen w-full bg-gradient-to-br from-[#fdfee7] via-[#fdfee7] to-[#00000047] flex flex-col items-center justify-center px-6 py-12">

            {/* Encabezado */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold text-center mb-6 text-green-700"
            >
                Contáctanos
            </motion.h1>

            <p className="text-gray-600 text-center max-w-2xl mb-10">
                Estamos aquí para escucharte 🌱. Si tienes alguna duda, sugerencia o simplemente quieres saludar,
                no dudes en escribirnos. Te responderemos lo antes posible.
            </p>

            <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">

                {/* Información de contacto */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-center"
                >
                    <h2 className="text-2xl font-semibold text-green-700 mb-4">Información</h2>

                    <div className="flex items-center gap-4 mb-4">
                        <Mail className="w-6 h-6 text-green-600"/>
                        <span className="text-gray-700">nature@gmail.com</span>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                        <Phone className="w-6 h-6 text-green-600"/>
                        <span className="text-gray-700">+58 414-9045496</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <MapPin className="w-6 h-6 text-green-600"/>
                        <span className="text-gray-700">Colonia Tovar, Venezuela</span>
                    </div>
                </motion.div>

                {/* Formulario */}
                <motion.form
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    className="bg-white rounded-2xl shadow-lg p-8"
                >
                    <h2 className="text-2xl font-semibold text-green-700 mb-4">Envíanos un mensaje</h2>

                    <div className="mb-4">
                        <label className="block text-gray-600 mb-1">Nombre</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-400 outline-none"
                            placeholder="Tu nombre"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 mb-1">Correo</label>
                        <input
                            type="email"
                            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-400 outline-none"
                            placeholder="tuemail@email.com"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 mb-1">Mensaje</label>
                        <textarea
                            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-400 outline-none"
                            rows={4}
                            placeholder="Escribe tu mensaje aquí..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition"
                    >
                        Enviar mensaje
                    </button>
                </motion.form>
            </div>
        </section>
    )
}
