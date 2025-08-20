Supabase Events App

A simple event management app built with Next.js and Supabase. Users can view events and RSVP after logging in.

🚀 Features

Events Page – List of upcoming events (fetched from Supabase).

RSVP Page – Login required to RSVP to events.

Authentication – Supabase Auth for sign in/sign up.

Responsive UI – Clean layout with modern components.

⚙️ Setup

Clone the repo

git clone https://github.com/your-username/supabase-events.git
cd supabase-events


Install dependencies

npm install


Add environment variables
Create a .env.local file in the root:

NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key


Run the development server

npm run dev


Visit http://localhost:3000.

📦 Deployment

Vercel (recommended): Add your Supabase env variables in the Vercel project settings.

Build command: npm run build

live project link : assignment-supabase-ewur.vercel.app

📖 Tech Stack

Next.js – React framework

Supabase – Backend & authentication

Tailwind CSS – Styling
