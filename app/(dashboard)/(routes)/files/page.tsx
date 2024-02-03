"use client";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Files = () => {
	const router = useRouter();
	const checkUser = () => {
		onAuthStateChanged(auth, (user: any) => {
			if (user) {
			} else {
				router.push("/login");
			}
		});
	};
	useEffect(() => {
		checkUser();
	}, []);

	return <div>Files</div>;
};

export default Files;
