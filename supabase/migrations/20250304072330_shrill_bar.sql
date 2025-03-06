-- Drop the existing trigger and function to recreate it with better error handling
DROP TRIGGER IF EXISTS create_profile_after_signup ON auth.users;
DROP FUNCTION IF EXISTS create_profile_for_user();

-- Create an improved function for profile creation with error handling
CREATE OR REPLACE FUNCTION create_profile_for_user()
RETURNS TRIGGER AS $$
BEGIN

  -- Insert with ON CONFLICT DO NOTHING to prevent errors with duplicate profiles
  INSERT INTO public.profiles (id)
  VALUES (NEW.id)
  ON CONFLICT (id) DO NOTHING;