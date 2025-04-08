
import React from "react";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/LoginButton";
import {
  HelpCircle,
  MessageSquare,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 bg-solana-darkgray/50 backdrop-blur-sm fixed w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold gradient-text">
            Solana Copy Masters
          </h1>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a 
                      href="https://t.me/username" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-white transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Telegram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a 
                      href="https://discord.com/invite/username" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-white transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="9" cy="12" r="1" />
                        <circle cx="15" cy="12" r="1" />
                        <path d="M7.5 7.2C8.4 6.5 9.7 6 11 6c1.3 0 2.6.5 3.5 1.2m-9 1C4.9 9.4 4 11.3 4 13c0 3.1 3.1 5 8 5s8-1.9 8-5c0-1.7-.9-3.6-2.5-4.8" />
                        <path d="M15.5 17c.9.7 1.5 1.9 1.5 3m-9 0c0-1.1.6-2.3 1.5-3" />
                      </svg>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Discord</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
                      <HelpCircle className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Help & Documentation</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <LoginButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main 
        className="flex-1 flex flex-col justify-center items-center pt-16 text-center px-6"
        style={{
          background: "linear-gradient(rgba(19, 19, 20, 0.8), rgba(19, 19, 20, 0.95)), url('/src/assets/crypto-chart-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Solana Copy Masters</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Analyze top Solana wallets. Track their performance. Copy their trades.
          </p>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-solana-darkgray/50 backdrop-blur-sm p-6 rounded-lg">
                <div className="rounded-full w-12 h-12 bg-solana-purple/20 flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search text-solana-purple">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.3-4.3"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Find Masters</h3>
                <p className="text-muted-foreground text-sm">
                  Discover top-performing wallets based on proven track records.
                </p>
              </div>
              
              <div className="bg-solana-darkgray/50 backdrop-blur-sm p-6 rounded-lg">
                <div className="rounded-full w-12 h-12 bg-solana-purple/20 flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-line-chart text-solana-purple">
                    <path d="M3 3v18h18"/>
                    <path d="m19 9-5 5-4-4-3 3"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Analyze Performance</h3>
                <p className="text-muted-foreground text-sm">
                  Study detailed analytics with win rates and transaction history.
                </p>
              </div>
              
              <div className="bg-solana-darkgray/50 backdrop-blur-sm p-6 rounded-lg">
                <div className="rounded-full w-12 h-12 bg-solana-purple/20 flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy text-solana-purple">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Copy Trades</h3>
                <p className="text-muted-foreground text-sm">
                  Follow successful traders and learn from their strategies.
                </p>
              </div>
            </div>
            
            <LoginButton />
            
            <div className="pt-12">
              <p className="text-sm text-muted-foreground">
                Always conduct your own research. Past performance is not indicative of future results.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 bg-solana-darkgray/70">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Solana Copy Masters. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-white">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-white">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-white">
                Help
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
