import AddEntryForm from "@/components/dashboard/common/AddEntryPage";
import { reviewEntriesData } from "@/components/dashboard/manager/manager-dashboard-page/review-entries";

type Props = {
  params: { id: string };
};

export default function Page({ params }: Props) {
  const id = Number(params.id);
  const entry = reviewEntriesData.find((e) => e.id === id);

  const initialData = entry
    ? {
        employee: entry.employee as string,
        amount: entry.amount,
        tip: entry.tip,
        notes: entry.service as string,
      }
    : undefined;

  return (
    <div className='p-4'>
      <AddEntryForm initialData={initialData} />
    </div>
  );
}
