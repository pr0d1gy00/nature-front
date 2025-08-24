import Layout from "@/components/layout";
import React from "react";

export default function page() {
	return (
		<Layout>
			<section className="max-md:w-[100%] max-md:items-start flex flex-col items-center justify-start min-h-screen w-full bg-gradient-to-br from-[#fdfee7] via-[#fdfee7] to-[#32384549]">
				<div className="max-md:w-[90%] max-md:items-start flex flex-col items-start w-[50%] mt-12">
					<h2 className="text-3xl font-bold">
						Acceso denegado
					</h2>
					<p className="mt-4 text-lg">
						Lo sentimos, no tienes permiso para acceder a
						esta página.
					</p>
				</div>
			</section>
		</Layout>
	);
}
