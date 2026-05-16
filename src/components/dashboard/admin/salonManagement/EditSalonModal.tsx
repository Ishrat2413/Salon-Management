"use client";

import React from "react";
import { AddSalonModal } from "./AddSalonModal";

interface EditSalonModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: { name: string; address: string; managerId?: string; managerIds?: string[] };
  onSave: (payload: { name: string; address: string; managerId?: string; managerIds?: string[] }) => Promise<void> | void;
  isSubmitting?: boolean;
}

export function EditSalonModal({
  isOpen,
  onClose,
  initialData,
  onSave,
  isSubmitting = false,
}: EditSalonModalProps) {
  return (
    <AddSalonModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSave}
      mode='edit'
      initialData={initialData}
      isSubmitting={isSubmitting}
    />
  );
}
