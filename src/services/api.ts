
import { toast } from "sonner";

// Define data types
export interface Master {
  id: string;
  address: string;
  totalPnl: number;
  unrealizedPnl: number;
  winStreak: number;
  tradeFrequency: string;
  avgHoldingTime: string;
  winRate: number;
  lastUpdated: string;
}

export interface Trade {
  id: string;
  time: string;
  type: 'BUY' | 'SELL';
  token: string;
  tokenAmount: number;
  tokenAddress: string;
  amountUsd: number;
  transactionHash: string;
}

// Base API URL
const API_BASE_URL = 'https://api.example.com'; // Replace with actual API URL

// Helper for handling fetch responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(error.message || `API error with status: ${response.status}`);
  }
  return response.json();
};

// API functions
export const apiService = {
  // Get all masters
  getMasters: async (): Promise<Master[]> => {
    try {
      // This is a mock implementation - replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/masters`);
      // return handleResponse(response);
      
      // Mock data for development
      await new Promise(resolve => setTimeout(resolve, 1500));
      return Array(10).fill(null).map((_, index) => ({
        id: `master-${index}`,
        address: `${index % 2 === 0 ? 'Cx' : 'Bx'}${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 6)}`,
        totalPnl: Math.random() * 100000 * (Math.random() > 0.3 ? 1 : -1),
        unrealizedPnl: Math.random() * 50000 * (Math.random() > 0.5 ? 1 : -1),
        winStreak: Math.floor(Math.random() * 20),
        tradeFrequency: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
        avgHoldingTime: `${Math.floor(Math.random() * 48)}h ${Math.floor(Math.random() * 60)}m`,
        winRate: Math.random() * 100,
        lastUpdated: new Date(Date.now() - Math.random() * 86400000 * 5).toISOString(),
      }));
    } catch (error) {
      console.error('Failed to fetch masters:', error);
      toast.error('Failed to fetch masters data');
      return [];
    }
  },

  // Get a specific master by address
  getMasterByAddress: async (address: string): Promise<Master | null> => {
    try {
      // This is a mock implementation - replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/masters/${address}`);
      // return handleResponse(response);
      
      // Mock data for development
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        id: `master-${address}`,
        address: address,
        totalPnl: Math.random() * 100000 * (Math.random() > 0.3 ? 1 : -1),
        unrealizedPnl: Math.random() * 50000 * (Math.random() > 0.5 ? 1 : -1),
        winStreak: Math.floor(Math.random() * 20),
        tradeFrequency: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
        avgHoldingTime: `${Math.floor(Math.random() * 48)}h ${Math.floor(Math.random() * 60)}m`,
        winRate: Math.random() * 100,
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      console.error(`Failed to fetch master with address ${address}:`, error);
      toast.error('Failed to fetch master data');
      return null;
    }
  },

  // Get trades by master address
  getTradesByMaster: async (address: string): Promise<Trade[]> => {
    try {
      // This is a mock implementation - replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/masters/${address}/trades`);
      // return handleResponse(response);
      
      // Mock data for development
      await new Promise(resolve => setTimeout(resolve, 1200));
      return Array(20).fill(null).map((_, index) => ({
        id: `trade-${index}`,
        time: new Date(Date.now() - Math.random() * 86400000 * 30).toISOString(),
        type: Math.random() > 0.5 ? 'BUY' : 'SELL',
        token: ['SOL', 'BONK', 'JTO', 'RAY', 'ORCA'][Math.floor(Math.random() * 5)],
        tokenAmount: Math.random() * 1000,
        tokenAddress: `${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 6)}`,
        amountUsd: Math.random() * 10000,
        transactionHash: `${Math.random().toString(36).substring(2, 15)}...${Math.random().toString(36).substring(2, 10)}`,
      }));
    } catch (error) {
      console.error(`Failed to fetch trades for master ${address}:`, error);
      toast.error('Failed to fetch trade history');
      return [];
    }
  },

  // Start analysis for a specific wallet address
  startAnalysis: async (address: string): Promise<boolean> => {
    try {
      // This is a mock implementation - replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/analyze`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ address }),
      // });
      // return handleResponse(response);
      
      // Mock for development
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success(`Analysis started for wallet: ${address}`);
      return true;
    } catch (error) {
      console.error('Failed to start analysis:', error);
      toast.error('Failed to start analysis');
      return false;
    }
  },

  // Update master data
  updateMaster: async (address: string): Promise<boolean> => {
    try {
      // This is a mock implementation - replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/masters/${address}/update`, {
      //   method: 'POST',
      // });
      // return handleResponse(response);
      
      // Mock for development
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Master data updated successfully');
      return true;
    } catch (error) {
      console.error('Failed to update master:', error);
      toast.error('Failed to update master data');
      return false;
    }
  }
};
