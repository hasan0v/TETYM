import { createClient } from '@/lib/supabase/server'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
import { AdminUser } from '@/types'

export async function getCurrentUser() {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return null
  }
  
  return user
}

export async function getCurrentAdminUser(): Promise<AdminUser | null> {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return null
  }
  
  const { data: adminUser, error: adminError } = await supabase
    .from('admin_users')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .single()
  
  if (adminError || !adminUser) {
    return null
  }
  
  return adminUser
}

export async function signInWithEmail(email: string, password: string) {
  const supabase = createBrowserClient()
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  return { data, error }
}

export async function signUpWithEmail(email: string, password: string) {
  const supabase = createBrowserClient()
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  
  return { data, error }
}

export async function signOut() {
  const supabase = createBrowserClient()
  
  const { error } = await supabase.auth.signOut()
  
  return { error }
}

export async function resetPassword(email: string) {
  const supabase = createBrowserClient()
  
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/callback`,
  })
  
  return { data, error }
}

export async function updatePassword(password: string) {
  const supabase = createBrowserClient()
  
  const { data, error } = await supabase.auth.updateUser({
    password,
  })
  
  return { data, error }
}

export async function checkAdminRole(requiredRole?: string): Promise<boolean> {
  const adminUser = await getCurrentAdminUser()
  
  if (!adminUser) {
    return false
  }
  
  if (!requiredRole) {
    return true
  }
  
  const roleHierarchy = {
    'super_admin': 4,
    'admin': 3,
    'editor': 2,
    'moderator': 1
  }
  
  const userRoleLevel = roleHierarchy[adminUser.role as keyof typeof roleHierarchy] || 0
  const requiredRoleLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0
  
  return userRoleLevel >= requiredRoleLevel
}

export function hasPermission(userRole: string, requiredRole: string): boolean {
  const roleHierarchy = {
    'super_admin': 4,
    'admin': 3,
    'editor': 2,
    'moderator': 1
  }
  
  const userRoleLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] || 0
  const requiredRoleLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0
  
  return userRoleLevel >= requiredRoleLevel
}

export async function updateLastLogin(userId: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('admin_users')
    .update({ 
      last_login: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId)
  
  return { error }
}
