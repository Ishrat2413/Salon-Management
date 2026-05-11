import ManagerReviewEntries from "./manager-review-entries";
import { ManagerSummaryCard } from "./manager-summary-card";

export default function ManagerDashboard() {
  return (
    <section>
      <ManagerSummaryCard />
      <ManagerReviewEntries />
    </section>
  );
}
