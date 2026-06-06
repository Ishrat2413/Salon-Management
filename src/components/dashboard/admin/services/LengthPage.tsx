"use client";

import React, { useEffect, useState } from "react";
import AllLengths from "./AllLength";
import LengthFilter from "./LengthFilter";
import {
  useCreateLengthMutation,
  useDeleteLengthMutation,
  useLengthsQuery,
  useUpdateLengthMutation,
} from "@/actions/admin/useLengths";

const LIMIT = 5;

const LengthPage = () => {
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

  const { data, isLoading, isFetching } = useLengthsQuery(params);
  const createMutation = useCreateLengthMutation();
  const updateMutation = useUpdateLengthMutation();
  const deleteMutation = useDeleteLengthMutation();

  const lengths = data?.data ?? [];
  const total = data?.meta?.total ?? 0;

  return (
    <div className='p-4 md:p-8 min-h-screen bg-[#FDF9F9]'>
      <LengthFilter
        searchValue={searchInput}
        onSearchChange={setSearchInput}
      />

      <AllLengths
        lengths={lengths}
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
        onUpdate={async (lengthId, payload) => {
          await updateMutation.mutateAsync({ lengthId, payload });
        }}
        onDelete={async (lengthId) => {
          await deleteMutation.mutateAsync(lengthId);
        }}
        onPageChange={setPage}
      />
    </div>
  );
};

export default LengthPage;
