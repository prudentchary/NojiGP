import React from "react";
import {
    Sun,
    Moon,
    History,
    Bell,
    LayoutGrid,
    Columns
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useLayoutContext } from "./LayoutContext";
import { useLocation, Link } from "react-router";

export const Header: React.FC = () => {
    const { toggleSidebar, isDarkMode, toggleTheme, toggleLayoutMode } = useLayoutContext();
    const location = useLocation();

    // Generate breadcrumbs from path
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const currentPage = pathSegments.length > 0
        ? pathSegments[pathSegments.length - 1].charAt(0).toUpperCase() + pathSegments[pathSegments.length - 1].slice(1)
        : "Overview";

    return (
        <header className="h-[72px] flex items-center justify-between px-8 bg-[#F9FAFB] border-b border-slate-100 sticky top-0 z-40 dark:bg-slate-900 dark:border-slate-800">
            {/* Left part: Sidebar toggle & Breadcrumbs */}
            <div className="flex items-center gap-6">
                <button onClick={toggleSidebar} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                    <Columns className="size-5" />
                </button>

                <nav className="flex items-center gap-2 text-[14px] font-medium tracking-tight">
                    <span className="text-slate-400">Dashboards</span>
                    <span className="text-slate-200">/</span>
                    {pathSegments.map((segment, idx) => {
                        const path = `/${pathSegments.slice(0, idx + 1).join('/')}`;
                        const isLast = idx === pathSegments.length - 1;
                        
                        // Map route to display names
                        const routeNames: Record<string, string> = {
                            'dashboard': 'Overview',
                            'team': 'Team',
                            'alerts': 'Alerts & Incidents',
                            'threats': 'Threats',
                            'monitoring': 'Monitoring',
                            'user-behaviour': 'User Behaviour',
                            'compliance-policy': 'Compliance & Policy',
                            'endpoint-devices': 'Endpoints & Devices',
                            'network-activity': 'Network Activity',
                            'configuration': 'Configuration',
                            'policy-configs': 'Policy Configs',
                            'audit-logs': 'Audit Logs',
                            'integrations': 'Integrations',
                            'change-password': 'Settings',
                            'linked-events': 'Linked events'
                        };

                        let displayName = routeNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

                        // Special mapping for investigation IDs in threats flow
                        const threatIdx = pathSegments.indexOf('threats');
                        if (threatIdx !== -1 && idx === threatIdx + 1 && segment !== 'linked-events') {
                            displayName = 'Incident Investigation';
                        }

                        return (
                            <React.Fragment key={path}>
                                {idx > 0 && <span className="text-slate-200">/</span>}
                                {isLast ? (
                                    <span className="text-slate-900 font-bold dark:text-white">
                                        {displayName}
                                    </span>
                                ) : (
                                    <Link to={path} className="text-slate-400 hover:text-slate-600 transition-colors">
                                        {displayName}
                                    </Link>
                                )}
                            </React.Fragment>
                        );
                    })}
                </nav>
            </div>

            {/* Right part: Utility Actions */}
            <div className="flex items-center gap-6">
                <button onClick={toggleTheme} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors relative">
                    {isDarkMode ? <Moon className="size-5" /> : <Sun className="size-5" />}
                </button>
                <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                    <History className="size-5" />
                </button>
                <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors relative">
                    <Bell className="size-5" />
                    {/* Notification dot */}
                    <span className="absolute top-1 right-1 size-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
                </button>
                <button onClick={toggleLayoutMode} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                    <LayoutGrid className="size-5" />
                </button>
            </div>
        </header>
    );
};
