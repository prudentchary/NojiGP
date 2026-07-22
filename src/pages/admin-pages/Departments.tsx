import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { TrendingUp, TrendingDown } from "lucide-react";

import { Table } from "@/components/ui";

interface Department {
  id: string;
  name: string;
  description: string;
  staffCount: number;
  avgRiskScore: number;
  trend: "up" | "down";
}

/* -------------------------------------------------------------------------- */
/*                               TEMP MOCK DATA                               */
/* -------------------------------------------------------------------------- */

const riskScores = [25, 42, 88, 67, 30, 91, 58, 18, 75, 35, 16, 80, 45, 60, 72, 90, 55, 20, 40, 70];

const mockDepartments: Department[] = Array.from({ length: 10 }).map((_, index) => ({
  id: `${index + 1}`,
  name: "Finance",
  description: "Oversees finance",
  staffCount: 50,
  avgRiskScore: riskScores[index],
  trend: index % 3 === 0 ? "down" : "up",
}));


const Departments = () => {
  const navigate = useNavigate();

  /* -------------------------------------------------------------------------- */
  /*                                   STATE                                    */
  /* -------------------------------------------------------------------------- */

  const [departments, setDepartments] = useState<Department[]>([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [totalPages, setTotalPages] = useState(1);

  /* -------------------------------------------------------------------------- */
  /*                             FETCH DEPARTMENTS                              */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setLoading(true);

    try {
      /**
       * API VERSION
       *
       * const res = await departmentService.getDepartments({
       *     page: currentPage,
       *     pageSize: rowsPerPage,
       *     search
       * });
       *
       * setDepartments(res.data);
       * setTotalPages(res.meta.totalPages);
       */

      // Temporary mock
      setDepartments(mockDepartments);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                               RISK DISPLAY                                 */
  /* -------------------------------------------------------------------------- */

  const getRisk = (score: number) => {
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
    },

    {
      header: "No of staff",
      key: "staffCount",
    },

    {
      header: "AVG risk score",
      key: "avgRiskScore",

      render: (department: Department) => {
        const risk = getRisk(department.avgRiskScore);

        return (
          <div className="flex items-center gap-2">
            <span className={risk.color}>{risk.label}</span>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${risk.border} ${risk.color}`}
            >
              {department.avgRiskScore}
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

  return (
    <div className="w-full">

      <Table
        columns={columns}
        data={departments}
        loading={loading}
        showSearch
        searchPlaceholder="Search department..."
        searchValue={search}
        onSearchChange={setSearch}
        onRowClick={(department) =>
          navigate(`/team/${department.name}`)
        }
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