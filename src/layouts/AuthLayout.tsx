import { ReactNode } from "react";
import { motion } from "framer-motion";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        className="w-full max-w-md z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-2xl bg-card border border-border shadow-xl mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Mystracoin Vault
          </h1>
          <p className="text-muted-foreground mt-2">Premium Crypto E-Wallet</p>
        </div>
        
        {children}
      </motion.div>
    </div>
  );
}