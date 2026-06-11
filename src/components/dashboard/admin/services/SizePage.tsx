"use client";

import React, { useEffect, useState } from "react";
import AllSizes from "./AllSize";
import SizeFilter from "./SizeFilter";
import {
  useCreateSizeMutation,
  useDeleteSizeMutation,
  useSizesQuery,
  useUpdateSizeMutation,
} from "@/actions/admin/useSizes";

const LIMIT = 5;

const SizePage = () => {
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

  const { data, isLoading, isFetching } = useSizesQuery(params);
  const createMutation = useCreateSizeMutation();
  const updateMutation = useUpdateSizeMutation();
  const deleteMutation = useDeleteSizeMutation();

  const sizes = data?.data ?? [];
  const total = data?.meta?.total ?? 0;

  return (
    <div className='p-4 md:p-8 min-h-screen bg-[#FDF9F9]'>
      <SizeFilter
        searchValue={searchInput}
        onSearchChange={setSearchInput}
      />

      <AllSizes
        sizes={sizes}
        total={total}
        page={page}
        limit={LIMIT}
        isLoading={isLoading || isFetching}
        isMutating={
          createMutation.isPending ||
          updateMutation.isPending ||
          deleteMutation.isPending
        }
        onCreate={async (payload) => {
          await createMutation.mutateAsync(payload);
        }}
        onUpdate={async (sizeId, payload) => {
          await updateMutation.mutateAsync({ sizeId, payload });
        }}
        onDelete={async (sizeId) => {
          await deleteMutation.mutateAsync(sizeId);
        }}
        onPageChange={setPage}
      />
    </div>
  );
};

export default SizePage;
