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

    // Verify user is a painter
    const { data: painter } = await supabaseClient
      .from('painters')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (!painter) {
      return new Response(JSON.stringify({ error: 'Only painters can create proposals' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const {
      project_id,
      message,
      estimated_price,
      estimated_duration_days,
      materials_included = false
    } = await req.json()

    if (!project_id || !message || !estimated_price || !estimated_duration_days) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Check if painter already submitted proposal for this project
    const { data: existingProposal } = await supabaseClient
      .from('proposals')
      .select('id')
      .eq('project_id', project_id)
      .eq('painter_id', painter.id)
      .single()

    if (existingProposal) {
      return new Response(JSON.stringify({ error: 'Proposal already exists for this project' }), {
        status: 409,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { data: proposal, error } = await supabaseClient
      .from('proposals')
      .insert({
        project_id,
        painter_id: painter.id,
        message,
        estimated_price,
        estimated_duration_days,
        materials_included,
        status: 'pending'
      })
      .select(`
        *,
        painters:painter_id (
          *,
          users:user_id (
            full_name,
            avatar_url
          )
        )
      `)
      .single()

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ proposal }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})