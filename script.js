// script.js
const SUPABASE_URL = 'https://vidhefbvribdzlrqmtgv.supabase.co';  // Replace with yours
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpZGhlZmJ2cmliZHpscnFtdGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0MTQ5NTEsImV4cCI6MjA4MDk5MDk1MX0.tBY6ePajzRqCWkTzzsYbuwuOEfP0uCKXL6eiX6XO0Cw';  // Replace with yours

const { createClient } = supabase;
const _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Utility to get current session
async function getSession() {
    const { data: { session } } = await _supabase.auth.getSession();
    if (session) {
        window.location.href = '/dashboard.html';  // Redirect to dashboard (implement later)
    }
}

// Login function (used in login.html)
async function login(email, password) {
    const { data, error } = await _supabase.auth.signInWithPassword({ email, password });
    if (error) {
        alert('Login failed: ' + error.message);
        return;
    }
    // Fetch user profile from dbo_user
    const { data: userProfile, error: profileError } = await _supabase
        .from('dbo_user')
        .select('*')
        .eq('user_id', data.user.id)
        .single();
    if (profileError) {
        alert('Error fetching profile: ' + profileError.message);
        return;
    }
    console.log('Logged in user:', userProfile);
    window.location.href = '/dashboard.html';  // Redirect to main app (implement later)
}

// Check session on load
document.addEventListener('DOMContentLoaded', getSession);