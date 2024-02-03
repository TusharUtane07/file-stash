import GlobalApi from "@/app/_utils/GlobalApi";
import { app, auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ShareForm = ({ id, file }: any) => {
	const db = getFirestore(app);
	const [password, setPassword] = useState<any>();
	const [email, setEmail] = useState<any>();
	const [displayName, setDisplayName] = useState<any>();
	// const [fileUrl, setFileUrl] = useState<any>();

	const router = useRouter();

	const onPasswordSave = async (password: any) => {
		try {
			const docRef = doc(db, "uploadedName", id);
			await updateDoc(docRef, {
				password: password,
			});
			toast.success("Password Updated");
		} catch (error) {
			console.error("Error updating password:", error);
			toast.error("Error updating password");
		}
	};

	const getUserDetails = () => {
		onAuthStateChanged(auth, (user: any) => {
			if (user) {
				setDisplayName(user?.displayName);
			} else {
				router.push("/login");
			}
		});
	};

	useEffect(() => {
		getUserDetails();
	}, []);

	const sendEmail = () => {
		const data = {
			emailToSend: email,
			userName: displayName,
			fileName: file.fileName,
			fileSize: file.fileSize,
			fileUrl: file.fileUrl,
		};

		console.log(email);

		GlobalApi.SendEmail(data).then((res) => {
			console.log(res);
		});
	};

	return (
		<div className="border-2 lg:border-r-2 border-black/10 m-5 lg:px-10 lg:py-8">
			<h1 className="text-xl text-center m-1">Share your file</h1>
			<div className="px-2 mt-5">
				<label htmlFor="email">Enter password to send</label>

				<div className="mt-1 grid grid-cols-3">
					<input
						type="Password"
						className="col-span-2 rounded-lg border-gray-400 text-lg p-2 border shadow-sm"
						placeholder="password"
						value={password || ""}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button
						className="bg-primary text-white mx-3 rounded-lg text-lg"
						onClick={() => onPasswordSave(password)}>
						save
					</button>
				</div>
			</div>
			<div className="pl-2 pr-2 mt-3">
				<div>
					<label htmlFor="email">Send file to email</label>

					<div className="mt-1">
						<input
							type="email"
							className="w-full rounded-lg border-gray-400 text-lg p-2 border shadow-sm"
							placeholder="example@gmail.com"
							required
							value={email || ""}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<button
						className="mt-2 bg-primary text-white px-5 py-1 lg:py-2 rounded-lg text-center w-full mb-3"
						onClick={() => sendEmail()}>
						Send{" "}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ShareForm;
