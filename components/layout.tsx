'use client'
import React from 'react'
import ButtonOpenSidebar from './buttonOpenSidebar';
import Sidebar from './sidebar';
import useLayout from '@/hooks/layout/useLayout';
import { Toaster } from 'react-hot-toast';
import ButtonOpenSidebarAdmin from './buttonOpenSidebarAdmin';
import SidebarAdmin from './sidebarAdmin';

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	const { showSidebar, setShowSidebar, showSidebarAdmin, setShowSidebarAdmin,showButtonAdmin } = useLayout();

	return (
		<main className="flex flex-col min-h-screen">
			<Toaster />
			{!showSidebar &&
				<ButtonOpenSidebar setShowSidebar={setShowSidebar} />

			}
			{
				showSidebar && <Sidebar setShowSidebar={setShowSidebar} />
			}
			{children}
			{!showSidebarAdmin &&
				<div className='absolute right-[8%] w-auto h-auto top-[3%]'>
					<ButtonOpenSidebarAdmin setShowSidebarAdmin={setShowSidebarAdmin} />
				</div>

			}
			{
				showSidebarAdmin && <SidebarAdmin setShowSidebarAdmin={setShowSidebarAdmin} />
			}
		</main>
	)
}
