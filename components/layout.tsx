'use client'
import React from 'react'
import ButtonOpenSidebar from './buttonOpenSidebar';
import Sidebar from './sidebar';
import useLayout from '@/hooks/layout/useLayout';
import { Toaster } from 'react-hot-toast';
import ButtonOpenSidebarAdmin from './buttonOpenSidebarAdmin';
import SidebarAdmin from './sidebarAdmin';
import {motion} from 'motion/react';
import { decryptId } from '@/helpers/decryptedId';

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	const { showSidebar, setShowSidebar, showSidebarAdmin, setShowSidebarAdmin,showButtonAdmin,decoded } = useLayout();

	return (
		<motion.main animate={{ opacity: 1 }} className="flex flex-col min-h-screen overflow-x-hidden">
			<Toaster />
			{!showSidebar && (
				<div className="fixed top-[3%] left-[2%] z-[1000]">
					<ButtonOpenSidebar setShowSidebar={setShowSidebar} />
				</div>
			)}
			{
				showSidebar && !showSidebarAdmin && (
					<div className="fixed top-[3%] left-[2%] z-[1000] w-auto h-auto">
						<Sidebar setShowSidebar={setShowSidebar} />
					</div>
				)
			}
			{children}
			{showButtonAdmin && !showSidebarAdmin && parseInt(decryptId(decoded?.role_id.toString())) === parseInt(process.env.NEXT_PUBLIC_ROLE_ID_ADMIN!) && (
				<div className="fixed top-[3%] right-[3%] z-[1000]">

					<ButtonOpenSidebarAdmin setShowSidebarAdmin={setShowSidebarAdmin} />
				</div>
			)}
			{
				showSidebarAdmin && !showSidebar && (
					<div className="fixed top-[3%] right-[3%] z-[1000]">
						<SidebarAdmin setShowSidebarAdmin={setShowSidebarAdmin} />
					</div>
				)
			}
		</motion.main>
	)
}
