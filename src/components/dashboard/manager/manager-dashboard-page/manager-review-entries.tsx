"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Flag, FilePen, Trash2, MoreVertical } from "lucide-react";
import { createPortal } from "react-dom";
import {
  useSalonEntriesQuery,
  useUpdateSalonEntryStatusMutation,
  useDeleteSalonEntryMutation,
} from "@/actions/salon-entry/useSalonEntry";
import type { SalonEntry } from "@/actions/salon-entry/salon-entry.types";
import { UniversalTable } from "@/components/univarsalTable/Universaltable";
import type { ColumnDef } from "@/components/univarsalTable/UnivarsalTable.type";
import { ManagerEditModal } from "./manager-edit-modal";
import { ManagerCommentModal } from "./manager-comment-modal";
import { BaseModal } from "@/components/ui/BaseModal";
import { useAuth } from "@/components/providers/auth-provider";

type ManagerReviewEntry = SalonEntry & {
  percentage?: string;
};

export default function ManagerReviewEntries() {
  const router = useRouter();
  const limit = 1000;
  const { user } = useAuth();
  const canDelete =
    user?.role === "admin" ||
    user?.role?.toUpperCase() === "ADMIN" ||
    user?.role === "manager" ||
    user?.role?.toUpperCase() === "MANAGER";

  const { data: response, isLoading } = useSalonEntriesQuery({
    page: 1,
    limit,
    status: "PENDING",
  });

  function getSplitPercentage(row: SalonEntry) {
    if (!row.isSplit) return "";

    const totalPrice = Number(row.totalPrice || 0);
    const splitShare = Number(
      row.loggedInUserTotalPrice || row.splits?.[0]?.totalPrice || 0,
    );

    if (!totalPrice) return "";

    const percentage = (splitShare / totalPrice) * 100;

    return `${percentage.toFixed(2)}%`;
  }

  const columns: ColumnDef<ManagerReviewEntry>[] = [
    { key: "employeeName", header: "Employee", width: "15%", sortable: true },
    { key: "serviceName", header: "Service", width: "20%", sortable: true },
    { key: "salonName", header: "Salon", width: "15%", sortable: true },
    {
      key: "totalPrice",
      header: "Amount",
      width: "10%",
      sortable: true,
      render: (value) => `$${Number(value).toFixed(2)}`,
    },
    {
      key: "tips",
      header: "Tip",
      width: "8%",
      sortable: true,
      render: (value) => `$${Number(value).toFixed(2)}`,
    },
    {
      key: "createdAt",
      header: "Date",
      width: "12%",
      sortable: true,
      render: (value) =>
        value ? format(new Date(value as string), "yyyy-MM-dd") : "-",
    },
    {
      key: "time",
      header: "Time",
      width: "10%",
      sortable: true,
      render: (_, row) =>
        row.createdAt
          ? format(new Date(row.createdAt as string), "hh:mm a")
          : "-",
    },
    {
      key: "status",
      header: "Status",
      width: "10%",
      statusMap: {
        APPROVED: {
          label: "Approved",
          bg: "#e8f8f0",
          color: "#1a7a4a",
          className: "font-medium",
        },
        PENDING: {
          label: "Pending",
          bg: "#fff8e6",
          color: "#b07d00",
          className: "font-medium",
        },
        REJECTED: {
          label: "Rejected",
          bg: "#fef0f0",
          color: "#c0392b",
          className: "font-medium",
        },
      },
    },
    {
      key: "id",
      header: "Actions",
      width: "12%",
      align: "left",
      render: (_, row) => (
        <SalonEntryActions row={row as SalonEntry} canDelete={canDelete} />
      ),
    },
  ];

  if (isLoading) return <div className='p-6 text-[#283E5C]'>Loading...</div>;

  return (
    <div className='flex flex-col gap-6 p-6 bg-white rounded-[12px] mt-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-3xl font-medium text-[#283E5C]'>Review Entries</h2>
        <button
          type='button'
          onClick={() => router.push("/manager-review-entries")}
          className='px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium transition'>
          View All
        </button>
      </div>

      <UniversalTable<SalonEntry>
        data={(response?.data || []) as ManagerReviewEntry[]}
        columns={columns}
        emptyMessage='No entries found.'
        showPagination={false}
        className='p-0!'
        rowStyle={(row) =>
          (row as ManagerReviewEntry) ? { backgroundColor: "#FFFFFF" } : {}
        }
      />
    </div>
  );
}

function SalonEntryActions({
  row,
  canDelete,
}: {
  row: SalonEntry;
  canDelete?: boolean;
}) {
  const router = useRouter();
  const { mutateAsync: updateStatus, isPending: isUpdatingStatus } =
    useUpdateSalonEntryStatusMutation();
  const { mutateAsync: deleteEntry, isPending: isDeleting } =
    useDeleteSalonEntryMutation();

  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editMode, setEditMode] = useState<"edit" | "approve">("edit");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [moderationAction, setModerationAction] = useState<
    "APPROVE" | "REJECT" | null
  >(null);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isPending = row.status === "PENDING";

  const handleToggleDropdown = () => {
    if (!isDropdownOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX - 100, // Align dropdown to the left of the button
      });
    }
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    const handleScroll = () => {
      if (isDropdownOpen) setIsDropdownOpen(false);
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", () => setIsDropdownOpen(false));
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isDropdownOpen]);

  const moderationLabels = {
    APPROVE: {
      title: "Approve Entry",
      submitLabel: "Approve",
    },
    REJECT: {
      title: "Reject Entry",
      submitLabel: "Reject",
    },
  } as const;

  function openModerationModal(action: "APPROVE" | "REJECT") {
    setModerationAction(action);
    if (action === "APPROVE") {
      setEditMode("approve");
      setIsEditModalOpen(true);
      return;
    }

    setIsCommentModalOpen(true);
  }

  function openEditModal(mode: "edit" | "approve" = "edit") {
    setEditMode(mode);
    setIsEditModalOpen(true);
  }

  function closeModerationModal() {
    setIsCommentModalOpen(false);
    setModerationAction(null);
  }

  function handleEditSaved() {
    if (editMode === "approve") {
      setModerationAction("APPROVE");
      setIsCommentModalOpen(true);
      return;
    }

    setModerationAction(null);
  }

  async function handleModerationSubmit(comment: string) {
    if (!moderationAction) return;

    await updateStatus({
      id: row.id,
      status: moderationAction === "APPROVE" ? "APPROVED" : "REJECTED",
      statusComment: comment,
    });
  }

  async function handleDeleteConfirm() {
    await deleteEntry(row.id);
    setIsDeleteModalOpen(false);
  }

  return (
    <>
      <div className='flex items-center justify-start gap-2'>
        {isPending ? (
          <>
            <button
              type='button'
              onClick={() => openModerationModal("APPROVE")}
              disabled={isUpdatingStatus}
              title='Approve'
              className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#4FAF8F] text-[#4FAF8F] transition hover:bg-[#4FAF8F]/10'>
              <Flag className='h-3.5 w-3.5' strokeWidth={3} />
            </button>

            <button
              type='button'
              onClick={() => openModerationModal("REJECT")}
              disabled={isUpdatingStatus}
              title='Reject'
              className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#E5485D] text-[#E5485D] transition hover:bg-[#E5485D]/10'>
              <Flag className='h-3.5 w-3.5' strokeWidth={3} />
            </button>

            <div className='relative'>
              <button
                ref={triggerRef}
                type='button'
                onClick={handleToggleDropdown}
                className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 transition'>
                <MoreVertical className='h-4 w-4' />
              </button>

              {isDropdownOpen && typeof document !== "undefined"
                ? createPortal(
                    <div
                      ref={dropdownRef}
                      className='absolute z-9999 w-32 rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden'
                      style={{
                        top: coords.top,
                        left: coords.left,
                      }}>
                      <div className='py-1 text-left'>
                        <button
                          onClick={() => {
                            openEditModal("edit");
                            setIsDropdownOpen(false);
                          }}
                          className='flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-2'>
                          <FilePen className='h-3.5 w-3.5' />
                          Edit
                        </button>
                        {canDelete && (
                          <button
                            onClick={() => {
                              setIsDeleteModalOpen(true);
                              setIsDropdownOpen(false);
                            }}
                            className='flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 gap-2'>
                            <Trash2 className='h-3.5 w-3.5' />
                            Delete
                          </button>
                        )}
                      </div>
                    </div>,
                    document.body,
                  )
                : null}
            </div>
          </>
        ) : (
          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={() => openEditModal("edit")}
              title='Edit'
              className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#1850D8] text-[#1850D8] transition hover:bg-[#1850D8]/10'>
              <FilePen className='h-3.5 w-3.5' />
            </button>

            {canDelete && (
              <button
                type='button'
                onClick={() => setIsDeleteModalOpen(true)}
                title='Delete'
                className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#E5485D] text-[#E5485D] transition hover:bg-[#E5485D]/10'>
                <Trash2 className='h-3.5 w-3.5' />
              </button>
            )}
          </div>
        )}

        <ManagerCommentModal
          open={isCommentModalOpen}
          onClose={closeModerationModal}
          entryId={row.id}
          title={
            moderationAction
              ? moderationLabels[moderationAction].title
              : "Add Comment"
          }
          submitLabel={
            moderationAction
              ? moderationLabels[moderationAction].submitLabel
              : "Submit"
          }
          isSubmitting={isUpdatingStatus}
          onSave={handleModerationSubmit}
        />

        <ManagerEditModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          row={row}
          mode={editMode}
          onSaved={handleEditSaved}
        />
      </div>

      <BaseModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title='Delete Salon Entry'>
        <div className='space-y-4'>
          <p className='text-gray-600'>
            Are you sure you want to delete the entry for{" "}
            <span className='font-semibold text-gray-900'>
              {row.employeeName}
            </span>{" "}
            ({row.serviceName})? This action cannot be undone and will also
            permanently remove any associated split entries.
          </p>
          <div className='flex justify-end gap-3 pt-4 border-t border-gray-100'>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors'
              disabled={isDeleting}>
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className='px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors flex items-center gap-2'>
              {isDeleting ? "Deleting..." : "Delete Entry"}
            </button>
          </div>
        </div>
      </BaseModal>
    </>
  );
}
