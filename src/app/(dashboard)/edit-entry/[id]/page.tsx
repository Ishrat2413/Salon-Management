"use client";

import {
  useSalonEntryQuery,
  useUpdateSalonEntryMutation,
} from "@/actions/salon-entry/useSalonEntry";
import SalonEntryForm, { SalonEntryFormValues } from "@/components/dashboard/common/SalonEntryForm";
import { useParams } from "next/navigation";

export default function EditEntryPage() {
  const { id } = useParams();
  const entryId = Array.isArray(id) ? id[0] : id;

  const { data: entry, isLoading } = useSalonEntryQuery(entryId ?? "");
  const { mutate: updateEntry, isPending } = useUpdateSalonEntryMutation();

  if (isLoading) return <div className='p-8 flex justify-center items-center h-[50vh]'>Loading entry...</div>;
  if (!entry) return <div className='p-8 text-red-500'>Entry not found.</div>;

  const initialData: Partial<SalonEntryFormValues> = {
    employeeId: entry.employeeId,
    salonId: entry.salonId,
    serviceId: entry.serviceId,
    clientName: entry.clientName || "",
    totalPrice: entry.totalPrice,
    tips: entry.tips,
    addHair: entry.addHair,
    notes: entry.notes || "",
    isSplit: entry.isSplit,
    createdAt: entry.createdAt,
    splits: (entry as any).splits?.map((s: any) => ({
      employeeId: s.employeeId,
      totalPrice: s.totalPrice,
      tips: s.tips,
    })),
  };

  const handleSubmit = (values: SalonEntryFormValues) => {
    updateEntry({ id: entryId ?? entry.id, data: values });
  };

  return (
    <SalonEntryForm
      title='Edit Salon Entry'
      initialData={initialData}
      onSubmit={handleSubmit}
      isPending={isPending}
      submitButtonText="Update Entry"
    />
  );
}
