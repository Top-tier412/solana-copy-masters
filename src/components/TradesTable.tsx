
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Trade } from "@/services/api";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface TradesTableProps {
  trades: Trade[];
}

const TradesTable: React.FC<TradesTableProps> = ({ trades }) => {
  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatTokenAmount = (value: number, token: string) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: token === 'BONK' ? 0 : 4
    }).format(value);
  };

  const formatTime = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy HH:mm:ss');
    } catch (e) {
      return "Unknown";
    }
  };

  return (
    <div className="w-full overflow-auto">
      <Table className="min-w-max">
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Token</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Token Address</TableHead>
            <TableHead>USD Value</TableHead>
            <TableHead>Transaction</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trades.map((trade) => (
            <TableRow key={trade.id}>
              <TableCell>{formatTime(trade.time)}</TableCell>
              <TableCell>
                <span className={cn(
                  "px-2 py-1 rounded text-xs font-medium",
                  trade.type === 'BUY' 
                    ? "bg-green-500/20 text-green-500" 
                    : "bg-red-500/20 text-red-500"
                )}>
                  {trade.type}
                </span>
              </TableCell>
              <TableCell>{trade.token}</TableCell>
              <TableCell>
                {formatTokenAmount(trade.tokenAmount, trade.token)} {trade.token}
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span className="mr-2">{trade.tokenAddress}</span>
                  <a
                    href={`https://solscan.io/token/${trade.tokenAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 rounded-full p-0"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </a>
                </div>
              </TableCell>
              <TableCell>{formatAmount(trade.amountUsd)}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span className="mr-2">{trade.transactionHash}</span>
                  <a
                    href={`https://solscan.io/tx/${trade.transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 rounded-full p-0"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </a>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TradesTable;
