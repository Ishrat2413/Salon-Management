"use client";

import {
  useUpdateUserStatusMutation,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useUpdateCommissionRateMutation,
} from "@/actions/admin/useUsers";
import { ColumnDef } from "@/components/univarsalTable/UnivarsalTable.type";
import UniversalTable from "@/components/univarsalTable/Universaltable";
import { BaseModal } from "@/components/ui/BaseModal";
import { Trash2, Edit2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { CSSProperties } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export type User = {
  id: string | number;
  fullName: string;
  role: "ADMIN" | "MANAGER" | "EMPLOYEE" | string;
  salonId: string | null;
  salonName: string;
  email: string;
  status: "PENDING" | "ACTIVE" | "SUSPEND" | "REJECTED";
  commissionRate: number | null;
};

// Role badge color custom define for each role
const roleBadgeStyle: Record<string, CSSProperties> = {
  ADMIN: {
    background: "#ffe8f5",
    color: "#c0186b",
    borderRadius: 6,
    padding: "4px 10px",
    fontSize: 12,
    fontWeight: 600,
  },
  MANAGER: {
    background: "#e8f0ff",
    color: "#2655c0",
    borderRadius: 6,
    padding: "4px 10px",
    fontSize: 12,
    fontWeight: 600,
  },
  EMPLOYEE: {
    background: "#f2f2f2",
    color: "#555",
    borderRadius: 6,
    padding: "4px 10px",
    fontSize: 12,
    fontWeight: 500,
  },
};

const statusStyleMap: Record<
  User["status"],
  { label: string; background: string; color: string; dot: string }
> = {
  PENDING: {
    label: "Pending",
    background: "#fef9c3",
    color: "#92400e",
    dot: "#d97706",
  },
  ACTIVE: {
    label: "Active",
    background: "#dcfce7",
    color: "#166534",
    dot: "#16a34a",
  },
  SUSPEND: {
    label: "Suspend",
    background: "#ffedd5",
    color: "#c2410c",
    dot: "#f97316",
  },
  REJECTED: {
    label: "Rejected",
    background: "#fee2e2",
    color: "#b91c1c",
    dot: "#ef4444",
  },
};

type StatusOption = {
  label: string;
  value: User["status"];
};

const getStatusOptions = (status: User["status"]): StatusOption[] => {
  if (status === "ACTIVE") {
    return [
      { label: "Active", value: "ACTIVE" },
      { label: "Suspend", value: "SUSPEND" },
    ];
  }
  if (status === "PENDING") {
    return [
      { label: "Pending", value: "PENDING" },
      { label: "Active", value: "ACTIVE" },
      { label: "Reject", value: "REJECTED" },
    ];
  }
  if (status === "SUSPEND") {
    return [
      { label: "Suspend", value: "SUSPEND" },
      { label: "Active", value: "ACTIVE" },
    ];
  }
  return [{ label: status, value: status }];
};

type StatusDropdownProps = {
  userId: string | number;
  status: User["status"];
  onStatusChange: (
    userId: string | number,
    newStatus: User["status"],
  ) => Promise<void>;
};

function StatusDropdown({
  userId,
  status,
  onStatusChange,
}: StatusDropdownProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const wrapperRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const options = getStatusOptions(status);
  const currentStyle = statusStyleMap[status];

  const handleToggle = () => {
    if (!open && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    const handleScroll = (e: Event) => {
      if (
        dropdownRef.current &&
        dropdownRef.current.contains(e.target as Node)
      ) {
        return;
      }
      if (open) setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    if (open) {
      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", () => setOpen(false));
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", () => setOpen(false));
    };
  }, [open]);

  return (
    <>
      <button
        ref={wrapperRef}
        type='button'
        onClick={handleToggle}
        className='inline-flex items-center justify-between gap-2 rounded-md border border-gray-300 bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-800 shadow-sm transition hover:bg-gray-200'
        style={{ minWidth: 118 }}>
        <span className='inline-flex items-center gap-2'>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: currentStyle.dot,
            }}
          />
          <span style={{ color: currentStyle.color }}>
            {currentStyle.label}
          </span>
        </span>
        <span aria-hidden className='text-xs text-gray-500'>
          ▾
        </span>
      </button>

      {open && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={dropdownRef}
              className='absolute z-9999 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg'
              style={{
                top: coords.top,
                left: coords.left,
                minWidth: Math.max(160, coords.width),
              }}>
              {options.map((option) => {
                const optionStyle = statusStyleMap[option.value];
                return (
                  <button
                    key={option.value}
                    type='button'
                    onClick={async () => {
                      setOpen(false);
                      await onStatusChange(userId, option.value);
                    }}
                    className='flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition hover:bg-gray-50'
                    style={{ color: optionStyle.color }}>
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 999,
                        background: optionStyle.dot,
                      }}
                    />
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

type RoleDropdownProps = {
  userId: string | number;
  role: string;
  onRoleChange: (userId: string | number, newRole: string) => Promise<void>;
};

function RoleDropdown({ userId, role, onRoleChange }: RoleDropdownProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const wrapperRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const roles = [
    { label: "ADMIN", value: "ADMIN" },
    { label: "MANAGER", value: "MANAGER" },
    { label: "EMPLOYEE", value: "EMPLOYEE" },
  ];

  const handleToggle = () => {
    if (!open && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    const handleScroll = (e: Event) => {
      if (
        dropdownRef.current &&
        dropdownRef.current.contains(e.target as Node)
      ) {
        return;
      }
      if (open) setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    if (open) {
      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", () => setOpen(false));
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", () => setOpen(false));
    };
  }, [open]);

  return (
    <>
      <button
        ref={wrapperRef}
        type='button'
        onClick={handleToggle}
        className='inline-flex items-center justify-between gap-1 transition hover:opacity-80'
        style={{
          ...roleBadgeStyle[role as keyof typeof roleBadgeStyle],
          cursor: "pointer",
        }}>
        <span>{role}</span>
        <span aria-hidden className='text-xs opacity-70'>
          ▾
        </span>
      </button>

      {open && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={dropdownRef}
              className='absolute z-9999 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg p-1 flex flex-col gap-1'
              style={{
                top: coords.top,
                left: coords.left,
                minWidth: Math.max(128, coords.width),
              }}>
              {roles.map((option) => (
                <button
                  key={option.value}
                  type='button'
                  onClick={async () => {
                    setOpen(false);
                    if (option.value !== role) {
                      await onRoleChange(userId, option.value);
                    }
                  }}
                  className='w-full text-left transition hover:opacity-80'
                  style={{
                    ...roleBadgeStyle[
                      option.value as keyof typeof roleBadgeStyle
                    ],
                    display: "block",
                  }}>
                  {option.label}
                </button>
              ))}
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

interface UsersTableProps {
  data: User[];
}

export function UsersTable({ data }: UsersTableProps) {
  const { mutateAsync: updateStatus, isPending: isUpdatingStatus } =
    useUpdateUserStatusMutation();
  const { mutateAsync: updateRole } = useUpdateUserRoleMutation();
  const { mutateAsync: deleteUser, isPending: isDeleting } =
    useDeleteUserMutation();
  const { mutateAsync: updateCommission, isPending: isUpdatingCommission } =
    useUpdateCommissionRateMutation();

  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [userToApprove, setUserToApprove] = useState<{
    userId: string | number;
    newStatus: User["status"];
  } | null>(null);
  const [userToEditCommission, setUserToEditCommission] = useState<User | null>(
    null,
  );
  const [commissionRate, setCommissionRate] = useState<string>("");

  const handleStatusChange = useCallback(
    async (userId: string | number, newStatus: User["status"]) => {
      const user = data.find((u) => String(u.id) === String(userId));

      // If changing to ACTIVE and user is EMPLOYEE or MANAGER, show commission modal
      if (
        newStatus === "ACTIVE" &&
        user &&
        (user.role === "EMPLOYEE" || user.role === "MANAGER")
      ) {
        setUserToApprove({ userId, newStatus });
        setCommissionRate(
          user.commissionRate ? String(user.commissionRate) : "",
        );
        return;
      }

      try {
        await updateStatus({ userId: String(userId), status: newStatus });
      } catch (error) {
        console.error(`Failed to update user ${userId} status:`, error);
      }
    },
    [updateStatus, data],
  );

  const handleApproveConfirm = async () => {
    if (!userToApprove) return;
    try {
      const rate = commissionRate ? Number(commissionRate) : undefined;
      await updateStatus({
        userId: String(userToApprove.userId),
        status: userToApprove.newStatus,
        commissionRate: rate,
      });
      setUserToApprove(null);
      setCommissionRate("");
    } catch (error) {
      console.error(`Failed to approve user:`, error);
    }
  };

  const handleCommissionUpdate = async () => {
    if (!userToEditCommission) return;
    if (!commissionRate) {
      toast.error("Please enter a commission rate.");
      return;
    }
    try {
      await updateCommission({
        userId: String(userToEditCommission.id),
        commissionRate: Number(commissionRate),
      });
      setUserToEditCommission(null);
      setCommissionRate("");
    } catch (error) {
      console.error(`Failed to update commission:`, error);
    }
  };

  const handleRoleChange = useCallback(
    async (userId: string | number, newRole: string) => {
      try {
        await updateRole({ userId: String(userId), role: newRole });
      } catch (error) {
        console.error(`Failed to update user ${userId} role:`, error);
      }
    },
    [updateRole],
  );

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
    try {
      await deleteUser(String(userToDelete.id));
      setUserToDelete(null);
    } catch (error) {
      console.error(`Failed to delete user ${userToDelete.id}:`, error);
      setUserToDelete(null);
    }
  };

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        key: "fullName",
        header: "Name",
      },
      {
        key: "email",
        header: "Email",
      },
      {
        key: "role",
        header: "Role",
        render: (value, row) => (
          <RoleDropdown
            userId={row.id}
            role={String(value)}
            onRoleChange={handleRoleChange}
          />
        ),
      },
      {
        key: "salonName",
        header: "Salon",
      },
      {
        key: "commissionRate",
        header: "Commission Rate",
        render: (value, row) => {
          if (row.role === "ADMIN")
            return <span className='text-gray-400'>N/A</span>;
          return (
            <div className='flex items-center gap-2 group'>
              <span
                className={
                  value ? "font-medium text-gray-900" : "text-gray-400"
                }>
                {value !== null ? `${value}%` : "Not Set"}
              </span>
              <button
                onClick={() => {
                  setUserToEditCommission(row);
                  setCommissionRate(
                    row.commissionRate ? String(row.commissionRate) : "",
                  );
                }}
                className='p-1 text-gray-400 hover:text-pink-600 transition-colors opacity-0 group-hover:opacity-100'
                title='Edit Commission'>
                <Edit2 size={14} />
              </button>
            </div>
          );
        },
      },
      {
        key: "status",
        header: "Status",
        render: (value, row: User) => (
          <StatusDropdown
            userId={row.id}
            status={value as User["status"]}
            onStatusChange={handleStatusChange}
          />
        ),
      },
      {
        key: "actions" as any, // Pseudo key for actions
        header: "Actions",
        render: (_, row: User) => (
          <button
            onClick={() => setUserToDelete(row)}
            className='p-2 text-gray-400 hover:text-red-600 transition-colors rounded-full hover:bg-red-50'
            title='Delete User'>
            <Trash2 size={18} />
          </button>
        ),
      },
    ],
    [handleRoleChange, handleStatusChange],
  );

  return (
    <>
      <UniversalTable<User>
        title={`All Users (${data.length})`}
        data={data}
        columns={columns}
        pageSize={10}
      />

      {/* Delete User Modal */}
      <BaseModal
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        title='Delete User'>
        <div className='space-y-4'>
          <p className='text-gray-600'>
            Are you sure you want to delete user{" "}
            <span className='font-semibold text-gray-900'>
              {userToDelete?.fullName}
            </span>
            ? This action cannot be undone.
          </p>
          <div className='flex justify-end gap-3 pt-4 border-t border-gray-100'>
            <button
              onClick={() => setUserToDelete(null)}
              className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors'
              disabled={isDeleting}>
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className='px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors flex items-center gap-2'>
              {isDeleting ? "Deleting..." : "Delete User"}
            </button>
          </div>
        </div>
      </BaseModal>

      {/* Approval Modal */}
      <BaseModal
        isOpen={!!userToApprove}
        onClose={() => setUserToApprove(null)}
        title='Approve User'>
        <div className='space-y-4'>
          <p className='text-gray-600'>
            Set a commission rate for this user (Optional).
          </p>
          <div className='space-y-2'>
            <label className='text-sm font-semibold text-gray-700'>
              Commission Rate (%)
            </label>
            <Input
              type='number'
              value={commissionRate}
              onChange={(e) => setCommissionRate(e.target.value)}
              placeholder='e.g. 60'
              min='0'
              max='100'
            />
          </div>
          <div className='flex justify-end gap-3 pt-4 border-t border-gray-100'>
            <Button
              variant='ghost'
              onClick={() => setUserToApprove(null)}
              disabled={isUpdatingStatus}>
              Cancel
            </Button>
            <Button
              className='bg-pink-600 hover:bg-pink-700 text-white'
              onClick={handleApproveConfirm}
              disabled={isUpdatingStatus}>
              {isUpdatingStatus ? "Approving..." : "Approve & Set Rate"}
            </Button>
          </div>
        </div>
      </BaseModal>

      {/* Edit Commission Modal */}
      <BaseModal
        isOpen={!!userToEditCommission}
        onClose={() => setUserToEditCommission(null)}
        title='Edit Commission Rate'>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <label className='text-sm font-semibold text-gray-700'>
              Commission Rate (%)
            </label>
            <Input
              type='number'
              value={commissionRate}
              onChange={(e) => setCommissionRate(e.target.value)}
              placeholder='e.g. 60'
              min='0'
              max='100'
            />
          </div>
          <div className='flex justify-end gap-3 pt-4 border-t border-gray-100'>
            <Button
              variant='ghost'
              onClick={() => setUserToEditCommission(null)}
              disabled={isUpdatingCommission}>
              Cancel
            </Button>
            <Button
              className='bg-pink-600 hover:bg-pink-700 text-white'
              onClick={handleCommissionUpdate}
              disabled={isUpdatingCommission}>
              {isUpdatingCommission ? "Updating..." : "Update Commission"}
            </Button>
          </div>
        </div>
      </BaseModal>
    </>
  );
}
