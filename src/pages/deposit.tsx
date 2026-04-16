import { useState } from "react";
import { AppLayout } from "@/layouts/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Copy, QrCode, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { mockTransactions } from "@/data/mock";
import { TransactionItem } from "@/components/TransactionItem";

export default function Deposit() {
  const [cryptoAddress] = useState("0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
  const [selectedCoin, setSelectedCoin] = useState("ETH");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [depositError, setDepositError] = useState<string | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(cryptoAddress);
    toast.success("Address copied to clipboard!");
  };

  const onSubmitBank = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (!amount || num <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (num < 10) {
      toast.error("Minimum deposit amount is $10.00");
      return;
    }
    setDepositError(null);
    setShowConfirm(true);
  };

  const handleConfirmDeposit = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);

    const num = parseFloat(amount);
    if (num > 50000) {
      setDepositError("Deposit exceeds daily limit of $50,000. Please contact support.");
      return;
    }

    setShowConfirm(false);
    setDepositError(null);
    toast.success("Deposit request initiated successfully! Funds will arrive in 1-3 business days.");
    setAmount("");
  };

  const depositTransactions = mockTransactions.filter(t => t.type === "Deposit").slice(0, 3);
  const numAmount = parseFloat(amount) || 0;

  return (
    <AppLayout title="Deposit">
      <div className="max-w-3xl mx-auto space-y-8">
        <Tabs defaultValue="crypto" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 rounded-xl bg-card border border-border p-1">
            <TabsTrigger value="crypto" className="rounded-lg">Crypto</TabsTrigger>
            <TabsTrigger value="bank" className="rounded-lg">Bank Transfer</TabsTrigger>
            <TabsTrigger value="mobile" className="rounded-lg">Mobile Money</TabsTrigger>
          </TabsList>

          <TabsContent value="crypto">
            <Card className="rounded-[2rem] border-border shadow-xl bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Deposit Cryptocurrency</CardTitle>
                <CardDescription>Send crypto to your Mystracoin wallet</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Select Coin</Label>
                  <Select value={selectedCoin} onValueChange={setSelectedCoin}>
                    <SelectTrigger className="h-12 rounded-xl" data-testid="select-deposit-coin">
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

                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-2xl bg-background">
                  <div className="w-48 h-48 bg-white p-2 rounded-xl flex items-center justify-center mb-4">
                    <div className="w-full h-full border-4 border-black border-dashed flex items-center justify-center text-black">
                      <QrCode className="w-12 h-12 opacity-50" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground text-center max-w-sm">
                    Send only <span className="font-bold text-foreground">{selectedCoin}</span> to this deposit address. Sending any other coin or token to this address may result in the loss of your deposit.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Deposit Address</Label>
                  <div className="flex gap-2">
                    <Input
                      value={cryptoAddress}
                      readOnly
                      className="h-12 font-mono text-sm bg-muted/50 rounded-xl"
                      data-testid="input-crypto-address"
                    />
                    <Button
                      variant="secondary"
                      className="h-12 px-6 rounded-xl"
                      onClick={handleCopy}
                      data-testid="btn-copy-address"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bank">
            <Card className="rounded-[2rem] border-border shadow-xl bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Bank Transfer</CardTitle>
                <CardDescription>Deposit fiat via international wire transfer</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmitBank} className="space-y-6">
                  <div className="space-y-2">
                    <Label>Amount (USD)</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="h-12 rounded-xl text-lg"
                      min="10"
                      step="any"
                      data-testid="input-deposit-amount"
                    />
                    <p className="text-xs text-muted-foreground">Minimum deposit: $10.00</p>
                  </div>

                  <div className="bg-muted p-4 rounded-xl space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bank Name</span>
                      <span className="font-medium">Global Secure Bank</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Account Name</span>
                      <span className="font-medium">Mystracoin Vault LTD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SWIFT / BIC</span>
                      <span className="font-medium">GLSBUS33</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reference</span>
                      <span className="font-medium text-primary">MV-894-XYZ</span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    Please ensure you include the reference code in your transfer details.
                  </p>

                  <Button
                    type="submit"
                    className="w-full h-12 rounded-xl text-lg font-medium"
                    data-testid="btn-submit-deposit"
                  >
                    Continue
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mobile">
            <Card className="rounded-[2rem] border-border shadow-xl bg-card/50 backdrop-blur-sm flex items-center justify-center p-12">
              <div className="text-center">
                <p className="text-lg font-medium">Mobile Money is coming soon to your region.</p>
                <p className="text-sm text-muted-foreground mt-2">Please use Crypto or Bank Transfer for now.</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div>
          <h3 className="text-lg font-semibold mb-4 px-2">Recent Deposits</h3>
          <div className="bg-card border border-border rounded-2xl overflow-hidden p-2">
            {depositTransactions.map(tx => (
              <TransactionItem key={tx.id} transaction={tx} />
            ))}
          </div>
        </div>
      </div>

      <Dialog open={showConfirm} onOpenChange={(open) => { if (!open) { setShowConfirm(false); setDepositError(null); } }}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Confirm Deposit</DialogTitle>
            <DialogDescription>
              Please review your deposit details before proceeding.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center justify-center my-6 space-y-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-3xl">
              $
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">${numAmount.toFixed(2)}</p>
              <p className="text-muted-foreground mt-1">Via Bank Transfer</p>
              <p className="text-sm text-muted-foreground mt-1">Ref: <span className="font-medium text-primary">MV-894-XYZ</span></p>
            </div>
          </div>

          {depositError && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{depositError}</span>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => { setShowConfirm(false); setDepositError(null); }}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDeposit}
              disabled={isLoading}
              className="rounded-xl"
              data-testid="btn-confirm-deposit"
            >
              {isLoading ? "Processing..." : "Confirm Deposit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
