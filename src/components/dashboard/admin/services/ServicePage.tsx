"use client";

import React, { useEffect, useState } from "react";
import AllServices from "./AllService";
import ServiceFilter from "./ServiceFilter";
import {
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useServicesQuery,
  useUpdateServiceMutation,
} from "@/actions/admin/useServices";

const LIMIT = 5;

const ServicePage = () => {
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

  const { data, isLoading, isFetching } = useServicesQuery(params);
  const createMutation = useCreateServiceMutation();
  const updateMutation = useUpdateServiceMutation();
  const deleteMutation = useDeleteServiceMutation();

  const services = data?.data ?? [];
  const total = data?.meta?.total ?? 0;

  return (
    <div className='p-8 min-h-screen bg-[#FDF9F9]'>
      <ServiceFilter searchValue={searchInput} onSearchChange={setSearchInput} />

      <AllServices
        services={services}
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
        onUpdate={async (serviceId, payload) => {
          await updateMutation.mutateAsync({ serviceId, payload });
        }}
        onDelete={async (serviceId) => {
          await deleteMutation.mutateAsync(serviceId);
        }}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ServicePage;
