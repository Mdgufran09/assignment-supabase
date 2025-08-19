"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    city: "",
    date: "",
  });

  // Fetch events
  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { data, error } = await supabase.from("events").select("*").order("date");
    if (error) {
      console.error("Error fetching events:", error);
    } else {
      setEvents(data);
    }
  }

  // Add new event
  async function addEvent(e) {
    e.preventDefault();
    const { error } = await supabase.from("events").insert([newEvent]);
    if (error) {
      console.error("Error adding event:", error);
    } else {
      setNewEvent({ title: "", description: "", city: "", date: "" });
      fetchEvents(); // refresh list
    }
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>

      {/* Add Event Form */}
      <form onSubmit={addEvent} className="mb-8 space-y-4 p-4 border rounded-lg shadow">
        <h2 className="text-xl font-semibold">Add New Event</h2>
        <input
          type="text"
          placeholder="Event Name"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="city"
          value={newEvent.city}
          onChange={(e) => setNewEvent({ ...newEvent, city: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Event
        </button>
      </form>

      {/* Event List */}
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="p-4 border rounded-lg shadow">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p>{event.description}</p>
              <p className="text-gray-400">
                📍 {event.city} | 🗓 {event.date}
              </p>

              <a
  href={`/rsvp/${event.id}`}
  className="inline-block mt-2 text-blue-500 hover:underline"
>
  RSVP →
</a>

            </li>
          ))}
        </ul>
      )}
    </main>

    
  );
}
