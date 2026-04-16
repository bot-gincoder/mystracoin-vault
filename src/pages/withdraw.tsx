import { useState } from "react";
import { AppLayout } from "@/layouts/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { mockUser, mockTransactions } from "@/data/mock";
import { TransactionItem } from "@/components/TransactionItem";

export default function Withdraw() {
  const [selectedCoin, setSelectedCoin] = useState("USDT_TRC20");
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const withdrawTransactions = mockTransactions.filter(t => t.type === "Withdrawal").slice(0, 3);
  
  const fee = 1.5;
  const numAmount = parseFloat(amount) || 0;
  const finalAmount = Math.max(0, numAmount - fee);

  const handleWithdraw = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setShowConfirm(false);
    
    if (numAmount > mockUser.balance) {
      toast.error("Insufficient balance for this withdrawal.");
      return;
    }
    
    toast.success("Withdrawal processed successfully!");
    setAmount("");
    setAddress("");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !address) {
      toast.error("Please fill in all fields");
      return;
    }
    if (numAmount <= fee) {
      toast.error(`Amount must be greater than the fee (${fee})`);
      return;
    }
    setShowConfirm(true);
  };

  return (
    <AppLayout title="Withdraw">
      <div className="max-w-3xl mx-auto space-y-8">
        <Tabs defaultValue="crypto" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 rounded-xl bg-card border border-border p-1">
            <TabsTrigger value="crypto" className="rounded-lg">Crypto</TabsTrigger>
            <TabsTrigger value="bank" className="rounded-lg">Bank</TabsTrigger>
            <TabsTrigger value="internal" className="rounded-lg">Internal</TabsTrigger>
          </TabsList>

          <TabsContent value="crypto">
            <Card className="rounded-[2rem] border-border shadow-xl bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Withdraw Cryptocurrency</CardTitle>
                <CardDescription>Send crypto to an external wallet</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label>Select Coin</Label>
                    <Select value={selectedCoin} onValueChange={setSelectedCoin}>
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Select a coin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                        <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                        <SelectItem value="USDT_ERC20">USDT (ERC20)</SelectItem>
                        <SelectItem value="USDT_TRC20">USDT (TRC20)</SelectItem>
                        <SelectItem value="LTC">Litecoin (LTC)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Destination Address</Label>
                    <Input 
                      value={address} 
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={`Enter ${selectedCoin.split('_')[0]} address`}
                      className="h-12 font-mono text-sm rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Amount</Label>
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
                  
                  <div className="bg-muted p-4 rounded-xl space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Network Fee</span>
                      <span>{fee} {selectedCoin.split('_')[0]}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t border-border pt-2">
                      <span>You will receive</span>
                      <span className="text-primary">{finalAmount > 0 ? finalAmount.toFixed(4) : "0.00"} {selectedCoin.split('_')[0]}</span>
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-12 rounded-xl text-lg font-medium" data-testid="btn-submit-withdraw">
                    Withdraw
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bank">
            <Card className="rounded-[2rem] border-border shadow-xl bg-card/50 backdrop-blur-sm p-12 text-center">
              <p className="text-lg font-medium">Bank Withdrawals</p>
              <p className="text-sm text-muted-foreground mt-2">Currently under maintenance. Please use Crypto withdrawals.</p>
            </Card>
          </TabsContent>

          <TabsContent value="internal">
            <Card className="rounded-[2rem] border-border shadow-xl bg-card/50 backdrop-blur-sm p-12 text-center">
              <p className="text-lg font-medium">Internal Transfer</p>
              <p className="text-sm text-muted-foreground mt-2">Use the Transfer tab for internal Mystracoin Vault transfers with zero fees.</p>
            </Card>
          </TabsContent>
        </Tabs>

        <div>
          <h3 className="text-lg font-semibold mb-4 px-2">Recent Withdrawals</h3>
          <div className="bg-card border border-border rounded-2xl overflow-hidden p-2">
            {withdrawTransactions.map(tx => (
              <TransactionItem key={tx.id} transaction={tx} />
            ))}
          </div>
        </div>
      </div>

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Confirm Withdrawal</DialogTitle>
            <DialogDescription>
              Please review the details carefully. Crypto transactions cannot be reversed.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 my-4 bg-muted/50 p-4 rounded-xl text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-medium">{numAmount} {selectedCoin.split('_')[0]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fee</span>
              <span className="text-destructive font-medium">-{fee} {selectedCoin.split('_')[0]}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2">
              <span className="text-muted-foreground">To Address</span>
              <span className="font-mono text-xs truncate max-w-[200px]">{address}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 text-base">
              <span className="text-foreground">Total Receive</span>
              <span className="font-bold text-primary">{finalAmount.toFixed(4)} {selectedCoin.split('_')[0]}</span>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowConfirm(false)} className="rounded-xl">Cancel</Button>
            <Button onClick={handleWithdraw} disabled={isLoading} className="rounded-xl" data-testid="btn-confirm-withdraw">
              {isLoading ? "Processing..." : "Confirm Withdrawal"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}