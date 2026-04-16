import { useState, useMemo } from "react";
import { AppLayout } from "@/layouts/AppLayout";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockTransactions } from "@/data/mock";
import { TransactionItem } from "@/components/TransactionItem";
import { Search, Filter, ChevronLeft, ChevronRight, X } from "lucide-react";
import { TransactionStatus, TransactionType } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

const PAGE_SIZE = 5;

type TabValue = "All" | TransactionType;

const STATUS_OPTIONS: { value: TransactionStatus | "All"; label: string }[] = [
  { value: "All", label: "All Statuses" },
  { value: "Completed", label: "Completed" },
  { value: "Pending", label: "Pending" },
  { value: "Failed", label: "Failed" },
  { value: "Cancelled", label: "Cancelled" },
];

const DATE_OPTIONS = [
  { value: "all", label: "All Time" },
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "older", label: "Older" },
];

function isWithinRange(dateStr: string, range: string): boolean {
  const date = new Date(dateStr);
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(startOfDay);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  switch (range) {
    case "today": return date >= startOfDay;
    case "week": return date >= startOfWeek;
    case "month": return date >= startOfMonth;
    case "older": return date < startOfMonth;
    default: return true;
  }
}

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<TabValue>("All");
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | "All">("All");
  const [dateFilter, setDateFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter(tx => {
      const matchesSearch =
        tx.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.type.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTab = activeTab === "All" || tx.type === activeTab;
      const matchesStatus = statusFilter === "All" || tx.status === statusFilter;
      const matchesDate = isWithinRange(tx.date, dateFilter);

      return matchesSearch && matchesTab && matchesStatus && matchesDate;
    });
  }, [searchTerm, activeTab, statusFilter, dateFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / PAGE_SIZE));
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const hasActiveFilters = statusFilter !== "All" || dateFilter !== "all";

  function handleTabChange(value: string) {
    setActiveTab(value as TabValue);
    setCurrentPage(1);
  }

  function handleSearchChange(value: string) {
    setSearchTerm(value);
    setCurrentPage(1);
  }

  function handleStatusChange(value: string) {
    setStatusFilter(value as TransactionStatus | "All");
    setCurrentPage(1);
  }

  function handleDateChange(value: string) {
    setDateFilter(value);
    setCurrentPage(1);
  }

  function clearFilters() {
    setStatusFilter("All");
    setDateFilter("all");
    setCurrentPage(1);
  }

  return (
    <AppLayout title="Transaction History">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Search + Filter Toggle */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9 h-11 rounded-xl bg-card border-border"
              data-testid="input-search-tx"
            />
            {searchTerm && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => handleSearchChange("")}
                data-testid="btn-clear-search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`h-11 px-4 border rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-colors sm:w-auto w-full ${
              showFilters || hasActiveFilters
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border hover:bg-muted"
            }`}
            data-testid="btn-toggle-filters"
          >
            <Filter className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded-full">
                {(statusFilter !== "All" ? 1 : 0) + (dateFilter !== "all" ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="bg-card border border-border rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold">Filters</h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-primary hover:underline"
                      data-testid="btn-clear-filters"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Status</label>
                    <Select value={statusFilter} onValueChange={handleStatusChange}>
                      <SelectTrigger className="h-9 rounded-lg" data-testid="select-status-filter">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Date Range</label>
                    <Select value={dateFilter} onValueChange={handleDateChange}>
                      <SelectTrigger className="h-9 rounded-lg" data-testid="select-date-filter">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DATE_OPTIONS.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="flex w-full rounded-xl bg-card border border-border p-1">
            <TabsTrigger value="All" className="rounded-lg flex-1" data-testid="tab-all">
              All
            </TabsTrigger>
            <TabsTrigger value="Deposit" className="rounded-lg flex-1" data-testid="tab-deposits">
              Deposits
            </TabsTrigger>
            <TabsTrigger value="Withdrawal" className="rounded-lg flex-1" data-testid="tab-withdrawals">
              Withdrawals
            </TabsTrigger>
            <TabsTrigger value="Transfer" className="rounded-lg flex-1" data-testid="tab-transfers">
              Transfers
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Results Summary */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span data-testid="text-tx-count">
            {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? "s" : ""}
          </span>
          {totalPages > 1 && (
            <span>Page {currentPage} of {totalPages}</span>
          )}
        </div>

        {/* Transaction List */}
        <div className="bg-card border border-border rounded-[2rem] overflow-hidden p-2 min-h-[300px]">
          <AnimatePresence mode="wait">
            {paginatedTransactions.length > 0 ? (
              <motion.div
                key={`page-${currentPage}-${activeTab}-${statusFilter}-${dateFilter}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {paginatedTransactions.map((tx, i) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <TransactionItem transaction={tx} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-64 text-center"
                data-testid="empty-state-transactions"
              >
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-muted-foreground opacity-50" />
                </div>
                <h3 className="text-lg font-semibold">No transactions found</h3>
                <p className="text-muted-foreground text-sm max-w-sm mt-1">
                  Try adjusting your search or filters.
                </p>
                {(searchTerm || hasActiveFilters) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-3 text-primary"
                    onClick={() => { handleSearchChange(""); clearFilters(); }}
                    data-testid="btn-reset-all"
                  >
                    Reset all filters
                  </Button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-xl"
              data-testid="btn-prev-page"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                    page === currentPage
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                  data-testid={`btn-page-${page}`}
                >
                  {page}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-xl"
              data-testid="btn-next-page"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
