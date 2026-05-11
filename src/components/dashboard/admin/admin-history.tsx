import React from 'react';
import { HistoryFilters } from './history-filters';
import { ServiceHistoryList } from './service-history-list';

export function AdminHistory() {
  return (
    <div className="bg-[#fef8f8] min-h-[calc(100vh-4rem)] p-4 sm:p-8 text-gray-800 -mx-4 -my-6 sm:-mx-6 sm:-my-6 lg:-mx-8 lg:-my-8">
      {/* Container to give space and background like the HTML */}
      <div className="mx-auto space-y-6">
        <HistoryFilters />
        <ServiceHistoryList />
      </div>
    </div>
  );
}
