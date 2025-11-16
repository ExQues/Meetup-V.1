-- Grant permissions for admin_users table
GRANT ALL ON admin_users TO anon;
GRANT ALL ON admin_users TO authenticated;

-- Grant permissions for the entire schema if needed
GRANT ALL ON SCHEMA public TO anon;
GRANT ALL ON SCHEMA public TO authenticated;