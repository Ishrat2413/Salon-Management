import { RoleGuard } from "@/components/layout/role-guard";
import AllReviewEntries from "@/components/dashboard/manager/manager-dashboard-page/all-review-entries";

export default function ReviewEntriesPage() {
  return (
    <RoleGuard allowed={["manager"]}>
      <AllReviewEntries />
    </RoleGuard>
  );
}
