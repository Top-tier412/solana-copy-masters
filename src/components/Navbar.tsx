
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { HelpCircle, LogOut } from "lucide-react";

const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <nav className="bg-solana-darkgray py-4 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-xl font-bold gradient-text">
          Solana Copy Masters
        </Link>
        
        <div className="hidden md:flex space-x-6">
          <NavLink to="/" currentPath={location.pathname}>
            Home
          </NavLink>
          <NavLink to="/masters" currentPath={location.pathname}>
            Masters
          </NavLink>
          <NavLink to="/help" currentPath={location.pathname}>
            <HelpCircle className="h-4 w-4 mr-1" />
            Help
          </NavLink>
        </div>
      </div>
      
      {user && (
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground hidden md:inline-block">
            Welcome, {user.name}
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={logout} 
            className="text-muted-foreground hover:text-white"
          >
            <LogOut className="h-4 w-4 mr-1" />
            <span className="hidden md:inline">Logout</span>
          </Button>
        </div>
      )}
    </nav>
  );
};

interface NavLinkProps {
  children: React.ReactNode;
  to: string;
  currentPath: string;
}

const NavLink: React.FC<NavLinkProps> = ({ children, to, currentPath }) => {
  const isActive = currentPath === to;
  
  return (
    <Link
      to={to}
      className={`flex items-center text-sm font-medium transition-colors ${
        isActive 
          ? "text-white border-b-2 border-solana-purple" 
          : "text-muted-foreground hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;
