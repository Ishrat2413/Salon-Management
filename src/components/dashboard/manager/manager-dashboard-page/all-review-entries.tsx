// "use client";

// import { useEffect, useRef, useState } from "react";
// import { UniversalTable } from "@/components/univarsalTable/Universaltable";
// import type { ColumnDef } from "@/components/univarsalTable/UnivarsalTable.type";
// import {
//   Flag,
//   MessageCircle,
//   FilePen,
//   Funnel,
//   ChevronDown,
// } from "lucide-react";
// import { reviewEntriesData, ReviewEntry } from "./review-entries";
// import { ManagerCommentModal } from "./manager-comment-modal";
// import { useRouter } from "next/navigation";

// export default function AllReviewEntries() {
//   const periodOptions = ["This week", "This month", "This year"] as const;
//   const filteredData = reviewEntriesData;
//   const [selectedPeriod, setSelectedPeriod] =
//     useState<(typeof periodOptions)[number]>("This week");
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const menuRef = useRef<HTMLDivElement>(null);
//   const menuButtonLabel = selectedPeriod;

//   useEffect(() => {
//     function handlePointerDown(event: MouseEvent) {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setIsMenuOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handlePointerDown);
//     return () => document.removeEventListener("mousedown", handlePointerDown);
//   }, []);
//   const columns: ColumnDef<ReviewEntry>[] = [
//     {
//       key: "employee",
//       header: "Employee",
//       width: "15%",
//       sortable: true,
//     },
//     {
//       key: "service",
//       header: "Service",
//       width: "20%",
//       sortable: true,
//     },
//     {
//       key: "amount",
//       header: "Amount",
//       width: "12%",
//       sortable: true,
//       render: (value) => `$${Number(value).toFixed(2)}`,
//     },
//     {
//       key: "percentage",
//       header: "Percentage",
//       width: "12%",
//       sortable: true,
//       render: (value) => (value ? `${value}` : ""),
//     },
//     {
//       key: "tip",
//       header: "Tip",
//       width: "10%",
//       sortable: true,
//       render: (value) => `$${Number(value).toFixed(2)}`,
//     },
//     {
//       key: "date",
//       header: "Date",
//       width: "12%",
//       sortable: true,
//     },
//     {
//       key: "time",
//       header: "Time",
//       width: "10%",
//       sortable: true,
//     },
//     {
//       key: "status",
//       header: "Status",
//       width: "11%",
//       statusMap: {
//         approved: {
//           label: "Approved",
//           bg: "#e8f8f0",
//           color: "#1a7a4a",
//           className: "font-medium",
//         },
//         pending: {
//           label: "Pending",
//           bg: "#fff8e6",
//           color: "#b07d00",
//           className: "font-medium",
//         },
//         rejected: {
//           label: "Rejected",
//           bg: "#fef0f0",
//           color: "#c0392b",
//           className: "font-medium",
//         },
//       },
//     },
//     {
//       key: "id",
//       header: "Actions",
//       width: "13%",
//       align: "right",
//       render: (_, row) => <ReviewEntryActions row={row as ReviewEntry} />,
//     },
//   ];

//   return (
//     <div className='flex flex-col gap-6 p-6 bg-white rounded-[12px] mt-6'>
//       {/* Header with View All Button */}
//       <div className='flex items-center justify-between'>
// <h2 className='text-3xl font-medium text-[#283E5C]'>
//   Review Entries{" "}
//   <span className='text-sm'>({reviewEntriesData.length})</span>
// </h2>
//         <div className='flex justify-end' ref={menuRef}>
//           <div className='relative'>
//             <button
//               type='button'
//               onClick={() => setIsMenuOpen((current) => !current)}
//               className='flex items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm transition-colors hover:bg-gray-50'>
//               <Funnel />
//               <span>{menuButtonLabel}</span>
//               <ChevronDown className='h-4 w-4 text-gray-400' />
//             </button>

//             {isMenuOpen ? (
//               <div className='absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg'>
//                 {periodOptions.map((option) => (
//                   <button
//                     key={option}
//                     type='button'
//                     onClick={() => {
//                       setSelectedPeriod(option);
//                       setIsMenuOpen(false);
//                     }}
//                     className={`block w-full px-4 py-3 text-left text-sm transition-colors hover:bg-[#fbf4f7] ${
//                       selectedPeriod === option
//                         ? "bg-[#fbf4f7] font-semibold text-[#b41f78]"
//                         : "text-gray-600"
//                     }`}>
//                     {option}
//                   </button>
//                 ))}
//               </div>
//             ) : null}
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <UniversalTable
//         data={filteredData}
//         columns={columns}
//         emptyMessage='No entries found.'
//         showPagination
//         className='p-0!'
//         rowStyle={(row) =>
//           (row as ReviewEntry).percentage ? { backgroundColor: "#FFF2F8" } : {}
//         }
//       />
//     </div>
//   );
// }

// function ReviewEntryActions({ row }: { row: ReviewEntry }) {
//   const [showCommentModal, setShowCommentModal] = useState(false);
//   const [pendingActionType, setPendingActionType] = useState<
//     "approve" | "reject" | "comment" | null
//   >(null);

//   const router = useRouter();

//   const isPending = row.status === "Pending";

//   function handleApprove() {
//     setPendingActionType("approve");
//     setShowCommentModal(true);
//   }

//   function handleReject() {
//     setPendingActionType("reject");
//     setShowCommentModal(true);
//   }

//   function handleComment() {
//     setPendingActionType("comment");
//     setShowCommentModal(true);
//   }

//   return (
//     <div className='flex items-center justify-start gap-2'>
//       {isPending ? (
//         <>
//           <button
//             type='button'
//             onClick={handleApprove}
//             className='inline-flex h-10 w-10 items-center justify-center rounded-md border transition'
//             style={{ borderColor: "#4FAF8F", color: "#4FAF8F" }}>
//             <Flag className='h-4 w-4' strokeWidth={3} />
//           </button>

//           <button
//             type='button'
//             onClick={handleReject}
//             className='inline-flex h-10 w-10 items-center justify-center rounded-md border transition'
//             style={{ borderColor: "#E5485D", color: "#E5485D" }}>
//             <Flag className='h-4 w-4' strokeWidth={3} />
//           </button>
//         </>
//       ) : (
//         <button
//           type='button'
//           onClick={() => router.push(`/edit-entries/${row.id}`)}
//           className='inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm text-[#1850D8]'
//           style={{ borderColor: "#1850D8" }}>
//           <FilePen className='h-4 w-4' strokeWidth={3} />
//           <span>Edit</span>
//         </button>
//       )}

//       <ManagerCommentModal
//         open={showCommentModal}
//         onClose={() => {
//           setShowCommentModal(false);
//           setPendingActionType(null);
//         }}
//         entryId={row.id}
//         onSave={(comment) => {
//           if (pendingActionType === "approve") {
//             console.log("Approve with comment:", { id: row.id, comment });
//           } else if (pendingActionType === "reject") {
//             console.log("Reject with comment:", { id: row.id, comment });
//           } else {
//             console.log("Comment saved:", { id: row.id, comment });
//           }

//           setShowCommentModal(false);
//           setPendingActionType(null);
//         }}
//       />
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Flag, FilePen, Trash2 } from "lucide-react";
import {
  useSalonEntriesQuery,
  useUpdateSalonEntryStatusMutation,
  useDeleteSalonEntryMutation,
} from "@/actions/salon-entry/useSalonEntry";
import type { SalonEntry } from "@/actions/salon-entry/salon-entry.types";
import { UniversalTable } from "@/components/univarsalTable/Universaltable";
import type { ColumnDef } from "@/components/univarsalTable/UnivarsalTable.type";
import { ManagerCommentModal } from "./manager-comment-modal";
import { BaseModal } from "@/components/ui/BaseModal";
import { useAuth } from "@/components/providers/auth-provider";

type ManagerReviewEntry = SalonEntry & {
  percentage?: string;
};

export default function AllReviewEntries() {
  const router = useRouter();
  // request a large limit so we can use the table's client-side pagination
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
  });
  const entryCount = response?.meta.total ?? response?.data.length ?? 0;

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
      align: "right",
      render: (_, row) => <SalonEntryActions row={row as SalonEntry} canDelete={canDelete} />,
    },
  ];

  if (isLoading) return <div className='p-6 text-[#283E5C]'>Loading...</div>;

  return (
    <div className='flex flex-col gap-6 p-6 bg-white rounded-[12px] mt-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-3xl font-medium text-[#283E5C]'>
          Review Entries <span className='text-sm'>({entryCount})</span>
        </h2>
      </div>

      <UniversalTable<SalonEntry>
        data={(response?.data || []) as ManagerReviewEntry[]}
        columns={columns}
        emptyMessage='No entries found.'
        showPagination={true}
        pageSize={10}
        className='p-0!'
        rowStyle={(row) =>
          (row as ManagerReviewEntry) ? { backgroundColor: "#FFFFFF" } : {}
        }
      />
    </div>
  );
}

function SalonEntryActions({ row, canDelete }: { row: SalonEntry; canDelete?: boolean }) {
  const router = useRouter();
  const { mutateAsync: updateStatus, isPending: isUpdatingStatus } =
    useUpdateSalonEntryStatusMutation();
  const { mutateAsync: deleteEntry, isPending: isDeleting } = useDeleteSalonEntryMutation();
  
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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

  async function handleDeleteConfirm() {
    await deleteEntry(row.id);
    setIsDeleteModalOpen(false);
  }

  return (
    <>
      <div className='flex items-center justify-end gap-2'>
        {isPending ? (
          <>
            <button
              type='button'
              onClick={() => openModerationModal("APPROVE")}
              disabled={isUpdatingStatus}
              title="Approve"
              className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#4FAF8F] text-[#4FAF8F] transition hover:bg-[#4FAF8F]/10'>
              <Flag className='h-3.5 w-3.5' strokeWidth={3} />
            </button>

            <button
              type='button'
              onClick={() => openModerationModal("REJECT")}
              disabled={isUpdatingStatus}
              title="Reject"
              className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#E5485D] text-[#E5485D] transition hover:bg-[#E5485D]/10'>
              <Flag className='h-3.5 w-3.5' strokeWidth={3} />
            </button>
          </>
        ) : null}

        <button
          type='button'
          onClick={() => router.push(`/edit-entry/${row.id}`)}
          title="Edit Entry"
          className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#1850D8] text-[#1850D8] hover:bg-[#1850D8]/10 transition'>
          <FilePen className='h-3.5 w-3.5' strokeWidth={3} />
        </button>

        {canDelete && (
          <button
            type='button'
            onClick={() => setIsDeleteModalOpen(true)}
            title="Delete Entry"
            className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-red-300 text-red-500 hover:bg-red-50 transition'>
            <Trash2 className='h-3.5 w-3.5' strokeWidth={2.5} />
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

      <BaseModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Salon Entry"
      >
        <div className="space-y-4 text-left">
          <p className="text-gray-600">
            Are you sure you want to delete the entry for{" "}
            <span className="font-semibold text-gray-900">
              {row.employeeName}
            </span>{" "}
            ({row.serviceName})? This action cannot be undone and will also permanently remove any associated split entries.
          </p>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              {isDeleting ? "Deleting..." : "Delete Entry"}
            </button>
          </div>
        </div>
      </BaseModal>
    </>
  );
}
