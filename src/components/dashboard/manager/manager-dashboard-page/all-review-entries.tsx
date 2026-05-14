"use client";

import { useEffect, useRef, useState } from "react";
import { UniversalTable } from "@/components/univarsalTable/Universaltable";
import type { ColumnDef } from "@/components/univarsalTable/UnivarsalTable.type";
import {
  Flag,
  MessageCircle,
  FilePen,
  Funnel,
  ChevronDown,
} from "lucide-react";
import { reviewEntriesData, ReviewEntry } from "./review-entries";
import { ManagerCommentModal } from "./manager-comment-modal";
import { useRouter } from "next/navigation";

export default function AllReviewEntries() {
  const periodOptions = ["This week", "This month", "This year"] as const;
  const filteredData = reviewEntriesData;
  const [selectedPeriod, setSelectedPeriod] =
    useState<(typeof periodOptions)[number]>("This week");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonLabel = selectedPeriod;

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);
  const columns: ColumnDef<ReviewEntry>[] = [
    {
      key: "employee",
      header: "Employee",
      width: "15%",
      sortable: true,
    },
    {
      key: "service",
      header: "Service",
      width: "20%",
      sortable: true,
    },
    {
      key: "amount",
      header: "Amount",
      width: "12%",
      sortable: true,
      render: (value) => `$${Number(value).toFixed(2)}`,
    },
    {
      key: "percentage",
      header: "Percentage",
      width: "12%",
      sortable: true,
      render: (value) => (value ? `${value}` : ""),
    },
    {
      key: "tip",
      header: "Tip",
      width: "10%",
      sortable: true,
      render: (value) => `$${Number(value).toFixed(2)}`,
    },
    {
      key: "date",
      header: "Date",
      width: "12%",
      sortable: true,
    },
    {
      key: "time",
      header: "Time",
      width: "10%",
      sortable: true,
    },
    {
      key: "status",
      header: "Status",
      width: "11%",
      statusMap: {
        approved: {
          label: "Approved",
          bg: "#e8f8f0",
          color: "#1a7a4a",
          className: "font-medium",
        },
        pending: {
          label: "Pending",
          bg: "#fff8e6",
          color: "#b07d00",
          className: "font-medium",
        },
        rejected: {
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
      width: "13%",
      align: "right",
      render: (_, row) => <ReviewEntryActions row={row as ReviewEntry} />,
    },
  ];

  return (
    <div className='flex flex-col gap-6 p-6 bg-white rounded-[12px] mt-6'>
      {/* Header with View All Button */}
      <div className='flex items-center justify-between'>
        <h2 className='text-3xl font-medium text-[#283E5C]'>
          Review Entries{" "}
          <span className='text-sm'>({reviewEntriesData.length})</span>
        </h2>
        <div className='flex justify-end' ref={menuRef}>
          <div className='relative'>
            <button
              type='button'
              onClick={() => setIsMenuOpen((current) => !current)}
              className='flex items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm transition-colors hover:bg-gray-50'>
              <Funnel />
              <span>{menuButtonLabel}</span>
              <ChevronDown className='h-4 w-4 text-gray-400' />
            </button>

            {isMenuOpen ? (
              <div className='absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg'>
                {periodOptions.map((option) => (
                  <button
                    key={option}
                    type='button'
                    onClick={() => {
                      setSelectedPeriod(option);
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full px-4 py-3 text-left text-sm transition-colors hover:bg-[#fbf4f7] ${
                      selectedPeriod === option
                        ? "bg-[#fbf4f7] font-semibold text-[#b41f78]"
                        : "text-gray-600"
                    }`}>
                    {option}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Table */}
      <UniversalTable
        data={filteredData}
        columns={columns}
        emptyMessage='No entries found.'
        showPagination
        className='p-0!'
        rowStyle={(row) =>
          (row as ReviewEntry).percentage ? { backgroundColor: "#FFF2F8" } : {}
        }
      />
    </div>
  );
}

function ReviewEntryActions({ row }: { row: ReviewEntry }) {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [pendingActionType, setPendingActionType] = useState<
    "approve" | "reject" | "comment" | null
  >(null);

  const router = useRouter();

  const isPending = row.status === "Pending";

  function handleApprove() {
    setPendingActionType("approve");
    setShowCommentModal(true);
  }

  function handleReject() {
    setPendingActionType("reject");
    setShowCommentModal(true);
  }

  function handleComment() {
    setPendingActionType("comment");
    setShowCommentModal(true);
  }

  return (
    <div className='flex items-center justify-start gap-2'>
      {isPending ? (
        <>
          <button
            type='button'
            onClick={handleApprove}
            className='inline-flex h-10 w-10 items-center justify-center rounded-md border transition'
            style={{ borderColor: "#4FAF8F", color: "#4FAF8F" }}>
            <Flag className='h-4 w-4' strokeWidth={3} />
          </button>

          <button
            type='button'
            onClick={handleReject}
            className='inline-flex h-10 w-10 items-center justify-center rounded-md border transition'
            style={{ borderColor: "#E5485D", color: "#E5485D" }}>
            <Flag className='h-4 w-4' strokeWidth={3} />
          </button>
        </>
      ) : (
        <button
          type='button'
          onClick={() => router.push(`/edit-entries/${row.id}`)}
          className='inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm text-[#1850D8]'
          style={{ borderColor: "#1850D8" }}>
          <FilePen className='h-4 w-4' strokeWidth={3} />
          <span>Edit</span>
        </button>
      )}

      <ManagerCommentModal
        open={showCommentModal}
        onClose={() => {
          setShowCommentModal(false);
          setPendingActionType(null);
        }}
        entryId={row.id}
        onSave={(comment) => {
          if (pendingActionType === "approve") {
            console.log("Approve with comment:", { id: row.id, comment });
          } else if (pendingActionType === "reject") {
            console.log("Reject with comment:", { id: row.id, comment });
          } else {
            console.log("Comment saved:", { id: row.id, comment });
          }

          setShowCommentModal(false);
          setPendingActionType(null);
        }}
      />
    </div>
  );
}
