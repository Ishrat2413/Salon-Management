"use client";
import { useEffect, useMemo, useState } from "react";
import PayrollFilterBar from "./PayrollFilterBar";
import { PayrollTable } from "./PayrollTable";
import { useUsersQuery } from "@/actions/admin/useUsers";
import { usePayrollQuery } from "@/actions/payroll/usePayroll";
import type { PayrollQueryParams } from "@/actions/payroll/payroll.types";
import PayrollCard from "./PayrollCard";

const PayrollPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setSearchTerm(searchInput.trim());
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [searchInput]);

  const payrollParams = useMemo<PayrollQueryParams>(
    () => ({
      searchTerm,
      startDate,
      endDate,
      employeeId,
    }),
    [searchTerm, startDate, endDate, employeeId],
  );

  const payrollQuery = usePayrollQuery(payrollParams);
  const usersQuery = useUsersQuery({
    page: 1,
    limit: 100,
    searchTerm: "",
    role: "EMPLOYEE,MANAGER",
  });

  const payrollData = useMemo(
    () => payrollQuery.data?.data || [],
    [payrollQuery.data?.data],
  );

  const employeeOptions = useMemo(
    () =>
      (usersQuery.data?.data || []).map((emp: any) => ({
        value: emp.id,
        label: emp.fullName,
      })),
    [usersQuery.data],
  );

  const payrollSummary = useMemo(() => {
    return payrollData.reduce(
      (summary, row) => {
        summary.totalOccurrences += row.totalOccurrences;
        summary.totalEarnings += row.earnings;
        summary.totalTips += row.totalTips;
        return summary;
      },
      {
        totalGroups: payrollData.length,
        totalOccurrences: 0,
        totalEarnings: 0,
        totalTips: 0,
      },
    );
  }, [payrollData]);

  const isLoading = payrollQuery.isLoading || payrollQuery.isFetching;

  const hasActiveFilters = Boolean(
    searchInput.trim() || startDate || endDate || employeeId,
  );

  const resetFilters = () => {
    setSearchInput("");
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    setEmployeeId("");
  };

  const payrollErrorMessage =
    (payrollQuery.error as any)?.response?.data?.message ||
    "Failed to load payroll data.";

  return (
    <div className='w-full space-y-6'>
      <PayrollFilterBar
        searchTerm={searchInput}
        startDate={startDate}
        endDate={endDate}
        employeeId={employeeId}
        employees={employeeOptions}
        isEmployeeLoading={usersQuery.isLoading}
        onSearchTermChange={setSearchInput}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onEmployeeChange={(value) => setEmployeeId(value ?? "")}
        onReset={resetFilters}
      />

      {payrollQuery.isError ? (
        <div className='rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700'>
          <p className='font-semibold'>Payroll data could not be loaded.</p>
          <p className='mt-1'>{payrollErrorMessage}</p>
          <button
            type='button'
            onClick={() => payrollQuery.refetch()}
            className='mt-3 rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700'>
            Retry
          </button>
        </div>
      ) : (
        <PayrollTable
          data={payrollData}
          isLoading={isLoading || usersQuery.isLoading}
          emptyMessage={
            hasActiveFilters
              ? "No payroll entries match the current filters."
              : "No payroll entries available."
          }
        />
      )}

      <div>
        <PayrollCard
          summary={payrollSummary}
          isLoading={isLoading || usersQuery.isLoading}
        />
      </div>
    </div>
  );
};

export default PayrollPage;
