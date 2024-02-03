"use client";
import React, { useState, FormEvent } from "react";
import {
	getAuth,
	createUserWithEmailAndPassword,
	Auth,
	UserCredential,
	updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const page: React.FC = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [name, setName] = useState<string>("");

	const router = useRouter();

	const registerUser = (e: FormEvent) => {
		e.preventDefault();
		const authInstance: Auth = auth;
		createUserWithEmailAndPassword(authInstance, email, password)
			.then((userCredential: UserCredential) => {
				updateProfile(userCredential?.user, { displayName: name });
				toast.success("User registration successfull");
				router.push("/login");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorMessage, errorCode);
			});
	};

	return (
		<div>
			<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-lg">
					<h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
						Register
					</h1>

					<form
						onSubmit={registerUser}
						className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
						<p className="text-center text-lg font-medium">
							Create your account
						</p>

						<div>
							<label htmlFor="name" className="sr-only">
								Enter your full name
							</label>

							<div className="relative">
								<input
									type="text"
									className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
									placeholder="Enter full name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
									autoComplete="off"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="email" className="sr-only">
								Email
							</label>

							<div className="relative">
								<input
									type="email"
									className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
									placeholder="Enter email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									autoComplete="off"
								/>
							</div>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>

							<div className="relative">
								<input
									type="password"
									className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
									placeholder="Enter password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									autoComplete="off"
								/>
							</div>
						</div>

						<button
							type="submit"
							className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white">
							Sign Up
						</button>

						<p className="text-center text-sm text-gray-500">
							No account?
							<Link className="underline" href="/login">
								Sign in
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default page;
