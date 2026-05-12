import React from "react";

interface CardData {
  label: string;
  count: number;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
  iconBgColor: string;
  countColor: string;
}

interface WorkOversightOverviewProps {
  pendingReviewCount?: number;
  approvedTodayCount?: number;
  correctionsMadeCount?: number;
  onCardClick?: (cardType: "pending" | "approved" | "corrections") => void;
  className?: string;
}

const WorkOversightOverview: React.FC<WorkOversightOverviewProps> = ({
  pendingReviewCount = 2,
  approvedTodayCount = 2,
  correctionsMadeCount = 1,
  onCardClick,
  className = "",
}) => {
  const cards: CardData[] = [
    {
      label: "Pending Review",
      count: pendingReviewCount,
      icon: (
        <svg
          className='h-5 w-5'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          viewBox='0 0 24 24'>
          <path
            d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      ),
      bgColor: "bg-white",
      textColor: "text-gray-800",
      iconBgColor: "bg-orange-100 text-orange-600",
      countColor: "#D08700",
    },
    {
      label: "Approved Today",
      count: approvedTodayCount,
      icon: (
        <svg
          className='h-5 w-5'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          viewBox='0 0 24 24'>
          <path
            d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      ),
      bgColor: "bg-white",
      textColor: "text-gray-800",
      iconBgColor: "bg-green-100 text-green-600",
      countColor: "#00A63E",
    },
    {
      label: "Corrections Made",
      count: correctionsMadeCount,
      icon: (
        <svg
          className='h-5 w-5'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          viewBox='0 0 24 24'>
          <path
            d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      ),
      bgColor: "bg-white",
      textColor: "text-gray-800",
      iconBgColor: "bg-blue-100 text-blue-600",
      countColor: "#155DFC",
    },
  ];

  return (
    <div className={`w-full  ${className}`}>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {cards.map((card, index) => (
          <div
            key={card.label}
            onClick={() => {
              const types: Array<"pending" | "approved" | "corrections"> = [
                "pending",
                "approved",
                "corrections",
              ];
              onCardClick?.(types[index]);
            }}
            className={`
              ${card.bgColor} 
              rounded-xl 
              p-5 
              text-center
              border border-gray-200 
              shadow-sm
              hover:shadow-md
              transition-shadow
              cursor-pointer
              flex items-center justify-between
              card-hover-effect
            `}>
            <div className='flex-1'>
              <p 
                className={`text-sm font-medium mb-1`}
                style={{ color: "#4A5565" }}
              >
                {card.label}
              </p>
              <p 
                className='text-3xl font-bold'
                style={{ color: card.countColor }}
              >
                {card.count}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .card-hover-effect {
          box-shadow:
            0 1px 3px rgba(0, 0, 0, 0.05),
            0 1px 2px rgba(0, 0, 0, 0.03);
          transition: all 0.2s ease-in-out;
        }
        .card-hover-effect:hover {
          box-shadow:
            0 4px 6px rgba(0, 0, 0, 0.07),
            0 2px 4px rgba(0, 0, 0, 0.06);
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
};

export default WorkOversightOverview;
