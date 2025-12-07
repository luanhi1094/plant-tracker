import React, { useState, useEffect } from "react";
import PlantCard from "./components/PlantCard";
import Statistics from "./components/Statistics";
import { Plant, createPlant, waterPlant } from "./models/Plant";
import { savePlantsToStorage, loadPlantsFromStorage } from "./utils/storage";
import "./App.css";

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
  const [plants, setPlants] = useState<Plant[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Khởi tạo cây từ localStorage hoặc tạo cây mẫu
  useEffect(() => {
    const savedPlants = loadPlantsFromStorage();
    
    if (savedPlants && savedPlants.length > 0) {
      setPlants(savedPlants);
    } else {
      const initialPlants = [
        createPlant("Monstera", "Tropical Plant", "🌴", 4),
        createPlant("Succulent", "Desert Plant", "🌵", 7),
        createPlant("Snake Plant", "Indoor Plant", "🌿", 10),
        createPlant("Pothos", "Climbing Plant", "🍃", 3),
      ];
      setPlants(initialPlants);
    }
    
    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('plant-tracker-darkmode') === 'true';
    setDarkMode(savedDarkMode);
    applyDarkMode(savedDarkMode);
  }, []);

  // Lưu cây vào localStorage mỗi khi thay đổi
  useEffect(() => {
    if (plants.length > 0) {
      savePlantsToStorage(plants);
    }
  }, [plants]);

  // Xử lý tưới cây
  const handleWaterPlant = (plantId: string) => {
    setPlants((prevPlants) =>
      prevPlants.map((plant) => (plant.id === plantId ? waterPlant(plant) : plant))
    );
  };

  // Thêm cây mới
  const handleAddPlant = () => {
    const newPlant = createPlant("New Plant", "Unknown", "🌱", 3);
    setPlants([...plants, newPlant]);
  };

  // Xóa cây
  const handleDeletePlant = (plantId: string) => {
    setPlants(plants.filter((plant) => plant.id !== plantId));
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
          {filteredPlants.length === 0 ? (
            <div className="empty-state">
              <p>{searchQuery ? `No plants match "${searchQuery}"` : "No plants yet. Click \"Add New Plant\" to get started! 🌱"}</p>
            </div>
          ) : (
            filteredPlants.map((plant) => (
              <div key={plant.id} className="plant-container">
                <PlantCard
                  plant={plant}
                  onWater={() => handleWaterPlant(plant.id)}
                />
                <button
                  className="delete-button"
                  onClick={() => handleDeletePlant(plant.id)}
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
