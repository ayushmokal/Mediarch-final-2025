-- Create subscription_status enum type if it doesn't exist
CREATE TYPE IF NOT EXISTS public.subscription_status AS ENUM ('active', 'unsubscribed');

-- Create newsletter_subscriptions table
CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    status subscription_status NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT now(),
    
    -- Add constraints
    CONSTRAINT newsletter_subscriptions_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Add comment to the table
COMMENT ON TABLE public.newsletter_subscriptions IS 'Stores newsletter subscription information';

-- Set up Row Level Security (RLS)
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow insert for anyone" ON public.newsletter_subscriptions
    FOR INSERT TO anon
    WITH CHECK (true);

CREATE POLICY "Allow select for authenticated users only" ON public.newsletter_subscriptions
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Allow update for authenticated users only" ON public.newsletter_subscriptions
    FOR UPDATE TO authenticated
    USING (true);

CREATE POLICY "Allow delete for authenticated users only" ON public.newsletter_subscriptions
    FOR DELETE TO authenticated
    USING (true);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS newsletter_subscriptions_email_idx ON public.newsletter_subscriptions (email);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS newsletter_subscriptions_status_idx ON public.newsletter_subscriptions (status);
