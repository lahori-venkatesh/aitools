import React, { useState } from "react";
import { Link } from "wouter";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, Menu, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useMobile } from "@/lib/hooks";
import { useAuth, AuthUser } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Category } from "@shared/schema";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMobile();
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });
  const { user, isAuthenticated, isLoading } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user) return "U";

    const username = user.username || "";
    return username.substring(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/">
              <div className="flex items-center">
                <span className="text-primary text-2xl font-bold mr-2">
                  <i className="ri-robot-line"></i>
                </span>
                <span className="font-bold text-xl text-gray-900">AI Tool Hub</span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/">
              <span className="text-gray-700 hover:text-primary font-medium cursor-pointer">Home</span>
            </Link>
            <Link href="/tools">
              <span className="text-gray-700 hover:text-primary font-medium cursor-pointer">All Tools</span>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-gray-700 hover:text-primary font-medium flex items-center">
                  Browse by Category <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {categories.map((category: Category) => (
                  <DropdownMenuItem key={category.id}>
                    <Link href={`/category/${category.slug}`}>
                      <span className="w-full cursor-pointer">{category.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/submit">
              <span className="text-gray-700 hover:text-primary font-medium cursor-pointer">Submit a Tool</span>
            </Link>
            <Link href="/blog">
              <span className="text-gray-700 hover:text-primary font-medium cursor-pointer">Blog</span>
            </Link>
          </nav>

          {/* Auth buttons */}
          <div className="flex items-center space-x-4">
            {isLoading ? (
              <div className="hidden md:block w-24 h-10 bg-gray-200 animate-pulse rounded-md"></div>
            ) : isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="hidden md:flex items-center gap-2 hover:bg-gray-100"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage 
                        src={user?.profileImageUrl || ""} 
                        alt={user?.username || "User"} 
                      />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user?.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>My Favorites</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <a href="/api/logout" className="flex items-center w-full">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <a 
                  href="/api/login" 
                  className="hidden md:block text-gray-700 hover:text-primary font-medium"
                >
                  Login
                </a>
                <a href="/api/login" className="hidden md:block">
                  <Button>Sign Up</Button>
                </a>
              </>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link href="/">
              <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 cursor-pointer">
                Home
              </span>
            </Link>
            {categories.map((category: Category) => (
              <Link key={category.id} href={`/#${category.slug}`}>
                <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 cursor-pointer">
                  {category.name}
                </span>
              </Link>
            ))}
            <Link href="/submit">
              <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 cursor-pointer">
                Submit a Tool
              </span>
            </Link>
            <Link href="/blog">
              <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 cursor-pointer">
                Blog
              </span>
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-200">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center px-3 py-2">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage 
                        src={user?.profileImageUrl || ""} 
                        alt={user?.username || "User"} 
                      />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-base font-medium text-gray-700">{user?.username}</span>
                  </div>
                  <a 
                    href="/api/logout"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                  >
                    Logout
                  </a>
                </>
              ) : (
                <>
                  <a 
                    href="/api/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                  >
                    Login
                  </a>
                  <a href="/api/login">
                    <Button className="w-full mt-1 justify-center">Sign Up</Button>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;