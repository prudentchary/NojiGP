import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Table, Badge } from '@/components/ui';
import { MoreHorizontal } from 'lucide-react';
import { cn } from "@/lib/cn";

interface Staff {
    id: string;
    name: string;
    role: string;
    department: string;
    riskLevel: 'Low' | 'Med' | 'High';
    scrs: number;
    incidents: number;
    lastActive: string;
    avatar?: string;
}

const mockStaff: Staff[] = Array.from({ length: 10 }).map((_, idx) => ({
    id: `${idx + 1}`,
    name: 'Kate Hunington',
    role: 'Financial officer',
    department: 'Finance',
    riskLevel: idx < 2 ? 'High' : idx < 5 ? 'Med' : 'Low',
    scrs: 89 - (idx * 5),
    incidents: idx < 2 ? 3 : idx < 3 ? 1 : 0,
    lastActive: '12 Jan 2023, 12:90am',
    avatar: 'https://i.pravatar.cc/150?u=kate'
}));

const DepartmentDetails: React.FC = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { id } = useParams();

    const columns = [
        { 
            header: 'Staff', 
            key: 'name',
            render: (staff: Staff) => (
                <div className="flex items-center gap-3">
                    <img src={staff.avatar} alt="" className="size-10 rounded-full object-cover border border-slate-100" />
                    <div className="flex flex-col">
                        <span className="font-bold text-slate-900 leading-tight">{staff.name}</span>
                        <span className="text-[13px] text-slate-400 font-medium">{staff.role}</span>
                    </div>
                </div>
            )
        },
        { header: 'Department', key: 'department' },
        { 
            header: 'Risk score', 
            key: 'riskLevel',
            render: (staff: Staff) => (
                <span className={cn(
                    "font-bold text-[14px]",
                    staff.riskLevel === 'High' ? "text-rose-500" : 
                    staff.riskLevel === 'Med' ? "text-amber-500" : "text-emerald-500"
                )}>
                    {staff.riskLevel}
                </span>
            )
        },
        { header: 'SCRS', key: 'scrs', render: (staff: Staff) => <span className="font-bold text-slate-700">{staff.scrs}</span> },
        { header: 'Incidents', key: 'incidents', render: (staff: Staff) => <span className="font-bold text-slate-700">{staff.incidents}</span> },
        { header: 'Last active', key: 'lastActive', render: (staff: Staff) => <span className="font-bold text-slate-700">{staff.lastActive}</span> },
        { 
            header: 'Actions', 
            key: 'actions',
            render: () => (
                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                    <MoreHorizontal className="size-5" />
                </button>
            )
        },
    ];

    return (
        <div className="flex flex-col w-full">
            <Table
                columns={columns}
                data={mockStaff}
                onRowClick={(staff) => navigate(`/team/staff/${staff.id}`)}
                pagination={{
                    currentPage: currentPage,
                    totalPages: 200,
                    onPageChange: (page) => setCurrentPage(page),
                    rowsPerPage: rowsPerPage,
                    onRowsPerPageChange: (rows) => {
                        setRowsPerPage(rows);
                        setCurrentPage(1);
                    }
                }}
            />
        </div>
    );
};

export default DepartmentDetails;
