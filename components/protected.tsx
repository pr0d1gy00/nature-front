import useAuth from "@/hooks/auth/useAuth";
import { DecodedToken } from "@/hooks/layout/useLayout";
import { jwtDecode } from "jwt-decode";
import { data } from "motion/react-m";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
	children: React.ReactNode;
	allowedRoles?: string[];
	redirectTo?: string;
	requireLogin?: boolean;
};

export default function Protected({
	children,
	allowedRoles,
	redirectTo = "/",
	requireLogin = true,
}: Props) {
	const { dataUser, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (loading) return;
		const token = dataUser?.token;
		// if there's no token on the client, avoid forcing a client-side redirect
		// because server-side middleware may have already allowed the request using HttpOnly cookies.
		if (requireLogin && !token) {
			// don't redirect here; render guard by returning early
			return;
		}

		if (allowedRoles && token) {
			try {
				const decoded: DecodedToken = jwtDecode(token);
				const role = decoded.role_id;
				const allowed = allowedRoles.map(String);
				if (!role || !allowed.includes(role.toString())) {
					router.replace(redirectTo);
				}
			} catch (e) {
				// token invalid -> redirect to login
				router.replace(redirectTo);
			}
		}
	}, [dataUser, loading, allowedRoles, redirectTo, requireLogin, router]);

	if (loading) return null;
	if (requireLogin && !dataUser?.token) return null;
	return <>{children}</>;
}
