import { Badge } from "@/components/ui/badge";
import { TransactionStatus } from "@/types";

interface StatusBadgeProps {
  status: TransactionStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  switch (status) {
    case "Completed":
      return <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Completed</Badge>;
    case "Pending":
      return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">Pending</Badge>;
    case "Failed":
    case "Cancelled":
      return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">{status}</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}