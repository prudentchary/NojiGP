import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Outlet } from "react-router";

export const Layout: React.FC = () => {
    return (
        <div className="flex min-h-screen bg-[#F9FAFB] font-sans dark:bg-slate-950">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 px-8 py-8 overflow-y-auto w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
