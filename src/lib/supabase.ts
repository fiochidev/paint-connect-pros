import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          role: 'client' | 'painter'
          avatar_url: string | null
          address: string | null
          city: string | null
          state: string | null
          zip_code: string | null
          created_at: string
          updated_at: string
        }
      }
      painters: {
        Row: {
          id: string
          user_id: string
          business_name: string | null
          description: string | null
          experience_years: number | null
          specialties: string[] | null
          service_radius: number
          hourly_rate: number | null
          portfolio_images: string[] | null
          certifications: string[] | null
          is_verified: boolean
          rating: number
          total_reviews: number
          created_at: string
          updated_at: string
        }
      }
      projects: {
        Row: {
          id: string
          client_id: string
          title: string
          description: string
          location: string
          estimated_budget: number | null
          project_images: string[] | null
          preferred_start_date: string | null
          status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
          created_at: string
          updated_at: string
        }
      }
      proposals: {
        Row: {
          id: string
          project_id: string
          painter_id: string
          message: string
          estimated_price: number
          estimated_duration_days: number
          materials_included: boolean
          status: 'pending' | 'accepted' | 'rejected'
          created_at: string
          updated_at: string
        }
      }
      reviews: {
        Row: {
          id: string
          project_id: string
          client_id: string
          painter_id: string
          rating: number
          comment: string | null
          created_at: string
        }
      }
    }
  }
}