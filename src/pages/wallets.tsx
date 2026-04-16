import { useState } from "react";
import { useLocation } from "wouter";
import { AppLayout } from "@/layouts/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { mockWallets } from "@/data/mock";
import { formatCurrency, formatCrypto } from "@/utils/format";
import { ArrowDownLeft, ArrowUpRight, Settings2, Plus, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { Wallet } from "@/types";

export default function Wallets() {
  const [, setLocation] = useLocation();
  const [managedWallet, setManagedWallet] = useState<Wallet | null>(null);

  return (
    <AppLayout title="My Wallets">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Assets</h2>
          <Button
            variant="outline"
            className="rounded-xl h-10"
            data-testid="btn-add-wallet"
            onClick={() => toast.info("Add wallet coming soon")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Wallet
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockWallets.map(wallet => (
            <Card key={wallet.id} className="rounded-[2rem] border-border bg-card hover:border-primary/50 transition-colors overflow-hidden group">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-sm">
                      {wallet.currency.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{wallet.name}</p>
                      <p className="text-xs text-muted-foreground">{wallet.currency}</p>
                    </div>
                  </div>
                  <button
                    className="p-2 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setManagedWallet(wallet)}
                    data-testid={`btn-more-${wallet.currency.toLowerCase()}`}
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                <div className="mb-6">
                  <p className="text-2xl font-bold tracking-tight" data-testid={`balance-${wallet.currency.toLowerCase()}`}>
                    {wallet.currency === "USD" || wallet.currency === "EUR"
                      ? formatCurrency(wallet.balance, wallet.currency)
                      : formatCrypto(wallet.balance, wallet.currency)}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-muted-foreground">{formatCurrency(wallet.usdEquivalent)}</span>
                    {wallet.change24h !== 0 && (
                      <span className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full",
                        wallet.change24h > 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-destructive/10 text-destructive"
                      )}>
                        {wallet.change24h > 0 ? "+" : ""}{wallet.change24h}%
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    className="flex-1 rounded-xl h-10 bg-muted hover:bg-muted/80"
                    onClick={() => setLocation("/deposit")}
                    data-testid={`btn-receive-${wallet.currency.toLowerCase()}`}
                  >
                    <ArrowDownLeft className="w-4 h-4 mr-1.5" />
                    Receive
                  </Button>
                  <Button
                    variant="secondary"
                    className="flex-1 rounded-xl h-10 bg-muted hover:bg-muted/80"
                    onClick={() => setLocation("/transfer")}
                    data-testid={`btn-send-${wallet.currency.toLowerCase()}`}
                  >
                    <ArrowUpRight className="w-4 h-4 mr-1.5" />
                    Send
                  </Button>
                  <Button
                    variant="secondary"
                    className="flex-shrink-0 rounded-xl h-10 w-10 px-0 bg-muted hover:bg-muted/80"
                    onClick={() => setManagedWallet(wallet)}
                    data-testid={`btn-manage-${wallet.currency.toLowerCase()}`}
                    title="Manage wallet"
                  >
                    <Settings2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!managedWallet} onOpenChange={(open) => !open && setManagedWallet(null)}>
        <DialogContent className="sm:max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle>Manage {managedWallet?.name}</DialogTitle>
            <DialogDescription>
              Configure settings for your {managedWallet?.currency} wallet.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <Button
              variant="outline"
              className="w-full rounded-xl justify-start h-12"
              onClick={() => { setLocation("/deposit"); setManagedWallet(null); }}
            >
              <ArrowDownLeft className="w-4 h-4 mr-3 text-emerald-500" />
              Receive {managedWallet?.currency}
            </Button>
            <Button
              variant="outline"
              className="w-full rounded-xl justify-start h-12"
              onClick={() => { setLocation("/transfer"); setManagedWallet(null); }}
            >
              <ArrowUpRight className="w-4 h-4 mr-3 text-primary" />
              Send {managedWallet?.currency}
            </Button>
            <Button
              variant="outline"
              className="w-full rounded-xl justify-start h-12"
              onClick={() => { toast.info("Wallet history coming soon"); setManagedWallet(null); }}
            >
              <Settings2 className="w-4 h-4 mr-3 text-muted-foreground" />
              Wallet Settings
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
