"use client";

import { useCreateSalonEntryMutation } from "@/actions/salon-entry/useSalonEntry";
import SalonEntryForm, { SalonEntryFormValues } from "./SalonEntryForm";

export default function AddEntryPage() {
  const { mutate: createEntry, isPending } = useCreateSalonEntryMutation();

  const handleSubmit = (values: SalonEntryFormValues) => {
    createEntry(values);
  };

  return (
    <SalonEntryForm
      title="Add New Entry"
      onSubmit={handleSubmit}
      isPending={isPending}
      submitButtonText="Save Entry"
    />
  );
}
