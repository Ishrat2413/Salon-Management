"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { UniversalTable } from "@/components/univarsalTable/Universaltable";
import type { ColumnDef } from "@/components/univarsalTable/UnivarsalTable.type";
import {
  Flag,
  MoreVertical,
  MessageCircle,
  FilePen,
  MessageSquare,
} from "lucide-react";
import { reviewEntriesData, ReviewEntry } from "./review-entries";
import { ManagerCommentModal } from "./manager-comment-modal";
import { ManagerEditModal } from "./manager-edit-modal";

export default function ManagerReviewEntries() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredData = useMemo(() => {
    return reviewEntriesData.filter((entry) => {
      const matchesSearch =
        entry.employee.toLowerCase().includes(search.toLowerCase()) ||
        entry.service.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter
        ? entry.status.toLowerCase() === statusFilter.toLowerCase()
        : true;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

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
        <h2 className='text-3xl font-medium text-[#283E5C]'>Review Entries</h2>
        <button
          onClick={() => router.push("/review-entries")}
          className='px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium transition'>
          View All
        </button>
      </div>

      {/* Table */}
      <UniversalTable
        data={filteredData.slice(0, 7)}
        columns={columns}
        pageSize={7}
        emptyMessage='No entries found.'
        showPagination={false}
        className='p-0!'
        rowStyle={(row) =>
          (row as ReviewEntry).percentage ? { backgroundColor: "#FFF2F8" } : {}
        }
      />
    </div>
  );
}

function ReviewEntryActions({ row }: { row: ReviewEntry }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const isPending = row.status === "Pending";

  const directActions =
    row.status === "Approved" || row.status === "Rejected"
      ? [
          {
            label: "Edit",
            icon: <FilePen className='h-4 w-4' strokeWidth={3} />,
            tone: "#1850D8",
            border: "#1850D8",
            onClick: () => setShowEditModal(true),
          },
          {
            label: "Comment",
            icon: <MessageSquare className='h-4 w-4' strokeWidth={3} />,
            tone: "#30A860",
            border: "#30A860",
            onClick: () => setShowCommentModal(true),
          },
        ]
      : [
          {
            label: "Approve",
            icon: <Flag className='h-4 w-4' strokeWidth={3} />,
            tone: "#4FAF8F",
            border: "#4FAF8F",
            onClick: () => console.log("Approve:", row.id),
          },
          {
            label: "Reject",
            icon: <Flag className='h-4 w-4' strokeWidth={3} />,
            tone: "#E5485D",
            border: "#E5485D",
            onClick: () => console.log("Reject:", row.id),
          },
        ];

  return (
    <div className='flex items-center justify-start gap-2' ref={menuRef}>
      {directActions.map((action) => (
        <button
          key={action.label}
          type='button'
          onClick={action.onClick}
          className='inline-flex h-10 w-10 items-center justify-center rounded-md border transition'
          style={{
            borderColor: action.border,
            color: action.tone,
          }}>
          {action.icon}
        </button>
      ))}

      {isPending ? (
        <div className='relative'>
          <button
            type='button'
            aria-label='More actions'
            onClick={() => setIsOpen((current) => !current)}
            className='inline-flex h-10 w-10 items-center justify-center rounded-md border border-transparent text-gray-500 transition hover:bg-gray-100 hover:text-gray-700'>
            <MoreVertical className='h-4 w-4' />
          </button>

          {isOpen ? (
            <div className='absolute right-0 top-full z-20 mt-2 w-40 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg'>
              <button
                type='button'
                onClick={() => {
                  setIsOpen(false);
                  setShowEditModal(true);
                }}
                className='flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-[#fbf4f7]'>
                <FilePen className='h-4 w-4 text-gray-500' />
                Edit
              </button>
              <button
                type='button'
                onClick={() => {
                  setIsOpen(false);
                  setShowCommentModal(true);
                }}
                className='flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-[#fbf4f7]'>
                <MessageCircle className='h-4 w-4 text-gray-500' />
                Comment
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      <ManagerCommentModal
        open={showCommentModal}
        onClose={() => setShowCommentModal(false)}
        entryId={row.id}
      />

      <ManagerEditModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        row={row}
      />
    </div>
  );
}
