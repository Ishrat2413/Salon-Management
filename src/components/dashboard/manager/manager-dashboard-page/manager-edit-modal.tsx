"use client";

import { useUpdateSalonEntryMutation } from "@/actions/salon-entry/useSalonEntry";
import type { SalonEntry } from "@/actions/salon-entry/salon-entry.types";
import { BaseModal } from "@/components/ui/BaseModal";
import SalonEntryForm, {
  type SalonEntryFormValues,
} from "@/components/dashboard/common/SalonEntryForm";

type ManagerEditModalProps = {
  open: boolean;
  onClose: () => void;
  row: SalonEntry | null;
  mode?: "edit" | "approve";
  onSaved?: (values: SalonEntryFormValues) => void;
};

export function ManagerEditModal({
  open,
  onClose,
  row,
  mode = "edit",
  onSaved,
}: ManagerEditModalProps) {
  const { mutate: updateEntry, isPending } = useUpdateSalonEntryMutation();

  if (!open || !row) return null;

  const initialData: Partial<SalonEntryFormValues> = {
    employeeId: row.employeeId,
    salonId: row.salonId,
    serviceId: row.serviceId,
    clientName: row.clientName || "",
    totalPrice: row.totalPrice,
    tips: row.tips ?? undefined,
    addHair: row.addHair ?? undefined,
    notes: row.notes || "",
    isSplit: row.isSplit,
    createdAt: row.createdAt,
    splits: row.splits?.map((split) => ({
      employeeId: split.employeeId,
      totalPrice: split.totalPrice,
      tips: split.tips ?? undefined,
    })),
  };

  const handleSubmit = (values: SalonEntryFormValues) => {
    updateEntry(
      { id: row.id, data: values },
      {
        onSuccess: () => {
          onClose();
          onSaved?.(values);
        },
      },
    );
  };

  return (
    <BaseModal
      isOpen={open}
      onClose={onClose}
      title={mode === "approve" ? "Review Entry" : "Edit Entry"}>
      <SalonEntryForm
        title={mode === "approve" ? "Review Entry" : "Edit Salon Entry"}
        initialData={initialData}
        onSubmit={handleSubmit}
        isPending={isPending}
        submitButtonText={mode === "approve" ? "Next" : "Save Changes"}
        variant='modal'
        onCancel={onClose}
      />
    </BaseModal>
  );
}
