-- Seed data for newsletter_subscriptions table
INSERT INTO public.newsletter_subscriptions (email, status, created_at)
VALUES 
  ('test1@example.com', 'active', now() - interval '10 days'),
  ('test2@example.com', 'active', now() - interval '7 days'),
  ('test3@example.com', 'unsubscribed', now() - interval '5 days')
ON CONFLICT (email) DO NOTHING;
