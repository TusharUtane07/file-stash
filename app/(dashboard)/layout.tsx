import React from "react";
import SideNav from "./_components/SideNav";
import TopHeader from "./_components/TopHeader";
import { Toaster } from "react-hot-toast";

const layout: React.FC = ({ children }: any) => {
	return (
		<div className="h-full">
			<div className="hidden h-full md:flex md:w-64  flex-col fixed inset-y-0 z-50 ">
				<SideNav />
			</div>
			<div className="md:ml-64 h-full">
				<TopHeader />
				{children}
			</div>
			<Toaster />
		</div>
	);
};

export default layout;
