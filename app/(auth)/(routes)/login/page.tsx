"use client";
import React, { FormEvent, useState, ChangeEvent } from "react";
import {
	getAuth,
	signInWithEmailAndPassword,
	UserCredential,
} from "firebase/auth";
import { auth } from "@/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const router = useRouter();

	const signInUser = (e: FormEvent) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				router.push("/upload");
			})
			.catch((error): any => {
				const errorCode: string = error.code;
				const errorMessage: string = error.message;
				console.error(errorMessage, errorCode);
			});
	};

	return (
		<div>
			<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-lg">
					<h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
						Login
					</h1>
					<form
						onSubmit={signInUser}
						className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
						<p className="text-center text-lg font-medium">
							Sign in to your account
						</p>

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
									onChange={(e: ChangeEvent<HTMLInputElement>) =>
										setEmail(e.target.value)
									}
									required
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
									onChange={(e: ChangeEvent<HTMLInputElement>) =>
										setPassword(e.target.value)
									}
									required
								/>
							</div>
						</div>

						<button
							type="submit"
							className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white">
							Sign in
						</button>

						<p className="text-center text-sm text-gray-500">
							No account?
							<Link className="underline" href="/register">
								Sign up
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
