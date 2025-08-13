"use client";
import React from "react";

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
		<div className="w-full mx-auto my-12">
			<ul className="divide-y divide-[#e4e7da] rounded-xl bg-[#35384b] shadow-sm">
				{items.map((item) => {
					const isOpen: boolean = openIds.includes(item.id); // garantiza boolean
					return (
						<li key={item.id}>
							<button
								title="open question"
								type="button"
								onClick={() => toggle(item.id)}
								aria-controls={`faq-panel-${item.id}`}
								className="w-full flex items-center justify-between gap-4 py-4 px-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7ed957] transition"
							>
								<span className="font-semibold text-xl text-[#ffffff]">
									{item.question}
								</span>
								<span
									className={`text-[#ffffff] transition-transform ${
										isOpen ? "rotate-180" : ""
									}`}
									aria-hidden="true"
								>
									▼
								</span>
							</button>
							<div
								id={`faq-panel-${item.id}`}
								role="region"
								className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
									isOpen
										? "grid-rows-[1fr] opacity-100"
										: "grid-rows-[0fr] opacity-0"
								} px-5`}
							>
								<div className="overflow-hidden pb-4">
									<p className="text-lg leading-relaxed text-[#fcf9d9]">
										{item.answer}
									</p>
								</div>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
