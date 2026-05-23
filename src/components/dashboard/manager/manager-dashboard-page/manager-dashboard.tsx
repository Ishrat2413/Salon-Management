import AllReviewEntries from "./all-review-entries";
import { ManagerSummaryCard } from "./manager-summary-card";

export default function ManagerDashboard() {
  return (
    <section>
      <ManagerSummaryCard />
      <AllReviewEntries />
    </section>
  );
}
