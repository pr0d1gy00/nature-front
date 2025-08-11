'use client'
import React from 'react'
import ButtonOpenSidebar from './buttonOpenSidebar';
import Sidebar from './sidebar';
import useLayout from '@/hooks/layout/useLayout';
import { Toaster } from 'react-hot-toast';

interface LayoutProps {
  	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	const { showSidebar, setShowSidebar } = useLayout();
	console.log(showSidebar)
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
		</main>
	)
}
