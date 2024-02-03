"use client";

import Signout from "@/app/_components/Signout";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
	AlignJustify,
	CircleUserRound,
	File,
	Shield,
	Upload,
	X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

interface menuItem {
	id: number;
	name: string;
	icon: React.ComponentType;
	path: string;
}

const TopHeader = () => {
	const [nav, setNav] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");

	const router = useRouter();

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

	const checkUser = () => {
		onAuthStateChanged(auth, (user: any) => {
			if (user) {
				setEmail(user?.displayName);
			} else {
				router.push("/login");
			}
		});
	};
	useEffect(() => {
		checkUser();
	}, []);

	return (
		<div className="md:border-b-2 border-black/5 md:h-16 md:flex md:items-center md:justify-end">
			<AlignJustify className="md:hidden" onClick={() => setNav(!nav)} />

			<div className="hidden md:flex items-center justify-end gap-3 mr-8">
				<CircleUserRound />
				<div className="">
					<p>{email}</p>
				</div>
				<div className="">
					<Signout />
				</div>
			</div>
			<div
				className={
					nav
						? "fixed top-0 left-0 w-screen h-screen bg-white z-10 duration-700 md:hidden"
						: "fixed top-0 left-[-100%] w-[100px] h-screen bg-white z-10 duration-700 md:hidden"
				}>
				<X
					onClick={() => setNav(!nav)}
					size={30}
					className="absolute right-3 top-5 cursor-pointer md:right-10 md:top-7 "
				/>
				<div className="text-2xl ml-3 mt-5 md:text-4xl md:ml-5 md:mt-5">
					<span className="font-bold">File Stash</span>
				</div>
				<div className="text-center mt-16 text-xl">
					{menuList.map((item) => {
						return (
							<Link href={item.path} key={item.id}>
								<div
									className="mt-10 flex items-center justify-center gap-3"
									onClick={() => setNav(!nav)}>
									{<item.icon />}
									{item.name}
								</div>
							</Link>
						);
					})}
					<div className="mt-8 flex items-center justify-center gap-3">
						<CircleUserRound />
						<p>User Name here</p>
					</div>
					<div className="mt-2">
						<Signout />
					</div>
				</div>
			</div>
		</div>
	);
};

export default TopHeader;
