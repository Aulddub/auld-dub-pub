// Supabase Edge Function to automatically delete old events
// This function runs daily at 00:01 via pg_cron

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client with service role key for admin access
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Get yesterday's date (anything before today)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayStr = today.toISOString().split('T')[0]

    console.log(`Cleaning up events before ${todayStr}`)

    // Delete old bands (before today)
    const { data: deletedBands, error: bandsError } = await supabaseClient
      .from('bands')
      .delete()
      .lt('date', todayStr)
      .select()

    if (bandsError) {
      console.error('Error deleting old bands:', bandsError)
      throw bandsError
    }

    console.log(`Deleted ${deletedBands?.length || 0} old bands`)

    // Delete old matches (before today)
    const { data: deletedMatches, error: matchesError } = await supabaseClient
      .from('matches')
      .delete()
      .lt('date', todayStr)
      .select()

    if (matchesError) {
      console.error('Error deleting old matches:', matchesError)
      throw matchesError
    }

    console.log(`Deleted ${deletedMatches?.length || 0} old matches`)

    const response = {
      success: true,
      message: 'Cleanup completed successfully',
      deletedBands: deletedBands?.length || 0,
      deletedMatches: deletedMatches?.length || 0,
      date: todayStr
    }

    return new Response(
      JSON.stringify(response),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    console.error('Error in cleanup function:', error)

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
