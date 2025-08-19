import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Supabase Events 🎉</h1>
      
      <p className="mb-4 text-lg">This is your Next.js + Supabase app.</p>
      
      {/* Link to Events Page */}
      <Link 
        href="/events" 
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        View Events
      </Link>
    </main>
  );
}
