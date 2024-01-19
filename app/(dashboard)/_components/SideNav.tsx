"use client";
import { File, Shield, Upload } from "lucide-react";
import React, { useState } from "react";

interface menuItem {
	id: number;
	name: string;
	icon: React.ComponentType;
	path: string;
}

const SideNav: React.FC = () => {
	const menuList: menuItem[] = [
		{
			id: 1,
			name: "Upload",
			icon: Upload,
			path: "/upload",
		},
		{
			id: 2,
			name: "Files",
			icon: File,
			path: "/files",
		},
		{
			id: 3,
			name: "Upgrade",
			icon: Shield,
			path: "/upgrade",
		},
	];

	const [activeIndex, setActiveIndex] = useState<number>(0);

	return (
		<div className="shadow-sm border-r h-full">
			<div className="p-5 border-b">
				<h1>File stash</h1>
			</div>
			<div className="flex flex-col float-left w-full">
				{menuList.map((item: menuItem, index: number) => (
					<button
						key={item.id}
						className={`flex gap-2 p-4 px-0 hover:bg-gray-100 w-full text-gray-500 ${
							activeIndex === index ? "bg-blue-50 text-blue-700" : null
						}`}
						onClick={() => setActiveIndex(index)}>
						<item.icon />
						<h2>{item.name}</h2>
					</button>
				))}
			</div>
		</div>
	);
};

export default SideNav;
