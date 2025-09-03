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

    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token)
    
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const {
      project_id,
      painter_id,
      rating,
      comment = ''
    } = await req.json()

    if (!project_id || !painter_id || !rating) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (rating < 1 || rating > 5) {
      return new Response(JSON.stringify({ error: 'Rating must be between 1 and 5' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Verify user owns the project and project is completed
    const { data: project, error: projectError } = await supabaseClient
      .from('projects')
      .select('client_id, status')
      .eq('id', project_id)
      .single()

    if (projectError || !project) {
      return new Response(JSON.stringify({ error: 'Project not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (project.client_id !== user.id) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (project.status !== 'completed') {
      return new Response(JSON.stringify({ error: 'Project must be completed to leave a review' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Check if review already exists
    const { data: existingReview } = await supabaseClient
      .from('reviews')
      .select('id')
      .eq('project_id', project_id)
      .eq('client_id', user.id)
      .single()

    if (existingReview) {
      return new Response(JSON.stringify({ error: 'Review already exists for this project' }), {
        status: 409,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { data: review, error } = await supabaseClient
      .from('reviews')
      .insert({
        project_id,
        client_id: user.id,
        painter_id,
        rating,
        comment
      })
      .select(`
        *,
        users:client_id (
          full_name,
          avatar_url
        )
      `)
      .single()

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ review }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})