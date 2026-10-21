import React, { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { MoreHorizontal } from "lucide-react";

import { Table } from "@/components/ui";
import { cn } from "@/lib/cn";
import { useDepartmentUsers } from "@/hooks/useOrganization";
import { Staff, User } from "@/types/organization";

/* -------------------------------------------------------------------------- */
/*                                 MOCK DATA                                  */
/* -------------------------------------------------------------------------- */

const MOCK_STAFF: Staff[] = Array.from({ length: 10 }).map((_, idx) => ({
  id: `${idx + 1}`,
  name: "Kate Hunington",
  role: "Financial officer",
  department: "Finance",
  riskLevel: idx < 2 ? "High" : idx < 5 ? "Med" : "Low",
  scrs: 89 - idx * 5,
  incidents: idx < 2 ? 3 : idx < 3 ? 1 : 0,
  lastActive: "12 Jan 2023, 12:00am",
  avatar: "https://i.pravatar.cc/150?u=kate",
}));

const DepartmentMembers: React.FC = () => {
  const navigate = useNavigate();
  const { departmentId } = useParams();

  /* -------------------------------------------------------------------------- */
  /*                                   HOOKS                                    */
  /* -------------------------------------------------------------------------- */

  const {
    data: apiUsers = [],
    isLoading,
    isError,
  } = useDepartmentUsers(departmentId);

  /* -------------------------------------------------------------------------- */
  /*                            DATA TRANSFORM & FALLBACK                        */
  /* -------------------------------------------------------------------------- */

  // Safely map API User[] records into Staff[] format, defaulting to MOCK_STAFF if empty
  const membersToDisplay = useMemo((): Staff[] => {
    if (!apiUsers || apiUsers.length === 0) {
      return MOCK_STAFF;
    }

    return apiUsers.map((user: User, idx: number) => ({
      id: user.id || `${idx + 1}`,
      name:
        user.name ||
        `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
        "Unknown Staff",
      role: user.role || "Staff Member",
      department: user.department || "General",
      riskLevel: user.riskLevel || "Low",
      scrs: user.scrs ?? 0,
      incidents: user.incidents ?? 0,
      lastActive: user.lastActive || "—",
      avatar: user.avatar || `https://i.pravatar.cc/150?u=${user.id}`,
    }));
  }, [apiUsers]);

  /* -------------------------------------------------------------------------- */
  /*                                   STATE                                    */
  /* -------------------------------------------------------------------------- */

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* -------------------------------------------------------------------------- */
  /*                             FILTER & PAGINATION                            */
  /* -------------------------------------------------------------------------- */

  const filteredMembers = useMemo(() => {
    if (!search.trim()) return membersToDisplay;
    return membersToDisplay.filter(
      (staff) =>
        staff.name.toLowerCase().includes(search.toLowerCase()) ||
        staff.role?.toLowerCase().includes(search.toLowerCase()) ||
        staff.department?.toLowerCase().includes(search.toLowerCase())
    );
  }, [membersToDisplay, search]);

  const totalPages = Math.ceil(filteredMembers.length / rowsPerPage) || 1;

  const paginatedMembers = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredMembers.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredMembers, currentPage, rowsPerPage]);

  /* -------------------------------------------------------------------------- */
  /*                                  COLUMNS                                   */
  /* -------------------------------------------------------------------------- */

  const columns = [
    {
      header: "Staff",
      key: "name",
      render: (staff: Staff) => (
        <div className="flex items-center gap-3">
          <img
            src={staff.avatar}
            alt=""
            className="size-10 rounded-full object-cover border border-slate-100"
          />
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 leading-tight dark:text-slate-300">
              {staff.name}
            </span>
            <span className="text-[13px] text-slate-400 font-medium">
              {staff.role}
            </span>
          </div>
        </div>
      ),
    },
    { header: "Department", key: "department" },
    {
      header: "Risk score",
      key: "riskLevel",
      render: (staff: Staff) => (
        <span
          className={cn(
            "font-bold text-[14px]",
            staff.riskLevel === "High"
              ? "text-rose-500"
              : staff.riskLevel === "Med"
                ? "text-amber-500"
                : "text-emerald-500"
          )}
        >
          {staff.riskLevel}
        </span>
      ),
    },
    {
      header: "SCRS",
      key: "scrs",
      render: (staff: Staff) => (
        <span className="font-bold text-slate-700">{staff.scrs}</span>
      ),
    },
    {
      header: "Incidents",
      key: "incidents",
      render: (staff: Staff) => (
        <span className="font-bold text-slate-700">{staff.incidents}</span>
      ),
    },
    {
      header: "Last active",
      key: "lastActive",
      render: (staff: Staff) => (
        <span className="font-bold text-slate-700">{staff.lastActive}</span>
      ),
    },
    {
      header: "Actions",
      key: "actions",
      render: () => (
        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <MoreHorizontal className="size-5" />
        </button>
      ),
    },
  ];

  /* -------------------------------------------------------------------------- */

  if (isError) {
    return (
      <div className="w-full p-6 text-center text-rose-500 font-medium">
        Failed to load department members. Please try again.
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <Table
        columns={columns}
        data={paginatedMembers}
        loading={isLoading}
        showSearch
        searchPlaceholder="Search staff..."
        searchValue={search}
        onSearchChange={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        onRowClick={(staff) => navigate(`/team/${departmentId}/${staff.id}`)}
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

export default DepartmentMembers;