
import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import TradesTable from "@/components/TradesTable";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { apiService, Master, Trade } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { formatDistanceToNow } from "date-fns";
import { RefreshCw, Copy, CopyCheck } from "lucide-react";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from "@/lib/utils";

const MasterDetail: React.FC = () => {
  const { address } = useParams<{ address: string }>();
  const [master, setMaster] = useState<Master | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const vizRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    
    if (!address) {
      navigate('/masters');
      return;
    }
    
    fetchMasterData();
  }, [address, isAuthenticated, navigate]);
  
  const fetchMasterData = async () => {
    if (!address) return;
    
    setIsLoading(true);
    try {
      const masterData = await apiService.getMasterByAddress(address);
      const tradesData = await apiService.getTradesByMaster(address);
      
      setMaster(masterData);
      setTrades(tradesData);
    } catch (error) {
      console.error("Error fetching master data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUpdate = async () => {
    if (!address) return;
    
    setIsUpdating(true);
    try {
      await apiService.updateMaster(address);
      await fetchMasterData();
    } catch (error) {
      console.error("Error updating master:", error);
    } finally {
      setIsUpdating(false);
    }
  };
  
  const copyToClipboard = () => {
    if (!address) return;
    
    navigator.clipboard.writeText(address).then(
      () => {
        setCopiedAddress(true);
        setTimeout(() => setCopiedAddress(false), 2000);
      },
      (err) => {
        console.error('Could not copy address: ', err);
      }
    );
  };
  
  const formatPnl = (value: number | undefined) => {
    if (value === undefined) return "$0";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      signDisplay: 'always'
    }).format(value);
  };
  
  const formatWinRate = (value: number | undefined) => {
    if (value === undefined) return "0%";
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(value / 100);
  };
  
  useEffect(() => {
    // This is where you would initialize D3.js visualization
    // For now, we'll create a simple placeholder
    if (vizRef.current && !isLoading) {
      const vizContainer = vizRef.current;
      vizContainer.innerHTML = ''; // Clear previous visualization
      
      // Create placeholder visualization
      const placeholderText = document.createElement('div');
      placeholderText.className = 'flex flex-col items-center justify-center h-full';
      placeholderText.innerHTML = `
        <div class="text-center">
          <p class="text-lg mb-4">3D Transaction Visualization</p>
          <p class="text-muted-foreground text-sm">
            This section will display a 3D network visualization of transactions.<br/>
            D3.js integration will be implemented in the next phase.
          </p>
        </div>
      `;
      vizContainer.appendChild(placeholderText);
    }
  }, [isLoading, master]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-background">
          <div className="container mx-auto py-8 px-4">
            <Loading message="Loading wallet data..." />
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-background">
        <div className="container mx-auto py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Left Section (4/5 width) with Vertical ResizablePanelGroup */}
            <div className="md:col-span-4">
              <ResizablePanelGroup direction="vertical">
                {/* Top Section - 3D Visualization */}
                <ResizablePanel defaultSize={40} minSize={20}>
                  <div className="h-full rounded-lg border bg-card p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl font-bold">Transaction Visualization</h2>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          3D visualization of transaction flow
                        </p>
                      </div>
                    </div>
                    
                    <div 
                      ref={vizRef}
                      className="h-[calc(100%-3rem)] rounded-lg border bg-muted/20 flex items-center justify-center"
                    >
                      <div className="text-center">
                        <p className="text-lg mb-4">3D Transaction Visualization</p>
                        <p className="text-muted-foreground text-sm">
                          Loading visualization...
                        </p>
                      </div>
                    </div>
                  </div>
                </ResizablePanel>
                
                {/* Bottom Section - Trade History */}
                <ResizablePanel defaultSize={60} minSize={20}>
                  <div className="h-full rounded-lg border bg-card p-6">
                    <h2 className="text-xl font-bold mb-4">Trade History</h2>
                    {trades.length > 0 ? (
                      <div className="overflow-auto h-[calc(100%-3rem)]">
                        <TradesTable trades={trades} />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-[calc(100%-3rem)]">
                        <p className="text-muted-foreground">No trade history available</p>
                      </div>
                    )}
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
            
            {/* Right Sidebar - 1/5 width */}
            <div className="md:col-span-1">
              {/* Master Details Card */}
              <div className="rounded-lg border bg-card p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="font-semibold">Wallet Details</h2>
                  <Button 
                    onClick={handleUpdate}
                    size="sm"
                    disabled={isUpdating}
                    variant="outline"
                    className="h-8"
                  >
                    {isUpdating ? (
                      <>
                        <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
                        Updating
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-1 h-3 w-3" />
                        Update
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="mb-2">
                  <div className="flex items-center gap-1 mb-1">
                    <p className="text-xs text-muted-foreground">Address</p>
                    <div 
                      className="cursor-pointer text-xs hover:text-foreground ml-auto"
                      onClick={copyToClipboard}
                    >
                      {copiedAddress ? (
                        <CopyCheck className="h-3 w-3 text-green-500" />
                      ) : (
                        <Copy className="h-3 w-3 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs font-medium truncate">{address}</p>
                </div>
                
                <div className="text-xs text-muted-foreground mt-1 mb-3">
                  Last updated: {master?.lastUpdated 
                    ? formatDistanceToNow(new Date(master.lastUpdated), { addSuffix: true })
                    : "Never"
                  }
                </div>
                
                <div className="space-y-2">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Total PNL (30d)</p>
                    <p className={cn(
                      "text-sm font-bold",
                      master?.totalPnl !== undefined && (master.totalPnl >= 0 ? "text-green-500" : "text-red-500")
                    )}>
                      {formatPnl(master?.totalPnl)}
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Unrealized PNL (30d)</p>
                    <p className={cn(
                      "text-sm font-bold",
                      master?.unrealizedPnl !== undefined && (master.unrealizedPnl >= 0 ? "text-green-500" : "text-red-500")
                    )}>
                      {formatPnl(master?.unrealizedPnl)}
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Win Rate</p>
                    <p className={cn(
                      "text-sm font-bold",
                      master?.winRate !== undefined && (master.winRate > 50 ? "text-green-500" : "text-red-500")
                    )}>
                      {formatWinRate(master?.winRate)}
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Win Streak</p>
                    <p className={cn(
                      "text-sm font-bold",
                      master?.winStreak !== undefined && (master.winStreak > 0 ? "text-green-500" : "text-red-500")
                    )}>
                      {master?.winStreak?.toString() || "0"}
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Trade Frequency</p>
                    <p className="text-sm font-bold">
                      {master?.tradeFrequency || "Unknown"}
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Avg. Holding Time</p>
                    <p className="text-sm font-bold">
                      {master?.avgHoldingTime || "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Recent Activity Card */}
              <div className="rounded-lg border bg-card p-6">
                <h2 className="font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {trades.slice(0, 5).map((trade, index) => (
                    <div key={index} className="border-b border-border pb-3 last:border-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className={cn(
                          "px-1.5 py-0.5 rounded text-xs font-medium",
                          trade.type === 'BUY' 
                            ? "bg-green-500/20 text-green-500" 
                            : "bg-red-500/20 text-red-500"
                        )}>
                          {trade.type}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(trade.time), { addSuffix: true })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{trade.token}</span>
                        <span className="text-sm font-medium">
                          ${new Intl.NumberFormat('en-US').format(trade.amountUsd)}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {trades.length === 0 && (
                    <div className="text-center text-muted-foreground text-sm py-4">
                      No recent activity
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: string;
  isPositive?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, isPositive }) => {
  return (
    <div className="bg-muted/50 rounded-lg p-4">
      <p className="text-sm text-muted-foreground mb-1">{title}</p>
      <p className={cn(
        "text-lg font-bold",
        isPositive !== undefined && (isPositive ? "text-green-500" : "text-red-500")
      )}>
        {value}
      </p>
    </div>
  );
};

export default MasterDetail;
