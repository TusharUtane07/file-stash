import React from "react";

type Props = {};

const ShareForm = (props: Props) => {
	return (
		<div className="border-2 lg:border-r-2 border-black/10 m-5 lg:px-10 lg:py-8">
			<h1 className="text-xl text-center m-1">Share your file</h1>
			<div className="px-2 mt-5">
				<label htmlFor="email">Enter password to send</label>

				<div className="mt-1">
					<input
						type="Password"
						className="w-full rounded-lg border-gray-400 text-lg p-2 border shadow-sm"
						placeholder="password"
						required
					/>
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
						/>
					</div>
					<button className="mt-2 bg-primary text-white px-5 py-1 lg:py-2 rounded-sm text-center w-full mb-3">
						Send{" "}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ShareForm;
