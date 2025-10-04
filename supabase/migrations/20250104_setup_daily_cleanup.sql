-- Enable pg_cron extension (if not already enabled)
-- Note: This may require database admin privileges
-- Run this in Supabase SQL Editor if you get permission errors

-- Enable the pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Grant usage on cron schema to postgres user
GRANT USAGE ON SCHEMA cron TO postgres;

-- Create a scheduled job to run cleanup every day at 00:01
SELECT cron.schedule(
  'daily-cleanup-old-events',  -- Job name
  '1 0 * * *',                  -- Cron expression: At 00:01 every day
  $$
  -- Delete old bands (before today)
  DELETE FROM bands WHERE date < CURRENT_DATE;

  -- Delete old matches (before today)
  DELETE FROM matches WHERE date < CURRENT_DATE;
  $$
);

-- Verify the job was created
SELECT * FROM cron.job;

-- Optional: View job run history
-- SELECT * FROM cron.job_run_details ORDER BY start_time DESC LIMIT 10;
