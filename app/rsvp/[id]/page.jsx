"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useParams } from "next/navigation";

export default function RSVPPage() {
  const { id } = useParams(); // event id
  const [event, setEvent] = useState(null);
  const [status, setStatus] = useState("Yes");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchEvent();
  }, []);

  async function fetchEvent() {
    const { data, error } = await supabase.from("events").select("*").eq("id", id).single();
    if (error) console.error(error);
    else setEvent(data);
  }

  async function submitRSVP(e) {
    e.preventDefault();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("⚠️ Please log in to RSVP.");
      return;
    }

    // Upsert so user can change RSVP later
    const { error } = await supabase.from("rsvps").upsert([
      { user_id: user.id, event_id: id, status },
    ]);

    if (error) {
      console.error(error);
      setMessage("❌ Failed to RSVP. Try again.");
    } else {
      setMessage("✅ RSVP submitted!");
    }
  }

  if (!event) return <p>Loading event...</p>;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">RSVP for {event.title}</h1>
      <p className="mb-6 text-gray-400">📍 {event.city} | 🗓 {event.date}</p>

      <form onSubmit={submitRSVP} className="space-y-4 p-4 border rounded-lg shadow">
        <label className="block">Choose your RSVP:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="Yes">✅ Yes</option>
          <option value="No">❌ No</option>
          <option value="Maybe">🤔 Maybe</option>
        </select>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Submit RSVP
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </main>
  );
}
