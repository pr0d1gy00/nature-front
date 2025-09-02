import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BACKEND_VERIFY =
	process.env.NEXT_PUBLIC_URL_BACKEND ?? "http://localhost:8000";

export async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;
	const PUBLIC = [
		"/auth",
		"/auth/login",
		"/auth/register",
		"/no-access",
		"/favicon.ico",
		"/_next",
		"/store"
	];
	// allow the exact root path but avoid treating the single slash as a prefix
	if (pathname === "/") return NextResponse.next();
	if (PUBLIC.some((p) => pathname.startsWith(p)))
		return NextResponse.next();

	const token = req.cookies.get("token")?.value;
	if (!token) {
		const loginUrl = new URL("/auth", req.url);
		const r = NextResponse.redirect(loginUrl);
		r.headers.set('x-middleware-reason', 'no_token');
		return r;
	}


	try {
		const verifyRes = await fetch(`${BACKEND_VERIFY}/api/verify-token`, {
			method: 'POST',
			headers: {
				cookie: req.headers.get('cookie') ?? '',
				'content-type': 'application/json',
			},
			cache: 'no-store',
		});
		const text = await verifyRes.text().catch(() => null);
		if (!verifyRes.ok) {
			const noAccess = new URL('/no-access', req.url);
			noAccess.searchParams.set('reason', `${verifyRes.status}:${encodeURIComponent(String(text))}`);
			const r = NextResponse.redirect(noAccess);
			r.headers.set('x-middleware-reason', `verify_${verifyRes.status}`);
			return r;
		}
		const data = JSON.parse(text || '{}');
		const requiredRole = Number(process.env.NEXT_PUBLIC_ROLE_ID_ADMIN ?? 1);
		if (Number(data.role_id) === requiredRole) {
			const res = NextResponse.next();
			res.headers.set('x-middleware-allowed', 'true');
			res.headers.set('x-middleware-role', String(data.role_id));
			return res;

		} else {
			const noAccess = new URL('/no-access', req.url);
			noAccess.searchParams.set('reason', `role_mismatch:${data.role_id}`);
			const r = NextResponse.redirect(noAccess);
			r.headers.set('x-middleware-reason', `role_mismatch:${data.role_id}`);
			return r;
		}
	} catch (err) {
		const loginUrl = new URL('/auth', req.url);
		loginUrl.searchParams.set('reason', 'fetch_error');
		return NextResponse.redirect(loginUrl);
	}
}

export const config = {
	matcher: [
		"/category/register",
		"/category/:path*",
		"/admin/:path*",
		"/products/:path*",
	],
};
