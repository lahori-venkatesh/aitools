import { useQuery } from "@tanstack/react-query";
import { User } from "@shared/schema";

// Define what we expect from the auth user object
export interface AuthUser {
  id: string | number;
  username?: string;
  email?: string;
  profileImageUrl?: string;
  isAdmin?: boolean;
  firstName?: string;
  lastName?: string;
}

export function useAuth() {
  const { data: user, isLoading } = useQuery<AuthUser>({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}