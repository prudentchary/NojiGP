import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { TrendingUp, TrendingDown } from "lucide-react";

import { Table } from "@/components/ui";
import { useDepartments } from "@/hooks/useOrganization";
import { Department } from "@/types/organization";

const MOCK_DEPARTMENTS: Department[] = [
  {
    id: "1",
    name: "Engineering",
    description: "Core product development and security infrastructure",
    staffCount: 18,
    avgRiskScore: 32,
    trend: "down",
  },
  {
    id: "2",
    name: "Human Resources",
    description: "People operations and talent management",
    staffCount: 8,
    avgRiskScore: 12,
    trend: "down",
  },
  {
    id: "3",
    name: "Marketing",
    description: "Brand strategy and customer engagement",
    staffCount: 12,
    avgRiskScore: 45,
    trend: "up",
  },
  {
    id: "4",
    name: "Sales",
    description: "Revenue generation and customer relationship management",
    staffCount: 25,
    avgRiskScore: 60,
    trend: "down",
  },
  {
    id: "5",
    name: "Customer Support",
    description: "Customer service and support operations",
    staffCount: 15,
    avgRiskScore: 25,
    trend: "up",
  },
  {
    id: "6",
    name: "Finance",
    description: "Financial planning, analysis, and reporting",
    staffCount: 10,
    avgRiskScore: 35,
    trend: "down",
  }
];

/* -------------------------------------------------------------------------- */
/*                                RISK DISPLAY                                */
/* -------------------------------------------------------------------------- */

const getRisk = (score: number = 0) => {
  if (score <= 30)
    return {
      label: "Low",
      color: "text-emerald-500",
      border: "border-emerald-500",
    };

  if (score >= 80)
    return {
      label: "High",
      color: "text-rose-500",
      border: "border-rose-500",
    };

  return {
    label: "Med",
    color: "text-amber-500",
    border: "border-amber-500",
  };
};

const Departments = () => {
  const navigate = useNavigate();

  /* -------------------------------------------------------------------------- */
  /*                                   HOOKS                                    */
  /* -------------------------------------------------------------------------- */

  const { data: rawDepartments = [], isLoading, isError } = useDepartments();

  // Use API departments if present; otherwise fallback to MOCK_DEPARTMENTS
  const departmentsToDisplay = useMemo(() => {
    return rawDepartments.length > 0 ? rawDepartments : MOCK_DEPARTMENTS;
  }, [rawDepartments]);

  /* -------------------------------------------------------------------------- */
  /*                                   STATE                                    */
  /* -------------------------------------------------------------------------- */

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* -------------------------------------------------------------------------- */
  /*                             FILTER & PAGINATION                            */
  /* -------------------------------------------------------------------------- */

  // Filter departments based on search query
  const filteredDepartments = useMemo(() => {
    if (!search.trim()) return departmentsToDisplay;
    return departmentsToDisplay.filter(
      (dept) =>
        dept.name.toLowerCase().includes(search.toLowerCase()) ||
        dept.description?.toLowerCase().includes(search.toLowerCase())
    );
  }, [departmentsToDisplay, search]);

  // Compute total pages based on filtered records
  const totalPages = Math.ceil(filteredDepartments.length / rowsPerPage) || 1;

  // Paginate filtered departments
  const paginatedDepartments = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredDepartments.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredDepartments, currentPage, rowsPerPage]);

  /* -------------------------------------------------------------------------- */
  /*                                  COLUMNS                                   */
  /* -------------------------------------------------------------------------- */

  const columns = [
    {
      header: "Department",
      key: "name",
    },
    {
      header: "Description",
      key: "description",
      render: (department: Department) => department.description || "—",
    },
    {
      header: "No of staff",
      key: "staffCount",
      render: (department: Department) => department.staffCount ?? 0,
    },
    {
      header: "AVG risk score",
      key: "avgRiskScore",
      render: (department: Department) => {
        const score = department.avgRiskScore ?? 0;
        const risk = getRisk(score);

        return (
          <div className="flex items-center gap-2">
            <span className={risk.color}>{risk.label}</span>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${risk.border} ${risk.color}`}
            >
              {score}
            </span>
          </div>
        );
      },
    },
    {
      header: "Risk trend",
      key: "trend",
      render: (department: Department) =>
        department.trend === "up" ? (
          <TrendingUp className="size-4 text-emerald-500" />
        ) : (
          <TrendingDown className="size-4 text-rose-500" />
        ),
    },
  ];

  /* -------------------------------------------------------------------------- */

  if (isError) {
    return (
      <div className="w-full p-6 text-center text-rose-500 font-medium">
        Failed to load departments. Please try again.
      </div>
    );
  }

  return (
    <div className="w-full">
      <Table
        columns={columns}
        data={paginatedDepartments}
        loading={isLoading}
        showSearch
        searchPlaceholder="Search department..."
        searchValue={search}
        onSearchChange={(val) => {
          setSearch(val);
          setCurrentPage(1); // Reset to page 1 on search
        }}
        onRowClick={(department) => navigate(`/team/${department.id}`)}
        pagination={{
          currentPage,
          totalPages,
          onPageChange: setCurrentPage,
          rowsPerPage,
          onRowsPerPageChange: (rows) => {
            setRowsPerPage(rows);
            setCurrentPage(1);
          },
        }}
      />
    </div>
  );
};

export default Departments;