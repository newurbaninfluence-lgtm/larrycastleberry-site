-- Run this in your Supabase SQL editor
-- Creates the blog_posts table for Larry Castleberry site

create table if not exists blog_posts (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  excerpt     text,
  content     text,
  cat         text,
  emoji       text,
  image_url   text,
  published   boolean default true,
  created_at  timestamptz default now()
);

-- Enable public read access
alter table blog_posts enable row level security;
create policy "Public can read published posts"
  on blog_posts for select
  using (published = true);

-- Seed with existing static posts
insert into blog_posts (slug, title, excerpt, content, cat, emoji, published) values
(
  'why-companies-need-storyteller',
  'Why Every Company Needs a Storyteller',
  'Data tells what happened. Stories tell why it matters.',
  E'In the corporate world, data tells you what happened. But stories tell you why it matters.\n\nEvery great brand has a story. Apple didn''t just sell computers — Steve Jobs told stories about thinking differently.\n\nAs a storyteller who has worked with Fortune-level companies like Ford Motor Company and Pfizer, I''ve seen firsthand how the right story at the right moment can transform a room.',
  'Storytelling', '🎤', true
),
(
  'story-behind-hush-your-mouth',
  'The Story Behind Hush Your Mouth',
  'Every family has secrets. And every secret has a story worth telling.',
  E'Every family has secrets. And every secret has a story worth telling.\n\nGrowing up in Detroit, there were certain phrases that echoed through our household. Hush your mouth, what you say! was one of them.\n\nThose stories shaped who I am today as a storyteller.',
  'Behind the Book', '📖', true
),
(
  '5-tips-voice-acting',
  '5 Tips for Bringing Characters to Life',
  'Great voice acting isn''t about changing your voice. It''s about intention.',
  E'Great voice acting isn''t about changing your voice. It''s about changing your intention.\n\n1. Listen before you speak\n2. Your body informs your voice\n3. The pause is more powerful than the word\n4. Find the character''s rhythm\n5. Be vulnerable — the best performances come from truth',
  'Voice Acting', '🎭', true
)
on conflict (slug) do nothing;
