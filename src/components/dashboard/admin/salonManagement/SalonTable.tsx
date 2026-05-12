"use client";

import {
  ActionDef,
  ColumnDef,
} from "@/components/univarsalTable/UnivarsalTable.type";
import UniversalTable from "@/components/univarsalTable/Universaltable";

// ─── Types ────────────────────────────────────────────────────────────────────

type Employee = {
  avatar: string;
  name: string;
};

type Salon = {
  id: number;
  salonName: string;
  managerName: string;
  employees: Employee[];
  totalEmployees: number;
  address: string;
};

// ─── Seed Data ────────────────────────────────────────────────────────────────

const salonData: Salon[] = [
  {
    id: 1,
    salonName: "Glam Studio",
    managerName: "Emily Rodriguez",
    employees: [
      { avatar: "https://i.pravatar.cc/40?img=1", name: "Alice" },
      { avatar: "https://i.pravatar.cc/40?img=2", name: "Bob" },
      { avatar: "https://i.pravatar.cc/40?img=3", name: "Carol" },
    ],
    totalEmployees: 24,
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
  },
  {
    id: 2,
    salonName: "Style Lounge",
    managerName: "Emily Rodriguez",
    employees: [
      { avatar: "https://i.pravatar.cc/40?img=4", name: "Dan" },
      { avatar: "https://i.pravatar.cc/40?img=5", name: "Eve" },
      { avatar: "https://i.pravatar.cc/40?img=6", name: "Frank" },
    ],
    totalEmployees: 24,
    address: "3517 W. Gray St. Utica, Pennsylvania 57867",
  },
  {
    id: 3,
    salonName: "Beauty Bar",
    managerName: "Emily Rodriguez",
    employees: [
      { avatar: "https://i.pravatar.cc/40?img=7", name: "Grace" },
      { avatar: "https://i.pravatar.cc/40?img=8", name: "Hank" },
      { avatar: "https://i.pravatar.cc/40?img=9", name: "Ivy" },
    ],
    totalEmployees: 24,
    address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
  },
];

// ─── Avatar Stack Component ───────────────────────────────────────────────────

function AvatarStack({
  employees,
  total,
}: {
  employees: Employee[];
  total: number;
}) {
  const extra = total - employees.length;

  return (
    <div className='flex items-center gap-2'>
      {/* Overlapping avatars */}
      <div className='flex -space-x-2'>
        {employees.map((emp, i) => (
          <img
            key={i}
            src={emp.avatar}
            alt={emp.name}
            title={emp.name}
            className='inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover'
          />
        ))}
        {extra > 0 && (
          <div className='inline-flex items-center justify-center h-7 w-7 rounded-full ring-2 ring-white bg-[#F3F4F6] text-[10px] font-semibold text-[#6B7280]'>
            +{extra > 9 ? 9 : extra}
          </div>
        )}
      </div>
      {/* Total count */}
      <span className='text-xs text-[#9CA3AF]'>{total}+</span>
    </div>
  );
}

// ─── Edit & Delete Icons ──────────────────────────────────────────────────────

function EditIcon() {
  return (
    <svg
      className='h-[15px] w-[15px]'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={1.8}
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7' />
      <path d='M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z' />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      className='h-[15px] w-[15px]'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={1.8}
      strokeLinecap='round'
      strokeLinejoin='round'>
      <polyline points='3 6 5 6 21 6' />
      <path d='M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6' />
      <path d='M10 11v6M14 11v6' />
      <path d='M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2' />
    </svg>
  );
}

// ─── Column Definitions ───────────────────────────────────────────────────────

const salonColumns: ColumnDef<Salon>[] = [
  {
    key: "salonName",
    header: "Salon Name",
    sortable: true,
    width: "180px",
    render: (value) => (
      <span className='text-[13px] text-[#4B5563] font-normal'>
        {value as string}
      </span>
    ),
  },
  {
    key: "managerName",
    header: "Manager Name",
    width: "180px",
    render: (value) => (
      <span className='text-[13px] text-[#4B5563]'>{value as string}</span>
    ),
  },
  {
    key: "employees",
    header: "Employee",
    width: "200px",
    render: (value, row) => (
      <AvatarStack
        employees={row.employees as Employee[]}
        total={row.totalEmployees as number}
      />
    ),
  },
  {
    key: "address",
    header: "Address",
    render: (value) => (
      <span className='text-[12px] text-[#9CA3AF] leading-[1.5]'>
        {value as string}
      </span>
    ),
  },
];

// ─── Action Definitions ───────────────────────────────────────────────────────

const salonActions: ActionDef<Salon>[] = [
  {
    label: "Edit",
    icon: (
      <span className='text-[#3B82F6] hover:text-[#2563EB]'>
        <EditIcon />
      </span>
    ),
    className: "ut-edit-btn",
    onClick: (row) => alert(`Edit: ${row.salonName}`),
  },
  {
    label: "Delete",
    icon: (
      <span className='text-[#EF4444] hover:text-[#DC2626]'>
        <TrashIcon />
      </span>
    ),
    onClick: (row) => alert(`Delete: ${row.salonName}`),
  },
];

// ─── Main Export ──────────────────────────────────────────────────────────────

export type Salon = {
  id: number;
  salonName: string;
  managerName: string;
  employees: Employee[];
  totalEmployees: number;
  address: string;
};

interface SalonTableProps {
  data: Salon[];
}

export function SalonTable({ data }: SalonTableProps) {
  return (
    <div className='flex items-start justify-center'>
      <div
        className='w-full bg-white rounded-xl shadow border border-gray-100'
        style={{ minHeight: 300 }}>
        {/* Page Header */}
        <div className='px-8 pt-8 pb-2'>
          <h1 className='text-[22px] font-semibold text-[#1E3A5F]'>
            Salon Management
          </h1>
        </div>

        {/* Universal Table */}
        <UniversalTable<Salon>
          data={data}
          columns={salonColumns}
          actions={salonActions}
          pageSize={10}
          showPagination={true}
          emptyMessage='No salons found.'
        />
      </div>
    </div>
  );
}

export default SalonTable;
