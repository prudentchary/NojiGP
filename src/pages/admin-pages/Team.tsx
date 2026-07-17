import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Table, Badge } from '@/components/ui';

interface TeamMember {
    id: string;
    name: string;
    role: string;
    department: string;
    riskScore: number;
    scrs: 'Low' | 'Med' | 'High';
    incidents: number;
    lastActive: string;
}

const mockTeamMembers: TeamMember[] = [
    { id: '1', name: 'Kate Huntington', role: 'Financial officer', department: 'Finance', riskScore: 89, scrs: 'High', incidents: 3, lastActive: '12 Jan 2023, 12:90am' },
    { id: '2', name: 'Kate Huntington', role: 'Financial officer', department: 'Finance', riskScore: 67, scrs: 'Med', incidents: 1, lastActive: '12 Jan 2023, 12:90am' },
    { id: '3', name: 'Kate Huntington', role: 'Financial officer', department: 'Finance', riskScore: 29, scrs: 'Low', incidents: 0, lastActive: '12 Jan 2023, 12:90am' },
];

const Team: React.FC = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const columns = [
        { 
            header: 'Staff', 
            key: 'name',
            render: (staff: TeamMember) => (
                <div className="flex flex-col">
                    <span className="font-bold text-slate-800 dark:text-slate-50">{staff.name}</span>
                    <span className="text-sm text-slate-400">{staff.role}</span>
                </div>
            )
        },
        { header: 'Department', key: 'department' },
        { header: 'Risk score', key: 'riskScore' },
        { 
            header: 'SCRS', 
            key: 'scrs',
            render: (staff: TeamMember) => {
                const colorMap = { High: 'text-rose-500 bg-rose-50', Med: 'text-amber-500 bg-amber-50', Low: 'text-emerald-500 bg-emerald-50' };
                return (
                    <div className={`px-3 py-1 rounded-full w-max text-[13px] font-bold ${colorMap[staff.scrs]}`}>
                        {staff.scrs}
                    </div>
                );
            }
        },
        { header: 'Incidents', key: 'incidents' },
        { header: 'Last active', key: 'lastActive' }
    ];

    return (
        <div className="flex flex-col w-full gap-8">
            {/* Overview Header tailored for individual view (team-3.jpg) */}
            <div className="grid grid-cols-5 gap-4">
                <div className="col-span-1 bg-white p-6 rounded-[20px]  shadow-sm flex flex-col justify-center dark:bg-[#1F262E]">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-100">SCRS</span>
                    <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-5xl font-black text-slate-900 dark:text-slate-100">40</span>
                        <span className="text-2xl font-bold text-slate-400 opacity-80  dark:text-slate-100">%</span>
                    </div>
                </div>
                {/* Additional Metric Cards here */}
            </div>

            {/* Security Score Trend */}
            <div className="bg-white p-6 rounded-[20px] shadow-sm dark:bg-[#1F262E]">
                <h3 className="text-lg font-bold text-slate-900 mb-4 dark:text-slate-100">Security score trend</h3>
                <div className="h-[250px] w-full bg-slate-50 rounded-lg dark:bg-[#1F262E]">
                    {/* Insert Line Chart Component Here */}
                </div>
            </div>

            {/* Timelines with fixed headers */}
            <div className="grid grid-cols-2 gap-8">
                 <div>
                     <h3 className="text-lg font-bold text-slate-900 mb-4 border-b pb-2">Incidents</h3>
                     {/* Incidents list */}
                 </div>
                 <div>
                     <h3 className="text-lg font-bold text-slate-900 mb-4 border-b pb-2">Activity timeline</h3>
                     {/* Activity list */}
                 </div>
            </div>

            {/* Table View (team-2.png) */}
            <div className="mt-8">
                <Table
                    columns={columns}
                    data={mockTeamMembers}
                    onRowClick={(staff) => navigate(`/team/finance/${staff.id}`)}
                    pagination={{
                        currentPage,
                        totalPages: 200,
                        onPageChange: setCurrentPage,
                        rowsPerPage,
                        onRowsPerPageChange: (rows) => { setRowsPerPage(rows); setCurrentPage(1); }
                    }}
                />
            </div>
        </div>
    );
};

export default Team;
