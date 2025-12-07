import React, { useState, useEffect } from "react";
import PlantCard from "./components/PlantCard";
import { Plant, createPlant, waterPlant } from "./models/Plant";
import "./App.css";

const App: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);

  // Khởi tạo một số cây mẫu
  useEffect(() => {
    const initialPlants = [
      createPlant("Monstera", "Tropical Plant", "🌴", 4),
      createPlant("Succulent", "Desert Plant", "🌵", 7),
      createPlant("Snake Plant", "Indoor Plant", "🌿", 10),
      createPlant("Pothos", "Climbing Plant", "🍃", 3),
    ];
    setPlants(initialPlants);
  }, []);

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

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌿 Digital Plant Watering Tracker</h1>
        <p>Keep your plants healthy and happy!</p>
      </header>

      <main className="app-main">
        <div className="controls">
          <button className="add-button" onClick={handleAddPlant}>
            ➕ Add New Plant
          </button>
        </div>

        <div className="plants-grid">
          {plants.length === 0 ? (
            <div className="empty-state">
              <p>No plants yet. Click "Add New Plant" to get started! 🌱</p>
            </div>
          ) : (
            plants.map((plant) => (
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
