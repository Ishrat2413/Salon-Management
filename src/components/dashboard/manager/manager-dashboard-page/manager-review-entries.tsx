"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Flag, FilePen } from "lucide-react";
import {
  useSalonEntriesQuery,
  useUpdateSalonEntryStatusMutation,
} from "@/actions/salon-entry/useSalonEntry";
import type { SalonEntry } from "@/actions/salon-entry/salon-entry.types";
import { UniversalTable } from "@/components/univarsalTable/Universaltable";
import type { ColumnDef } from "@/components/univarsalTable/UnivarsalTable.type";
import { ManagerCommentModal } from "./manager-comment-modal";

type ManagerReviewEntry = SalonEntry & {
  percentage?: string;
};

export default function ManagerReviewEntries() {
  const router = useRouter();
  const limit = 5;

  const { data: response, isLoading } = useSalonEntriesQuery({
    page: 1,
    limit,
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
      width: "10%",
      align: "right",
      render: (_, row) => <SalonEntryActions row={row as SalonEntry} />,
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

function SalonEntryActions({ row }: { row: SalonEntry }) {
  const router = useRouter();
  const { mutateAsync: updateStatus, isPending: isUpdatingStatus } =
    useUpdateSalonEntryStatusMutation();
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [moderationAction, setModerationAction] = useState<
    "APPROVE" | "REJECT" | null
  >(null);
  const isPending = row.status === "PENDING";

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
    setIsCommentModalOpen(true);
  }

  function closeModerationModal() {
    setIsCommentModalOpen(false);
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

  return (
    <div className='flex items-center justify-start gap-2'>
      {isPending ? (
        <>
          <button
            type='button'
            onClick={() => openModerationModal("APPROVE")}
            disabled={isUpdatingStatus}
            className='inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#4FAF8F] text-[#4FAF8F] transition hover:bg-[#4FAF8F]/10'>
            <Flag className='h-4 w-4' strokeWidth={3} />
          </button>

          <button
            type='button'
            onClick={() => openModerationModal("REJECT")}
            disabled={isUpdatingStatus}
            className='inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#E5485D] text-[#E5485D] transition hover:bg-[#E5485D]/10'>
            <Flag className='h-4 w-4' strokeWidth={3} />
          </button>
        </>
      ) : (
        <button
          type='button'
          onClick={() => router.push(`/edit-entry/${row.id}`)}
          className='inline-flex items-center gap-2 rounded-md border border-[#1850D8] px-3 py-1.5 text-sm text-[#1850D8] hover:bg-[#1850D8]/10'>
          <FilePen className='h-4 w-4' strokeWidth={3} />
          <span>Edit</span>
        </button>
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
    </div>
  );
}
