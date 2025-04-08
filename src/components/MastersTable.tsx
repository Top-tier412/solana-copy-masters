
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Master } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { Copy, CopyCheck, ArrowUpDown } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface MastersTableProps {
  masters: Master[];
}

type SortField = keyof Pick<Master, 'totalPnl' | 'unrealizedPnl' | 'winStreak' | 'winRate'> | '';
type SortDirection = 'asc' | 'desc';

const MastersTable: React.FC<MastersTableProps> = ({ masters }) => {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<SortField>('totalPnl');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc'); // Default to descending for new field
    }
  };

  const sortedMasters = [...masters].sort((a, b) => {
    if (sortField === '') return 0;
    
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return (aValue - bValue) * multiplier;
    }
    
    return 0;
  });

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address).then(
      () => {
        setCopiedAddress(address);
        setTimeout(() => setCopiedAddress(null), 2000);
      },
      (err) => {
        console.error('Could not copy address: ', err);
      }
    );
  };

  const formatPnl = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      signDisplay: 'always'
    }).format(value);
  };

  const formatWinRate = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(value / 100);
  };

  const formatTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return "Unknown";
    }
  };

  return (
    <div className="w-full overflow-auto">
      <Table className="min-w-max">
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Address</TableHead>
            
            <TableHead>
              <Button
                variant="ghost"
                size="sm" 
                className="-ml-3 hover:bg-transparent"
                onClick={() => handleSort('totalPnl')}
              >
                <span>Total PNL (30d)</span>
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </Button>
            </TableHead>
            
            <TableHead>
              <Button
                variant="ghost"
                size="sm" 
                className="-ml-3 hover:bg-transparent"
                onClick={() => handleSort('unrealizedPnl')}
              >
                <span>Unrealized PNL (30d)</span>
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </Button>
            </TableHead>
            
            <TableHead>
              <Button
                variant="ghost"
                size="sm" 
                className="-ml-3 hover:bg-transparent"
                onClick={() => handleSort('winStreak')}
              >
                <span>Win Streak</span>
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </Button>
            </TableHead>
            
            <TableHead>Trade Frequency</TableHead>
            <TableHead>Avg. Holding Time</TableHead>
            
            <TableHead>
              <Button
                variant="ghost"
                size="sm" 
                className="-ml-3 hover:bg-transparent"
                onClick={() => handleSort('winRate')}
              >
                <span>Win Rate</span>
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </Button>
            </TableHead>
            
            <TableHead>Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedMasters.map((master, index) => (
            <TableRow 
              key={master.id} 
              className="cursor-pointer hover:bg-solana-darkgray"
              onClick={() => navigate(`/masters/${master.address}`)}
            >
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span className="mr-2">{master.address}</span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 rounded-full p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(master.address);
                    }}
                  >
                    {copiedAddress === master.address ? (
                      <CopyCheck className="h-3 w-3 text-green-500" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </TableCell>
              <TableCell className={cn(
                master.totalPnl >= 0 ? "text-green-500" : "text-red-500"
              )}>
                {formatPnl(master.totalPnl)}
              </TableCell>
              <TableCell className={cn(
                master.unrealizedPnl >= 0 ? "text-green-500" : "text-red-500"
              )}>
                {formatPnl(master.unrealizedPnl)}
              </TableCell>
              <TableCell>{master.winStreak}</TableCell>
              <TableCell>{master.tradeFrequency}</TableCell>
              <TableCell>{master.avgHoldingTime}</TableCell>
              <TableCell>{formatWinRate(master.winRate)}</TableCell>
              <TableCell>{formatTime(master.lastUpdated)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MastersTable;
