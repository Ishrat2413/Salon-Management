"use client";

import { useUpdateUserStatusMutation } from "@/actions/admin/useUsers";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface StatusEditModalProps {
  user: { id: string; status: string };
  isOpen: boolean;
  onClose: () => void;
}

export function StatusEditModal({
  user,
  isOpen,
  onClose,
}: StatusEditModalProps) {
  const [status, setStatus] = useState(user.status);
  const { mutate: updateStatus, isPending } = useUpdateUserStatusMutation();

  const handleUpdate = () => {
    updateStatus({ userId: user.id, status }, { onSuccess: onClose });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update User Status</DialogTitle>
        </DialogHeader>
        <Select
          value={status}
          onValueChange={(value) => setStatus(value ?? status)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='ACTIVE'>ACTIVE</SelectItem>
            <SelectItem value='INACTIVE'>INACTIVE</SelectItem>
            <SelectItem value='PENDING'>PENDING</SelectItem>
          </SelectContent>
        </Select>
        <div className='flex justify-end gap-2 mt-4'>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={isPending}>
            {isPending ? "Updating..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
