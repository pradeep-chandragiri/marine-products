import { supabase } from "@/integrations/supabase/client";

export { supabase };

export type UserRole = "seller" | "buyer" | "admin";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserRoleData {
  id: string;
  user_id: string;
  role: UserRole;
  created_at: string;
}

export const getUserRole = async (userId: string): Promise<UserRole | null> => {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .single();

  if (error || !data) return null;
  return data.role as UserRole;
};

export const setUserRole = async (userId: string, role: UserRole) => {
  const { error } = await supabase
    .from("user_roles")
    .insert({ user_id: userId, role });

  if (error) throw error;
};
