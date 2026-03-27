import React from "react";
import {
    LayoutDashboard,
    Users,
    Bell,
    ShieldAlert,
    Eye,
    Settings,
    Share2,
    LogOut,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/cn";
import logo1 from "@/assets/Logo1.png";
import { Link, useLocation, useNavigate } from "react-router";
import { useLayoutContext } from "./LayoutContext";
import { useAuth } from "../../hooks/useAuth";

interface SubItem {
    label: string;
    path: string;
}

interface SidebarItemProps {
    icon: React.ElementType;
    label: string;
    path?: string;
    subItems?: SubItem[];
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, path, subItems }) => {
    const location = useLocation();
    const [isOpen, setIsOpen] = React.useState(false);
    
    const isChildActive = subItems?.some(item => location.pathname === item.path);
    const isParentActive = path ? location.pathname === path || location.pathname.startsWith(path + "/") : isChildActive;
    
    // Auto-open if child is active
    React.useEffect(() => {
        if (isChildActive) setIsOpen(true);
    }, [isChildActive]);

    const active = isParentActive;
    
    const className = cn(
        "flex items-center justify-between px-4 py-3 cursor-pointer transition-all duration-200 group rounded-lg w-full",
        active && !subItems
            ? "bg-slate-100/80 text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
            : "text-slate-500 hover:bg-slate-50 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200",
        active && subItems && "text-slate-900 dark:text-white"
    );

    const content = (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
                <Icon className={cn("size-5", active ? "text-slate-900 dark:text-white" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300")} />
                <span className={cn("text-[14.5px] font-semibold whitespace-nowrap", active ? "text-slate-900 dark:text-white" : "text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300")}>
                    {label}
                </span>
            </div>
            {subItems && (
                <ChevronRight className={cn(
                    "size-4 text-slate-400 transition-transform duration-200",
                    isOpen && "rotate-90"
                )} />
            )}
        </div>
    );

    return (
        <div className="flex flex-col gap-1">
            {path ? (
                <Link to={path} className={className}>
                    {content}
                </Link>
            ) : (
                <div onClick={() => setIsOpen(!isOpen)} className={className}>
                    {content}
                </div>
            )}
            
            {subItems && isOpen && (
                <div className="flex flex-col gap-1 ml-9 mt-1 animate-in slide-in-from-top-2 duration-200">
                    {subItems.map((item) => {
                        const isSubActive = location.pathname === item.path;
                        return (
                            <Link 
                                key={item.path} 
                                to={item.path}
                                className={cn(
                                    "px-4 py-2 text-[13.5px] font-medium rounded-lg transition-all",
                                    isSubActive 
                                        ? "text-slate-900 font-bold dark:text-white" 
                                        : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                                )}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export const Sidebar: React.FC = () => {
    const { isSidebarOpen } = useLayoutContext();
    const navigate = useNavigate();
    const { logout, user } = useAuth(); //user info


    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <aside className={cn(
            "h-screen border-r border-slate-100 flex flex-col bg-white shrink-0 sticky top-0 overflow-y-auto transition-all duration-300 dark:bg-slate-900 dark:border-slate-800",
            isSidebarOpen ? "w-[280px]" : "w-0 overflow-hidden opacity-0 border-r-0"
        )}>
            {/* Brand Logo */}
            <div className="p-8 flex items-center gap-3 flex-col">
                <div className="p-1">
                    <img src={logo1} alt="Noji Logo" className="w-full h-auto" />
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-1">
                <SidebarItem icon={LayoutDashboard} label="Dashboard" path="/dashboard" />
                <SidebarItem icon={Users} label="Team" path="/team" />
                <SidebarItem icon={Bell} label="Alerts" path="/alerts" />
                <SidebarItem icon={ShieldAlert} label="Threats" path="/threats" />
                <SidebarItem 
                    icon={Eye} 
                    label="Monitoring" 
                    subItems={[
                        { label: 'User Behaviour Analytics', path: '/monitoring/user-behaviour' },
                        { label: 'Compliance and Policy', path: '/monitoring/compliance-policy' },
                        { label: 'Endpoint & Devices Visibility', path: '/monitoring/endpoint-devices' },
                        { label: 'Network Activity', path: '/monitoring/network-activity' },
                    ]}
                />
                <SidebarItem 
                    icon={Settings} 
                    label="Configuration" 
                    subItems={[
                        { label: 'Policy Configs', path: '/configuration/policy-configs' },
                        { label: 'Audit Logs', path: '/configuration/audit-logs' },
                    ]}
                />
                <SidebarItem icon={Share2} label="Integrations" path="/integrations" />
            </nav>

            {/* User Branding & Logout */}
            <div className="p-6 border-t border-slate-50 space-y-4">
                <Link to="/change-password" className="flex items-center gap-3 px-2 py-1 hover:bg-slate-50 hover:-translate-y-px transition-all rounded-lg cursor-pointer">
                    <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-slate-400" fill="currentColor">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                    </div>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{user?.name || user?.email || "Guest User"}</span>
                </Link>

                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-2 py-2 text-slate-500 hover:text-slate-900 transition-colors w-full group"
                >
                    <LogOut className="size-5 text-slate-400 group-hover:text-slate-600" />
                    <span className="text-sm font-bold">Logout</span>
                </button>
            </div>
        </aside>
    );
};
