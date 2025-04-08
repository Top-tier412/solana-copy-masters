
import React from "react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  message?: string;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ 
  message = "Loading data...", 
  className 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8", className)}>
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-muted animate-pulse-glow"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-solana-purple animate-pulse"></div>
        </div>
      </div>
      
      <div className="mt-4 flex flex-col items-center">
        <p className="text-lg font-medium">{message}</p>
        <div className="mt-2 flex space-x-1">
          <div className="w-2 h-2 bg-solana-purple rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 bg-solana-purple rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 bg-solana-purple rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
