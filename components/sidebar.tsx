import Link from "next/link";
import React from "react";
import StoreIcon from "../public/icones/store.png";
import Image from "next/image";
import useSidebar from "@/hooks/sidebar/useSidebar";
import HeaderSidebar from "./headerSidebar";
import OptionSidebar from "./optionSidebar";
import LoginIcon from "../public/icones/login.png";
import LogoutIcon from "../public/icones/logout.png";
import PersonIcon from "../public/icones/person.png";
import CartShopping from "../public/icones/carrito-de-compras.png";
import useAuth from "../hooks/auth/useAuth";
import { motion } from "motion/react";

interface SidebarProps {
	setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ setShowSidebar }: SidebarProps) {
	const { sidebarOptions } = useSidebar();
	const { dataUser, handleLogout } = useAuth();
	return (
		<motion.aside
			animate={{ x: 0 }}
			initial={{ x: "-100%" }}
			exit={{ x: "-100%" }}
			className="max-md:w-[70%] max-lg:w-[40%] w-[18%] h-full rounded-2xl shadow-2xl bg-[#fdfee7] fixed top-0 left-0 p-4 flex flex-col items-start justify-start z-10"
		>
			<HeaderSidebar setShowSidebar={setShowSidebar} />
			<motion.nav
				animate={{ opacity: 1 }}
				initial={{ opacity: 0 }}
				exit={{ opacity: 0 }}
				className="flex flex-col items-center mt-5 overflow-y-auto w-full h-full"
			>
				<Link
					href="/store"
					className="flex flex-col items-center w-full p-0"
				>
					<motion.button
						whileTap={{ scale: 0.95 }}
						title="store"
						className="w-full bg-[#fcf9d9] rounded-lg mb-4 flex flex-col items-center gap-2 hover:bg-[#35384b4c] transition-colors p-2"
					>
						<Image
							src={StoreIcon}
							alt="store"
							className="w-12 h-12 object-contain"
						/>
						<span className="text-xl text-[#35384b]">
							Tienda
						</span>
					</motion.button>
				</Link>

				{sidebarOptions.map((option, index) => (
					<OptionSidebar
						key={index}
						index={index}
						option={option}
					/>
				))}
				{dataUser.token.length > 0 ? (


					<motion.div
						animate={{ opacity: 1 }}
						initial={{ opacity: 0 }}
						exit={{ opacity: 0 }}
						className="w-[90%] flex flex-col items-center justify-between mt-auto mb-4"
					>
						<Link
						href={"/store/my-cart"}
						className="w-[100%] bottom-0"
					>
						<motion.button
							title="cart"
							type="button"
							className="w-[100%] bg-[#fcf9d9] rounded-lg mb-4 flex items-center gap-2 hover:bg-[#35384b4c] transition-colors p-2"
						>
							<Image
								src={CartShopping}
								alt="perfil"
								className="w-8 h-8 object-contain"
							/>
							<span className="text-xl text-[#35384b]">
								Tu carrito
							</span>
						</motion.button>
					</Link>
						<div className="flex items-center justify-between w-full">

						<Link
							href={""}
							className="bg-[#fcf9d9] flex gap-2 items-center hover:bg-[#35384b4c] rounded-lg p-2 w-auto h-auto"
						>
							<Image
								src={PersonIcon}
								alt="perfil"
								className="w-8 h-8 object-contain"
							/>
							Perfil
						</Link>
						<motion.button
							whileTap={{ scale: 0.95 }}
							title="logout"
							type="button"
							onClick={handleLogout}
							className="bg-[#fcf9d9] w-auto h-auto hover:bg-[#35384b4c] rounded-lg p-2"
						>
							<Image
								src={LogoutIcon}
								alt="login"
								className="w-8 h-8 object-contain"
							/>
						</motion.button>

						</div>
					</motion.div>

				) : (
					<Link
						href={"/auth"}
						className="w-[90%] absolute bottom-0"
					>
						<motion.button
							title="login"
							type="button"
							className="w-[100%] bg-[#fcf9d9] rounded-lg mb-4 flex items-center gap-2 hover:bg-[#35384b4c] transition-colors p-2"
						>
							<Image
								src={LoginIcon}
								alt="login"
								className="w-12 h-12 object-contain"
							/>
							<span className="text-xl text-[#35384b]">
								Iniciar Sesión
							</span>
						</motion.button>
					</Link>
				)}
			</motion.nav>
		</motion.aside>
	);
}
