import { subWeeks, startOfWeek, endOfWeek } from "date-fns";
import { toZonedTime, format } from "date-fns-tz";

export const getRecentWeeks = () => {
  const nowInTexas = toZonedTime(new Date(), "America/Chicago");
  
  return Array.from({ length: 15 }).map((_, i) => {
    const targetDate = subWeeks(nowInTexas, i);
    const start = startOfWeek(targetDate, { weekStartsOn: 1 });
    const end = endOfWeek(targetDate, { weekStartsOn: 1 });

    const startDate = format(start, "yyyy-MM-dd");
    const endDate = format(end, "yyyy-MM-dd");
    
    let baseLabel = "";
    if (i === 0) baseLabel = "This Week";
    else if (i === 1) baseLabel = "Last Week";
    else baseLabel = `${i} Weeks Ago`;
    
    const startLabel = format(start, "MMM d");
    const endLabel = format(end, "MMM d");
    const label = `${baseLabel} (${startLabel} - ${endLabel})`;

    return { label, value: `${startDate}_${endDate}`, startDate, endDate };
  });
};
