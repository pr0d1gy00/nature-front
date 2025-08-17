"use client";
import React from "react";
import { motion } from "motion/react";

export interface FAQItem {
	id: string;
	question: string;
	answer: string;
}

interface FAQProps {
	items: FAQItem[];
	singleOpen?: boolean;
}
export default function Faq({ items, singleOpen }: FAQProps) {
	const [openIds, setOpenIds] = React.useState<string[]>([]);

	const toggle = (id: string) => {
		setOpenIds((prev) => {
			const isOpen = prev.includes(id);
			if (singleOpen) {
				return isOpen ? [] : [id];
			}
			return isOpen
				? prev.filter((x) => x !== id)
				: [...prev, id];
		});
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
			className="w-full mx-auto my-12"
			whileInView={{ opacity: 1, y: 0 }}
			id="#help"
		>
			<ul className="divide-y divide-[#e4e7da] rounded-xl bg-[#35384b] shadow-sm">
				{items.map((item) => {
					const isOpen: boolean = openIds.includes(item.id); // garantiza boolean
					return (
						<li key={item.id} className="list-none">
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3 }}
								whileInView={{ opacity: 1, y: 0 }}
							>
								<button
									title="open question"
									type="button"
									onClick={() => toggle(item.id)}
									aria-expanded={
										isOpen ? "true" : "false"
									}
									aria-controls={`faq-panel-${item.id}`}
									className="w-full flex items-center justify-between gap-4 py-4 px-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7ed957] transition"
								>
									<span className="font-semibold text-xl text-[#ffffff]">
										{item.question}
									</span>
									<motion.span
										className={`text-[#ffffff] transition-transform`}
										aria-hidden="true"
										animate={{
											rotate: isOpen ? 180 : 0,
										}}
										transition={{ duration: 0.3 }}
										whileInView={{
											opacity: 1,
											y: 0,
										}}
									>
										▼
									</motion.span>
								</button>
								<motion.div
									id={`faq-panel-${item.id}`}
									role="region"
									initial={{
										height: 0,
										opacity: 0,
									}}
									animate={{
										height: isOpen ? "auto" : 0,
										opacity: isOpen ? 1 : 0,
									}}
									transition={{ duration: 0.3 }}
									whileInView={{ opacity: 1, y: 0 }}
									className="grid overflow-hidden px-5"
								>
									<div className="overflow-hidden pb-4">
										<p className="text-lg leading-relaxed text-[#fcf9d9]">
											{item.answer}
										</p>
									</div>
								</motion.div>
							</motion.div>
						</li>
					);
				})}
			</ul>
		</motion.div>
	);
}
