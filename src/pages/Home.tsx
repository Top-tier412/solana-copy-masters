
import React from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronRight, TrendingUp, History, LineChart } from "lucide-react";

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main 
        className="flex-1 flex flex-col pt-16 px-6"
        style={{
          background: "linear-gradient(rgba(19, 19, 20, 0.8), rgba(19, 19, 20, 0.95)), url('/src/assets/crypto-chart-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-7xl mx-auto w-full py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to <span className="gradient-text">Solana Copy Masters</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your advanced platform for analyzing and learning from top Solana traders
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-solana-darkgray/50 backdrop-blur-sm p-8 rounded-lg border border-muted">
              <div className="flex items-center mb-4">
                <div className="rounded-full w-10 h-10 bg-solana-purple/20 flex items-center justify-center mr-4">
                  <TrendingUp className="h-5 w-5 text-solana-purple" />
                </div>
                <h2 className="text-2xl font-medium">Trading Masters</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Discover top-performing Solana wallets ranked by performance metrics.
                Analyze their strategies and learn from the best.
              </p>
              <Button onClick={() => navigate('/masters')} className="w-full sm:w-auto">
                View Masters
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="bg-solana-darkgray/50 backdrop-blur-sm p-8 rounded-lg border border-muted">
              <div className="flex items-center mb-4">
                <div className="rounded-full w-10 h-10 bg-solana-purple/20 flex items-center justify-center mr-4">
                  <LineChart className="h-5 w-5 text-solana-purple" />
                </div>
                <h2 className="text-2xl font-medium">Wallet Analysis</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Enter any Solana wallet address to track its performance and analyze
                trading patterns and transaction history.
              </p>
              <Button onClick={() => navigate('/masters')} className="w-full sm:w-auto">
                Start Analysis
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="bg-solana-darkgray/30 backdrop-blur-sm p-8 rounded-lg border border-muted">
            <h2 className="text-2xl font-medium mb-4">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative">
                <div className="flex items-center mb-4">
                  <div className="rounded-full w-8 h-8 bg-solana-purple flex items-center justify-center mr-3 text-white font-semibold">
                    1
                  </div>
                  <h3 className="text-lg font-medium">Browse Masters</h3>
                </div>
                <p className="text-muted-foreground mb-6 pl-11">
                  Explore our curated list of top-performing Solana wallets, ranked by metrics like PnL, win rate, and trade frequency.
                </p>
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-muted" />
                </div>
              </div>
              
              <div className="relative">
                <div className="flex items-center mb-4">
                  <div className="rounded-full w-8 h-8 bg-solana-purple flex items-center justify-center mr-3 text-white font-semibold">
                    2
                  </div>
                  <h3 className="text-lg font-medium">Analyze Performance</h3>
                </div>
                <p className="text-muted-foreground mb-6 pl-11">
                  Dive deep into transaction history, study trading patterns, and understand winning strategies.
                </p>
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-muted" />
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-4">
                  <div className="rounded-full w-8 h-8 bg-solana-purple flex items-center justify-center mr-3 text-white font-semibold">
                    3
                  </div>
                  <h3 className="text-lg font-medium">Learn & Apply</h3>
                </div>
                <p className="text-muted-foreground mb-6 pl-11">
                  Use insights to improve your own trading strategies or follow successful traders for better results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
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

export default Home;
