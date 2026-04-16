import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowDownLeft, ArrowUpRight, ArrowRightLeft, TrendingUp, Plus } from "lucide-react";
import { AppLayout } from "@/layouts/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TransactionItem } from "@/components/TransactionItem";
import { mockUser, mockTransactions } from "@/data/mock";
import { formatCurrency } from "@/utils/format";
import { useBalanceHidden } from "@/hooks/use-balance";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { isHidden, toggle } = useBalanceHidden();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const recentTransactions = mockTransactions.slice(0, 5);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  if (isLoading) {
    return (
      <AppLayout title="Dashboard">
        <div className="space-y-6">
          <div>
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="relative overflow-hidden rounded-[2rem] bg-card border border-border p-6 md:p-8">
            <Skeleton className="h-4 w-24 mb-4" />
            <Skeleton className="h-12 w-52 mb-3" />
            <Skeleton className="h-4 w-32 mb-6" />
            <div className="grid grid-cols-3 gap-4">
              <Skeleton className="h-12 rounded-xl" />
              <Skeleton className="h-12 rounded-xl" />
              <Skeleton className="h-12 rounded-xl" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <Card key={i} className="bg-card border-border rounded-2xl">
                <CardContent className="p-5 flex items-center gap-4">
                  <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
                  <div className="flex-1">
                    <Skeleton className="h-3 w-24 mb-2" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="bg-card border border-border rounded-[2rem] overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-8 w-16 rounded-lg" />
            </div>
            <div className="p-2 space-y-1">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl">
                  <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <div className="text-right">
                    <Skeleton className="h-4 w-24 mb-2 ml-auto" />
                    <Skeleton className="h-5 w-20 rounded-full ml-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Dashboard">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm">Hello,</p>
            <h1 className="text-2xl font-bold">{mockUser.name} 👋</h1>
          </div>
        </motion.div>

        {/* Balance Card */}
        <motion.div variants={itemVariants}>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-card to-card/50 border border-border shadow-2xl p-6 md:p-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/4" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-2xl pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground font-medium">Total Balance</span>
                <button onClick={toggle} className="text-muted-foreground hover:text-foreground transition-colors p-2" data-testid="btn-toggle-balance">
                  {isHidden ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="mb-6">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-total-balance">
                  {isHidden ? "••••••••" : formatCurrency(mockUser.balance)}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-500 font-medium">+{formatCurrency(mockUser.balanceChange)}</span>
                  <span className="text-muted-foreground text-sm">Past 24h</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Button
                  onClick={() => setLocation("/deposit")}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 md:h-14 rounded-xl shadow-lg shadow-primary/20"
                  data-testid="btn-action-deposit"
                >
                  <ArrowDownLeft className="w-5 h-5 mr-2" />
                  <span className="hidden sm:inline">Deposit</span>
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setLocation("/withdraw")}
                  className="h-12 md:h-14 rounded-xl border border-border bg-secondary hover:bg-secondary/80"
                  data-testid="btn-action-withdraw"
                >
                  <ArrowUpRight className="w-5 h-5 mr-2" />
                  <span className="hidden sm:inline">Withdraw</span>
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setLocation("/transfer")}
                  className="h-12 md:h-14 rounded-xl border border-border bg-secondary hover:bg-secondary/80"
                  data-testid="btn-action-transfer"
                >
                  <ArrowRightLeft className="w-5 h-5 mr-2" />
                  <span className="hidden sm:inline">Transfer</span>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card border-border rounded-2xl">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                <ArrowDownLeft className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Deposits</p>
                <p className="text-lg font-semibold" data-testid="stat-total-deposits">{formatCurrency(4500.00)}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border rounded-2xl">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <ArrowUpRight className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Withdrawals</p>
                <p className="text-lg font-semibold" data-testid="stat-total-withdrawals">{formatCurrency(2150.50)}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border rounded-2xl">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Plus className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available Yield</p>
                <p className="text-lg font-semibold" data-testid="stat-yield">{formatCurrency(125.75)}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div variants={itemVariants} className="bg-card border border-border rounded-[2rem] overflow-hidden">
          <div className="p-6 flex items-center justify-between border-b border-border">
            <h3 className="font-semibold text-lg">Recent Transactions</h3>
            <Button variant="ghost" size="sm" onClick={() => setLocation("/transactions")} className="text-primary" data-testid="btn-view-all">
              View All
            </Button>
          </div>
          <div className="p-2">
            {recentTransactions.map((tx) => (
              <TransactionItem key={tx.id} transaction={tx} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AppLayout>
  );
}
