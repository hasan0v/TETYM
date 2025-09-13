export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export interface AdminUser {
  id: string
  user_id: string
  email: string
  full_name: string
  role: 'super_admin' | 'admin' | 'editor' | 'moderator'
  avatar_url?: string
  is_active: boolean
  last_login?: string
  created_at: string
  updated_at: string
}

export interface Student {
  id: string
  full_name: string
  email: string
  phone?: string
  birth_date?: string
  address?: string
  school?: string
  grade?: string
  interests?: string[]
  bio?: string
  avatar_url?: string
  portfolio_url?: string
  github_url?: string
  linkedin_url?: string
  is_featured: boolean
  status: 'active' | 'inactive' | 'graduated'
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  title: string
  description: string
  full_description?: string
  category: string
  technologies: string[]
  difficulty_level: 'beginner' | 'intermediate' | 'advanced'
  featured_image?: string
  gallery_images?: string[]
  demo_url?: string
  github_url?: string
  video_url?: string
  status: 'planning' | 'development' | 'completed' | 'archived'
  is_featured: boolean
  student_id?: string
  team_members?: string[]
  start_date?: string
  end_date?: string
  achievements?: string[]
  created_at: string
  updated_at: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  category: string
  date_achieved: string
  organization?: string
  certificate_url?: string
  image_url?: string
  student_id?: string
  project_id?: string
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface Club {
  id: string
  name: string
  description: string
  full_description?: string
  category: string
  logo_url?: string
  cover_image?: string
  meeting_schedule?: string
  location?: string
  contact_email?: string
  contact_phone?: string
  social_links?: Record<string, string>
  is_active: boolean
  member_count?: number
  advisor?: string
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  featured_image?: string
  category: string
  tags?: string[]
  author_id: string
  status: 'draft' | 'published' | 'archived'
  is_featured: boolean
  views: number
  published_at?: string
  created_at: string
  updated_at: string
}

export interface Comment {
  id: string
  content: string
  author_name: string
  author_email: string
  post_id: string
  parent_id?: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
}

export interface ContentPage {
  id: string
  slug: string
  title: string
  content: string
  meta_title?: string
  meta_description?: string
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface FileUpload {
  id: string
  original_name: string
  file_name: string
  file_path: string
  file_size: number
  mime_type: string
  uploaded_by?: string
  usage_type: 'project' | 'blog' | 'achievement' | 'club' | 'profile' | 'application'
  usage_id?: string
  created_at: string
}

// Form types
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface ApplicationFormData {
  student_id: string
  full_name: string
  email: string
  phone: string
  birth_date: string
  address: string
  school: string
  grade: string
  interests: string[]
  bio: string
  portfolio_url?: string
  github_url?: string
  linkedin_url?: string
  cv_file?: File
  portfolio_files?: File[]
}

// API Response types
export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Media types
export interface MediaFile {
  id: string
  original_name: string
  file_name: string
  file_path: string
  file_size: number
  mime_type: string
  uploaded_by?: string
  usage_type: 'project' | 'blog' | 'achievement' | 'club' | 'profile' | 'application'
  usage_id?: string
  created_at: string
}

export interface StorageBucket {
  id: string
  name: string
  public: boolean
  file_size_limit: number
  allowed_mime_types: string[]
}

export type MediaCategory = 
  | 'image' 
  | 'video' 
  | 'audio' 
  | 'document' 
  | 'archive'

export interface UploadOptions {
  bucket: string
  folder?: string
  filename?: string
  maxSize?: number
  allowedTypes?: string[]
  generateThumbnail?: boolean
  uploadedBy?: string
  usageType?: string
  usageId?: string
}
