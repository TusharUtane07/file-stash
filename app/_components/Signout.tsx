// Your React component file (e.g., SignOutButton.tsx)
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Signout: React.FC = () => {
	const router = useRouter();
	const handleSignOut = async () => {
		try {
			await signOut(auth);
			toast.success("User signed out successfully");
			router.push("/");
		} catch (error: any) {
			toast.error("Error signing out");
		}
	};

	return (
		<button
			className="bg-primary text-white py-1 px-4 rounded-md"
			onClick={handleSignOut}>
			Sign Out
		</button>
	);
};

export default Signout;
