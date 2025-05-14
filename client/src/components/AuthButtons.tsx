import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LogIn, UserPlus } from "lucide-react";

interface AuthButtonsProps {
  className?: string;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

const AuthButtons = ({ 
  className = "", 
  variant = "default",
  size = "default" 
}: AuthButtonsProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className={`flex space-x-2 ${className}`}>
        <div className="h-10 w-20 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-10 w-20 bg-gray-200 animate-pulse rounded"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // User is already authenticated, don't show login/signup buttons
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <a href="/api/login" className="inline-block">
        <Button variant="outline" size={size} className="gap-1.5">
          <LogIn className="h-4 w-4" />
          <span>Log In</span>
        </Button>
      </a>
      <a href="/api/login" className="inline-block">
        <Button variant={variant} size={size} className="gap-1.5">
          <UserPlus className="h-4 w-4" />
          <span>Sign Up</span>
        </Button>
      </a>
    </div>
  );
};

export default AuthButtons;