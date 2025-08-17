"use client";
import { useEffect, useState } from "react";
import useAuth from "../auth/useAuth";
import { tr } from "motion/react-client";
import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
	id: string;
	email: string;
	role_id: number;
}

export default function useLayout() {
	const [showSidebar, setShowSidebar] = useState(false);
	const [showSidebarAdmin, setShowSidebarAdmin] = useState(false);
	const [showButtonAdmin, setShowButtonAdmin] = useState(false);
	const { dataUser } = useAuth();
	const [decoded, setDecoded] = useState<DecodedToken | null>(null);
	const token = dataUser.token;

	useEffect(() => {
		if (token) {
			const decodedToken = jwtDecode<DecodedToken>(token);
			setDecoded(decodedToken);
		}
	}, [token]);

	useEffect(() => {
		if (decoded?.role_id === 1) {
			setShowButtonAdmin(true);
		}
	}, [decoded]);

	useEffect(() => {
		if (showSidebar && decoded?.role_id === 1) {
			setShowSidebarAdmin(false);
			setShowButtonAdmin(true);
		}
		if (showSidebarAdmin) {
			setShowSidebar(false);
		}
	}, [showSidebar, showSidebarAdmin, decoded]);

	return {
		showSidebar,
		setShowSidebar,
		showSidebarAdmin,
		setShowSidebarAdmin,
		showButtonAdmin,
		setShowButtonAdmin,
		decoded
	};
}
