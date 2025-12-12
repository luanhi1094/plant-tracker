const API_BASE = 'http://localhost:5000/api';

// Plant API endpoints
export const plantAPI = {
  // Get all plants for user
  getPlants: async (userId: string) => {
    const res = await fetch(`${API_BASE}/plants/${userId}`);
    if (!res.ok) throw new Error('Failed to fetch plants');
    return res.json();
  },

  // Create new plant
  createPlant: async (userId: string, name: string, species?: string, emoji?: string) => {
    const res = await fetch(`${API_BASE}/plants`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, name, species, emoji })
    });
    if (!res.ok) throw new Error('Failed to create plant');
    return res.json();
  },

  // Water plant (increase health, update streak)
  waterPlant: async (plantId: string) => {
    const res = await fetch(`${API_BASE}/plants/${plantId}/water`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new Error('Failed to water plant');
    return res.json();
  },

  // Update plant details
  updatePlant: async (plantId: string, updates: { name?: string; species?: string; emoji?: string; wateringFrequency?: number }) => {
    const res = await fetch(`${API_BASE}/plants/${plantId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update plant');
    return res.json();
  },

  // Delete plant
  deletePlant: async (plantId: string) => {
    const res = await fetch(`${API_BASE}/plants/${plantId}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete plant');
    return res.json();
  }
};

// Event API endpoints (for QR Check-in)
export const eventAPI = {
  // Get all events
  getEvents: async () => {
    const res = await fetch(`${API_BASE}/events`);
    if (!res.ok) throw new Error('Failed to fetch events');
    return res.json();
  },

  // Get event by ID
  getEvent: async (eventId: string) => {
    const res = await fetch(`${API_BASE}/events/${eventId}`);
    if (!res.ok) throw new Error('Event not found');
    return res.json();
  },

  // Create event
  createEvent: async (eventId: string, name: string, description?: string, location?: string, createdBy?: string) => {
    const res = await fetch(`${API_BASE}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId, name, description, location, createdBy })
    });
    if (!res.ok) throw new Error('Failed to create event');
    return res.json();
  },

  // Record check-in
  checkIn: async (eventId: string, walletAddress: string, txHash?: string) => {
    const res = await fetch(`${API_BASE}/events/${eventId}/checkin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ walletAddress, txHash })
    });
    if (!res.ok) throw new Error('Failed to check in');
    return res.json();
  },

  // Get participants
  getParticipants: async (eventId: string) => {
    const res = await fetch(`${API_BASE}/events/${eventId}/participants`);
    if (!res.ok) throw new Error('Failed to fetch participants');
    return res.json();
  },

  // Delete event
  deleteEvent: async (eventId: string) => {
    const res = await fetch(`${API_BASE}/events/${eventId}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete event');
    return res.json();
  }
};
