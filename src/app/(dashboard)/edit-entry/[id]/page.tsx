"use client";

import {
  useSalonEntryQuery,
  useUpdateSalonEntryMutation,
} from "@/actions/salon-entry/useSalonEntry";
import {
  EditEntryForm,
  type SalonEntryFormValues,
} from "@/components/dashboard/entries/EditEntryForm";
import { useParams } from "next/navigation";

export default function EditEntryPage() {
  const { id } = useParams();
  const entryId = Array.isArray(id) ? id[0] : id;

  const { data: entry, isLoading } = useSalonEntryQuery(entryId ?? "");
  const { mutate: updateEntry, isPending } = useUpdateSalonEntryMutation();

  if (isLoading) return <div className='p-8'>Loading entry...</div>;
  if (!entry) return <div className='p-8 text-red-500'>Entry not found.</div>;

  const initialData = {
    employeeId: entry.employeeId,
    salonId: entry.salonId,
    serviceId: entry.serviceId,
    clientName: entry.clientName || "",
    totalPrice: entry.totalPrice,
    tips: entry.tips,
    addHair: entry.addHair,
    notes: entry.notes,
    isSplit: entry.isSplit,
    splits: entry.splits?.map((s: any) => ({
      employeeId: s.employeeId,
      totalPrice: s.totalPrice,
      tips: s.tips,
    })),
  };

  const initialDisplayData = {
    employeeName: entry.employeeName,
    salonName: entry.salonName,
    serviceName: entry.serviceName,
    splits: entry.splits?.map((s: any) => ({
      employeeId: s.employeeId,
      employeeName: s.employeeName,
      totalPrice: s.totalPrice,
      tips: s.tips,
    })),
  };

  const handleSubmit = (values: SalonEntryFormValues) => {
    updateEntry({ id: entryId ?? entry.id, data: values });
  };

  return (
    <EditEntryForm
      title='Edit Salon Entry'
      initialData={initialData}
      initialDisplayData={initialDisplayData}
      onSubmit={handleSubmit}
      isPending={isPending}
    />
  );
}
