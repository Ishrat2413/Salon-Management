import PayrollPage from "@/components/dashboard/admin/payroll/PayrollPage";
import RoleGuard from "@/components/layout/role-guard";

const page = () => {
  return (
    <RoleGuard allowed={["admin"]}>
      <PayrollPage />
    </RoleGuard>
  );
};

export default page;
