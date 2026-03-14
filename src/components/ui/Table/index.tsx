import React from "react";
import { cn } from "@/lib/cn";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

interface Column<T> {
    header: string;
    key: keyof T | string;
    render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    onRowClick?: (item: T) => void;
    showSearch?: boolean;
    searchPlaceholder?: string;
    pagination?: {
        currentPage: number;
        totalPages: number;
        onPageChange: (page: number) => void;
        rowsPerPage: number;
        onRowsPerPageChange: (rows: number) => void;
    };
}

export function Table<T>({
    columns,
    data,
    onRowClick,
    showSearch = true,
    searchPlaceholder = "Search",
    pagination,
}: TableProps<T>) {
    return (
        <div className="w-full flex flex-col gap-4">
            {showSearch && (
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        className="w-full h-11 pl-12 pr-4 bg-slate-50/50 border border-slate-100 rounded-lg text-[15px] focus:outline-none focus:ring-2 focus:ring-slate-200/50 transition-all dark:bg-slate-800/50 dark:border-slate-700 dark:text-white"
                    />
                </div>
            )}

            <div className="w-full overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                            {columns.map((column, idx) => (
                                <th
                                    key={idx}
                                    className="px-6 py-4 text-[13px] font-bold text-slate-500 uppercase tracking-wider dark:text-slate-400"
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                        {data.map((item, rowIdx) => (
                            <tr
                                key={rowIdx}
                                onClick={() => onRowClick?.(item)}
                                className={cn(
                                    "group transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30",
                                    onRowClick && "cursor-pointer"
                                )}
                            >
                                {columns.map((column, colIdx) => (
                                    <td key={colIdx} className="px-6 py-4 text-[15px] text-slate-700 dark:text-slate-300">
                                        {column.render ? column.render(item) : (item[column.key as keyof T] as React.ReactNode)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {pagination && (
                <div className="flex items-center justify-between px-2 py-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-400">Page:</span>
                        <div className="px-3 py-1.5 bg-slate-50 rounded border border-slate-100 text-sm font-bold text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                            {pagination.currentPage}/{pagination.totalPages}
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-semibold text-slate-400">Rows per page:</span>
                            <div className="relative group/select">
                                <select
                                    value={pagination.rowsPerPage}
                                    onChange={(e) => pagination.onRowsPerPageChange(Number(e.target.value))}
                                    className="appearance-none flex items-center gap-1 px-3 py-1.5 pr-8 bg-slate-50 rounded border border-slate-100 text-sm font-bold text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-white cursor-pointer hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200"
                                >
                                    {[5, 10, 15, 20, 30, 50, 60, 100, 500].map((size) => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </select>
                                <ChevronRight className="rotate-90 size-4 absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => pagination.onPageChange(Math.max(1, pagination.currentPage - 1))}
                                disabled={pagination.currentPage === 1}
                                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="size-5" />
                            </button>
                            <button
                                onClick={() => pagination.onPageChange(Math.min(pagination.totalPages, pagination.currentPage + 1))}
                                disabled={pagination.currentPage === pagination.totalPages}
                                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <ChevronRight className="size-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
