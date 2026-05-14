"use client";

import React, { useEffect, useState } from "react";
import { SalonTable } from "./SalonTable";
import SalonSearchFilter from "./SalonSearch";
import {
  useCreateSalonMutation,
  useDeleteSalonMutation,
  useSalonsQuery,
  useUpdateSalonMutation,
} from "@/actions/admin/useSalons";

const LIMIT = 10;

const SalonManagementPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchTerm(searchInput.trim());
      setPage(1);
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  const params = {
    page,
    limit: LIMIT,
    searchTerm,
  };

  const { data, isLoading, isFetching } = useSalonsQuery(params);
  const createMutation = useCreateSalonMutation();
  const updateMutation = useUpdateSalonMutation();
  const deleteMutation = useDeleteSalonMutation();

  const salons = data?.data ?? [];
  const total = data?.meta?.total ?? 0;

  return (
    <div className='p-8 min-h-screen bg-[#FDF9F9]'>
      <SalonSearchFilter searchValue={searchInput} onSearchChange={setSearchInput} />
      <SalonTable
        data={salons}
        total={total}
        page={page}
        limit={LIMIT}
        isLoading={isLoading || isFetching}
        isMutating={
          createMutation.isPending || updateMutation.isPending || deleteMutation.isPending
        }
        onCreate={async (payload) => {
          await createMutation.mutateAsync(payload);
        }}
        onUpdate={async (salonId, payload) => {
          await updateMutation.mutateAsync({ salonId, payload });
        }}
        onDelete={async (salonId) => {
          await deleteMutation.mutateAsync(salonId);
        }}
        onPageChange={setPage}
      />
    </div>
  );
};

export default SalonManagementPage;
