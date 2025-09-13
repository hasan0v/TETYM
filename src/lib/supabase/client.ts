import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Check if Supabase environment variables are available
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    // Return a mock client for demo purposes when Supabase is not configured
    const mockClient = {
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null })
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            eq: () => ({
              single: () => Promise.resolve({ data: null, error: null })
            }),
            single: () => Promise.resolve({ data: null, error: null })
          })
        })
      }),
      storage: {
        from: () => ({
          getPublicUrl: () => ({ data: { publicUrl: '' } }),
          upload: () => Promise.resolve({ data: null, error: null }),
          remove: () => Promise.resolve({ error: null })
        })
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return mockClient as any
  }

  return createBrowserClient(
    supabaseUrl,
    supabaseKey
  )
}

// Convenience function for client-side usage
export const supabase = createClient()

// Storage helper functions
export const getPublicUrl = (bucket: string, path: string) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

export const uploadFile = async (
  bucket: string,
  path: string,
  file: File,
  options?: { cacheControl?: string; upsert?: boolean }
) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, options)
  
  if (error) throw error
  return data
}

export const deleteFile = async (bucket: string, path: string) => {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path])
  
  if (error) throw error
}
