'use client'
import { useEffect, useState } from "react";
import useAuth from "../auth/useAuth";

export default function useLayout() {
	const [showSidebar, setShowSidebar] = useState(false);
	const [showSidebarAdmin, setShowSidebarAdmin] = useState(false);
	const [showButtonAdmin, setShowButtonAdmin] = useState(false);
	const {dataUser} =useAuth();

	useEffect(()=>{
		if(dataUser?.user?.role_id === 1){
			setShowButtonAdmin(true);
		}
	},[dataUser])

	return { showSidebar, setShowSidebar, showSidebarAdmin, setShowSidebarAdmin, showButtonAdmin, setShowButtonAdmin }
}
