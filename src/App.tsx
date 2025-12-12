import React, { useState, useEffect } from "react";
import PlantCard from "./components/PlantCard";
import Statistics from "./components/Statistics";
import { Plant } from "./models/Plant";
import { plantAPI } from "./services/api";
import "./App.css";

// Generate unique user ID (in production, use real user auth)
const getUserId = () => {
  let userId = localStorage.getItem('plant-tracker-userid');
  if (!userId) {
    userId = 'user-' + Date.now();
    localStorage.setItem('plant-tracker-userid', userId);
  }
  return userId;
};

// Apply dark mode to document
const applyDarkMode = (isDark: boolean) => {
  const root = document.documentElement;
  if (isDark) {
    root.classList.add('dark-mode');
  } else {
    root.classList.remove('dark-mode');
  }
};

const App: React.FC = () => {
  const userId = getUserId();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load plants from backend
  useEffect(() => {
    const loadPlants = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await plantAPI.getPlants(userId);
        setPlants(data);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to load plants';
        setError(errorMsg);
        console.error('Error loading plants:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPlants();

    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('plant-tracker-darkmode') === 'true';
    setDarkMode(savedDarkMode);
    applyDarkMode(savedDarkMode);
  }, [userId]);

  // Water plant - call API
  const handleWaterPlant = async (plantId: string) => {
    try {
      const updatedPlant = await plantAPI.waterPlant(plantId);
      setPlants((prevPlants) =>
        prevPlants.map((plant) => (plant._id === updatedPlant._id ? updatedPlant : plant))
      );
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to water plant';
      setError(errorMsg);
      console.error('Error watering plant:', err);
    }
  };

  // Add plant - call API
  const handleAddPlant = async () => {
    const name = prompt("Enter plant name:");
    if (!name) return;

    const species = prompt("Enter species (optional):") || undefined;
    const emoji = prompt("Enter emoji (optional, default: 🌱):") || "🌱";

    try {
      const newPlant = await plantAPI.createPlant(userId, name, species, emoji);
      setPlants([...plants, newPlant]);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to add plant';
      setError(errorMsg);
      console.error('Error adding plant:', err);
    }
  };

  // Delete plant - call API
  const handleDeletePlant = async (plantId: string) => {
    if (!window.confirm("Delete this plant?")) return;

    try {
      await plantAPI.deletePlant(plantId);
      setPlants(plants.filter((plant) => plant._id !== plantId));
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to delete plant';
      setError(errorMsg);
      console.error('Error deleting plant:', err);
    }
  };

  // Toggle dark mode
  const handleToggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('plant-tracker-darkmode', String(newDarkMode));
    applyDarkMode(newDarkMode);
  };

  // Filter plants by search query
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plant.species.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌿 Digital Plant Watering Tracker</h1>
        <p>Keep your plants healthy and happy!</p>
        <button className="dark-mode-toggle" onClick={handleToggleDarkMode} title="Toggle dark mode">
          {darkMode ? "☀️" : "🌙"}
        </button>
      </header>

      <main className="app-main">
        <Statistics plants={plants} />
        
        <div className="controls">
          <input
            type="text"
            placeholder="🔍 Search plants by name or species..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="add-button" onClick={handleAddPlant}>
            ➕ Add New Plant
          </button>
        </div>

        <div className="plants-grid">
          {loading ? (
            <div className="empty-state">
              <p>Loading plants...</p>
            </div>
          ) : error ? (
            <div className="empty-state">
              <p>❌ Error: {error}</p>
              <button onClick={() => window.location.reload()}>Retry</button>
            </div>
          ) : filteredPlants.length === 0 ? (
            <div className="empty-state">
              <p>{searchQuery ? `No plants match "${searchQuery}"` : "No plants yet. Click \"Add New Plant\" to get started! 🌱"}</p>
            </div>
          ) : (
            filteredPlants.map((plant) => (
              <div key={plant._id || plant.id} className="plant-container">
                <PlantCard
                  plant={plant}
                  onWater={() => plant._id && handleWaterPlant(plant._id)}
                />
                <button
                  className="delete-button"
                  onClick={() => plant._id && handleDeletePlant(plant._id)}
                  title="Delete plant"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>💡 Tip: Water your plants on time to maintain their health and increase your streak!</p>
      </footer>
    </div>
  );
};

export default App;
