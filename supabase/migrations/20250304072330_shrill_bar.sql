-- Drop the existing trigger and function to recreate it with better error handling
DROP TRIGGER IF EXISTS create_profile_after_signup ON auth.users;
DROP FUNCTION IF EXISTS create_profile_for_user();