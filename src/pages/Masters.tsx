
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MastersTable from "@/components/MastersTable";
import Loading from "@/components/Loading";
import { apiService, Master } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Search, RefreshCw } from "lucide-react";

const Masters: React.FC = () => {
  const [masters, setMasters] = useState<Master[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [walletAddress, setWalletAddress] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    
    fetchMasters();
  }, [isAuthenticated, navigate]);
  
  const fetchMasters = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getMasters();
      setMasters(data);
    } catch (error) {
      console.error("Error fetching masters:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleStartAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      await apiService.startAnalysis(walletAddress || "all");
      // After analysis, refresh the list
      await fetchMasters();
    } catch (error) {
      console.error("Error starting analysis:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleSearch = async () => {
    if (!walletAddress) return;
    
    setIsAnalyzing(true);
    try {
      await apiService.startAnalysis(walletAddress);
      // After analysis, redirect to the detail page for this address
      navigate(`/masters/${walletAddress}`);
    } catch (error) {
      console.error("Error analyzing wallet:", error);
      setIsAnalyzing(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-background">
        <div className="container mx-auto py-8 px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold mb-4 md:mb-0">Trading Masters</h1>
            
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter wallet address"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Button 
                onClick={handleSearch}
                disabled={!walletAddress || isAnalyzing}
                className="sm:flex-shrink-0"
              >
                Analyze Wallet
              </Button>
              
              <Button 
                onClick={handleStartAnalysis}
                disabled={isAnalyzing}
                className="sm:flex-shrink-0"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Start Analysis'
                )}
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="rounded-lg border bg-card p-8">
              <Loading message="Loading masters data..." />
            </div>
          ) : masters.length > 0 ? (
            <div className="rounded-lg border bg-card overflow-hidden">
              <MastersTable masters={masters} />
            </div>
          ) : (
            <div className="rounded-lg border bg-card p-16 text-center">
              <h2 className="text-2xl font-semibold mb-4">No data available</h2>
              <p className="text-muted-foreground mb-8">
                Click the button above to start analysis!
              </p>
              <Button onClick={handleStartAnalysis} disabled={isAnalyzing}>
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Start Analysis'
                )}
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Masters;
