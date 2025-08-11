'use client'
import { useState } from "react";

export default function useLayout() {
	const [showSidebar, setShowSidebar] = useState(false);

	return { showSidebar, setShowSidebar }
}
