import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { 
      city, 
      maxDistance = 50, 
      minRating = 0, 
      maxPrice, 
      specialties = [] 
    } = await req.json()

    let query = supabaseClient
      .from('painters')
      .select(`
        *,
        users:user_id (
          full_name,
          city,
          avatar_url
        )
      `)
      .gte('rating', minRating)
      .eq('is_verified', true)

    if (maxPrice) {
      query = query.lte('hourly_rate', maxPrice)
    }

    if (specialties.length > 0) {
      query = query.overlaps('specialties', specialties)
    }

    if (city) {
      query = query.eq('users.city', city)
    }

    const { data: painters, error } = await query.order('rating', { ascending: false })

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ painters }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})