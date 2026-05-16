"use client";
import { useEffect, useMemo, useState } from "react";
import PayrollFilterBar from "./PayrollFilterBar";
import { PayrollTable } from "./PayrollTable";
import { useSalonsQuery } from "@/actions/admin/useSalons";
import { usePayrollQuery } from "@/actions/payroll/usePayroll";
import type { PayrollQueryParams } from "@/actions/payroll/payroll.types";
import PayrollCard from "./PayrollCard";

const PayrollPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [salonId, setSalonId] = useState("");

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
      salonId,
    }),
    [searchTerm, startDate, endDate, salonId],
  );

  const payrollQuery = usePayrollQuery(payrollParams);
  const salonsQuery = useSalonsQuery({
    page: 1,
    limit: 100,
    searchTerm: "",
  });

  const payrollData = useMemo(
    () => payrollQuery.data?.data || [],
    [payrollQuery.data?.data],
  );

  const salonOptions = useMemo(
    () =>
      (salonsQuery.data?.data || []).map((salon) => ({
        value: salon.id,
        label: salon.name,
      })),
    [salonsQuery.data],
  );

  const payrollSummary = useMemo(() => {
    return payrollData.reduce(
      (summary, row) => {
        summary.totalOccurrences += row.totalOccurrences;
        summary.totalIncome += row.totalIncome;
        summary.totalTips += row.totalTips;
        return summary;
      },
      {
        totalGroups: payrollData.length,
        totalOccurrences: 0,
        totalIncome: 0,
        totalTips: 0,
      },
    );
  }, [payrollData]);

  const isLoading = payrollQuery.isLoading || payrollQuery.isFetching;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(value);

  const hasActiveFilters = Boolean(
    searchInput.trim() || startDate || endDate || salonId,
  );

  const resetFilters = () => {
    setSearchInput("");
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    setSalonId("");
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
        salonId={salonId}
        salons={salonOptions}
        isSalonLoading={salonsQuery.isLoading}
        onSearchTermChange={setSearchInput}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onSalonChange={(value) => setSalonId(value ?? "")}
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
          isLoading={isLoading || salonsQuery.isLoading}
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
          isLoading={isLoading || salonsQuery.isLoading}
        />
      </div>
    </div>
  );
};

export default PayrollPage;
