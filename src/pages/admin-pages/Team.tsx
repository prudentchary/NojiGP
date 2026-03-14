import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Table, Badge } from '@/components/ui';

interface Department {
    id: string;
    name: string;
    description: string;
    staffCount: number;
    riskScore: number;
    riskLevel: 'Low' | 'Med' | 'High';
}

const mockDepartments: Department[] = [
    { id: '1', name: 'Finance', description: 'Oversees finance', staffCount: 50, riskScore: 30, riskLevel: 'Low' },
    { id: '2', name: 'Finance', description: 'Oversees finance', staffCount: 50, riskScore: 30, riskLevel: 'Low' },
    { id: '3', name: 'Finance', description: 'Oversees finance', staffCount: 50, riskScore: 30, riskLevel: 'Low' },
    { id: '4', name: 'Finance', description: 'Oversees finance', staffCount: 50, riskScore: 30, riskLevel: 'Low' },
    { id: '5', name: 'Finance', description: 'Oversees finance', staffCount: 50, riskScore: 30, riskLevel: 'Low' },
    { id: '6', name: 'Finance', description: 'Oversees finance', staffCount: 50, riskScore: 30, riskLevel: 'Low' },
    { id: '7', name: 'Finance', description: 'Oversees finance', staffCount: 50, riskScore: 30, riskLevel: 'Low' },
    { id: '8', name: 'Finance', description: 'Oversees finance', staffCount: 50, riskScore: 30, riskLevel: 'Low' },
    { id: '9', name: 'Finance', description: 'Oversees finance', staffCount: 50, riskScore: 30, riskLevel: 'Low' },
    { id: '10', name: 'Finance', description: 'Oversees finance', staffCount: 50, riskScore: 30, riskLevel: 'Low' },
];

const Team: React.FC = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const columns = [
        { header: 'Department', key: 'name' },
        { header: 'Description', key: 'description' },
        { header: 'No of staff', key: 'staffCount' },
        { 
            header: 'AVG risk score', 
            key: 'riskScore',
            render: (dept: Department) => (
                <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-medium">{dept.riskLevel}</span>
                    <div className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100/50 text-emerald-600 text-[13px] font-bold">
                        {dept.riskScore}
                    </div>
                </div>
            )
        },
    ];

    return (
        <div className="flex flex-col w-full">
            <Table
                columns={columns}
                data={mockDepartments}
                onRowClick={(dept) => navigate(`/team/${dept.id}`)}
                pagination={{
                    currentPage: currentPage,
                    totalPages: 200,
                    onPageChange: (page) => setCurrentPage(page),
                    rowsPerPage: rowsPerPage,
                    onRowsPerPageChange: (rows) => {
                        setRowsPerPage(rows);
                        setCurrentPage(1); // Reset to first page when rows per page changes
                    }
                }}
            />
        </div>
    );
};

export default Team;
