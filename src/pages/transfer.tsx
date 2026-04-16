import { useState } from "react";
import { AppLayout } from "@/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { mockUser, mockTransactions, mockBeneficiaries } from "@/data/mock";
import { TransactionItem } from "@/components/TransactionItem";

export default function Transfer() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const transferTransactions = mockTransactions.filter(t => t.type === "Transfer").slice(0, 3);
  
  const numAmount = parseFloat(amount) || 0;

  const handleTransfer = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setShowConfirm(false);
    toast.success("Transfer sent successfully!");
    setAmount("");
    setRecipient("");
    setNote("");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim()) {
      toast.error("Please enter a recipient");
      return;
    }
    if (!amount || numAmount <= 0) {
      toast.error("Amount must be greater than zero");
      return;
    }
    if (numAmount > mockUser.balance) {
      toast.error("Insufficient balance for this transfer");
      return;
    }
    setShowConfirm(true);
  };

  return (
    <AppLayout title="Transfer">
      <div className="max-w-3xl mx-auto space-y-8">
        <Card className="rounded-[2rem] border-border shadow-xl bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Send Money</CardTitle>
            <CardDescription>Instant transfers to other Mystracoin users with zero fees.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <Label className="mb-3 block">Favorites</Label>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {mockBeneficiaries.map(ben => (
                  <div 
                    key={ben.id}
                    onClick={() => setRecipient(ben.name)}
                    className="flex flex-col items-center gap-2 cursor-pointer group flex-shrink-0"
                    data-testid={`btn-fav-${ben.name.toLowerCase()}`}
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-transparent group-hover:border-primary flex items-center justify-center text-primary font-bold text-lg transition-all">
                      {ben.initial}
                    </div>
                    <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">{ben.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label>Recipient (Email, Username, or Phone)</Label>
                <Input 
                  value={recipient} 
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="e.g. mark@example.com or @mark"
                  className="h-12 rounded-xl"
                  data-testid="input-recipient"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Amount (USD)</Label>
                  <span className="text-xs text-muted-foreground">Available: {mockUser.balance} USD</span>
                </div>
                <div className="relative">
                  <Input 
                    type="number"
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="h-12 rounded-xl text-lg pr-16"
                    step="any"
                    data-testid="input-transfer-amount"
                  />
                  <button 
                    type="button" 
                    onClick={() => setAmount(mockUser.balance.toString())}
                    className="absolute right-3 top-3 text-xs font-medium text-primary hover:underline"
                  >
                    MAX
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Note (Optional)</Label>
                <Input 
                  value={note} 
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="What's this for?"
                  className="h-12 rounded-xl"
                  data-testid="input-transfer-note"
                />
              </div>

              <Button type="submit" className="w-full h-12 rounded-xl text-lg font-medium" data-testid="btn-submit-transfer">
                Continue
              </Button>
            </form>
          </CardContent>
        </Card>

        <div>
          <h3 className="text-lg font-semibold mb-4 px-2">Recent Transfers</h3>
          <div className="bg-card border border-border rounded-2xl overflow-hidden p-2">
            {transferTransactions.map(tx => (
              <TransactionItem key={tx.id} transaction={tx} />
            ))}
          </div>
        </div>
      </div>

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Confirm Transfer</DialogTitle>
            <DialogDescription>
              You are about to send money. Please confirm the recipient details.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center my-6 space-y-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-3xl">
              {recipient.charAt(0).toUpperCase() || "?"}
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{numAmount.toFixed(2)} USD</p>
              <p className="text-muted-foreground mt-1">To: <span className="font-medium text-foreground">{recipient}</span></p>
              {note && <p className="text-sm italic mt-2 opacity-80">"{note}"</p>}
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowConfirm(false)} className="rounded-xl">Cancel</Button>
            <Button onClick={handleTransfer} disabled={isLoading} className="rounded-xl" data-testid="btn-confirm-transfer">
              {isLoading ? "Sending..." : "Send Money"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}