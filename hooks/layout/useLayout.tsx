"use client";
import {useEffect, useState} from "react";
import useAuth from "../auth/useAuth";
import {jwtDecode} from "jwt-decode";
import {decryptId} from '../../helpers/decryptedId';

export interface DecodedToken {
    id: string;
    email: string;
    role_id: number;
}

export default function useLayout() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showSidebarAdmin, setShowSidebarAdmin] = useState(false);
    const [showButtonAdmin, setShowButtonAdmin] = useState(false);
    const {dataUser} = useAuth();
    const [decoded, setDecoded] = useState<DecodedToken>({
        id: "",
        email: "",
        role_id: 0
    });
    const token = dataUser.token;

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode<DecodedToken>(token);
            setDecoded(decodedToken);
        }
    }, [token]);

    useEffect(() => {
        if (parseInt(decryptId(decoded?.role_id.toString())) === parseInt(process.env.NEXT_PUBLIC_ROLE_ID_ADMIN!)) {
            setShowButtonAdmin(true);
        }
    }, [decoded]);

    useEffect(() => {
        if (showSidebar && parseInt(decryptId(decoded?.role_id.toString())) === parseInt(process.env.NEXT_PUBLIC_ROLE_ID_ADMIN!)) {
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
