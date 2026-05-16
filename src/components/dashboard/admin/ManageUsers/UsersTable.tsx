"use client";

import { useUpdateUserStatusMutation } from "@/actions/admin/useUsers";
import { ColumnDef } from "@/components/univarsalTable/UnivarsalTable.type";
import UniversalTable from "@/components/univarsalTable/Universaltable";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";

export type User = {
  id: string | number;
  fullName: string;
  role: "ADMIN" | "MANAGER" | "EMPLOYEE" | string;
  salonId: string | null;
  salonName: string;
  email: string;
  status: "PENDING" | "ACTIVE" | "SUSPEND" | "REJECTED";
};

// Role badge color custom define for each role
const roleBadgeStyle: Record<string, CSSProperties> = {
  ADMIN: {
    background: "#ffe8f5",
    color: "#c0186b",
    borderRadius: 6,
    padding: "2px 10px",
    fontSize: 12,
    fontWeight: 600,
  },
  MANAGER: {
    background: "#e8f0ff",
    color: "#2655c0",
    borderRadius: 6,
    padding: "2px 10px",
    fontSize: 12,
    fontWeight: 600,
  },
  EMPLOYEE: {
    background: "#f2f2f2",
    color: "#555",
    borderRadius: 6,
    padding: "2px 10px",
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
  onStatusChange: (userId: string | number, newStatus: User["status"]) => Promise<void>;
};

function StatusDropdown({
  userId,
  status,
  onStatusChange,
}: StatusDropdownProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const options = getStatusOptions(status);
  const currentStyle = statusStyleMap[status];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className='relative inline-block'>
      <button
        type='button'
        onClick={() => setOpen((current) => !current)}
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

      {open ? (
        <div className='absolute left-0 top-full z-30 mt-1 w-40 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg'>
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
        </div>
      ) : null}
    </div>
  );
}

interface UsersTableProps {
  data: User[];
}

export function UsersTable({ data }: UsersTableProps) {
  const { mutateAsync: updateStatus } = useUpdateUserStatusMutation();

  const handleStatusChange = useCallback(
    async (userId: string | number, newStatus: User["status"]) => {
      try {
        await updateStatus({ userId: String(userId), status: newStatus });
      } catch (error) {
        console.error(`Failed to update user ${userId} status:`, error);
      }
    },
    [updateStatus],
  );

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
        render: (value) => (
          <span
            style={{
              ...roleBadgeStyle[String(value) as keyof typeof roleBadgeStyle],
            }}>
            {String(value)}
          </span>
        ),
      },
      {
        key: "salonName",
        header: "Salon",
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
    ],
    [handleStatusChange],
  );

  return (
    <UniversalTable<User>
      title={`All Users (${data.length})`}
      data={data}
      columns={columns}
      pageSize={10}
    />
  );
}
