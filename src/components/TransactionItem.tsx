import { Transaction } from "@/types";
import { formatCurrency, formatDate } from "@/utils/format";
import { ArrowDownLeft, ArrowUpRight, ArrowRightLeft } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/utils";

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const isPositive = transaction.amount > 0;

  const Icon = () => {
    switch (transaction.type) {
      case "Deposit":
        return <ArrowDownLeft className="w-5 h-5 text-emerald-500" />;
      case "Withdrawal":
        return <ArrowUpRight className="w-5 h-5 text-destructive" />;
      case "Transfer":
        return <ArrowRightLeft className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border" data-testid={`transaction-${transaction.id}`}>
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center",
          transaction.type === "Deposit" ? "bg-emerald-500/10" :
          transaction.type === "Withdrawal" ? "bg-destructive/10" : "bg-primary/10"
        )}>
          <Icon />
        </div>
        <div>
          <p className="font-medium text-sm">{transaction.details}</p>
          <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={cn("font-medium text-sm", isPositive ? "text-emerald-500" : "text-foreground")}>
          {isPositive ? "+" : ""}{transaction.amount} {transaction.currency}
        </p>
        <div className="flex items-center justify-end gap-2 mt-1">
          <span className="text-xs text-muted-foreground">{formatCurrency(transaction.usdEquivalent)}</span>
          <StatusBadge status={transaction.status} />
        </div>
      </div>
    </div>
  );
}