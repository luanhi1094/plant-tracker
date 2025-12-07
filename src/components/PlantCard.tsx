import React from "react";
import { Plant, getPlantStatus, calculateHealthScore } from "../models/Plant";
import styles from "./PlantCard.module.css";

interface PlantCardProps {
  plant: Plant;
  onWater: () => void;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, onWater }) => {
  // Tính sức khỏe hiện tại thực tế
  const currentHealth = calculateHealthScore(plant);
  const status = getPlantStatus(currentHealth);

  // Format ngày tưới gần nhất
  const lastWateredDate = new Date(plant.lastWatered);
  const formattedDate = lastWateredDate.toLocaleDateString("vi-VN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.emoji}>{plant.emoji}</span>
        <div className={styles.info}>
          <h2 className={styles.name}>{plant.name}</h2>
          <p className={styles.species}>{plant.species}</p>
        </div>
      </div>

      {/* Health Score Bar */}
      <div className={styles.healthSection}>
        <div className={styles.healthLabel}>
          <span>Health</span>
          <span className={styles.healthValue}>{Math.round(currentHealth)}/100</span>
        </div>
        <div className={styles.healthBar}>
          <div
            className={styles.healthFill}
            style={{
              width: `${Math.max(0, currentHealth)}%`,
              backgroundColor: currentHealth > 60 ? "#4caf50" : currentHealth > 30 ? "#ff9800" : "#f44336",
            }}
          />
        </div>
        <p className={styles.status}>{status}</p>
      </div>

      {/* Watering Streak */}
      <div className={styles.streakSection}>
        <div className={styles.streakBadge}>
          <span className={styles.streakIcon}>🔥</span>
          <span className={styles.streakNumber}>{plant.wateringStreak}</span>
        </div>
        <span className={styles.streakText}>Day Watering Streak</span>
      </div>

      {/* Last Watered Info */}
      <div className={styles.lastWatered}>
        <span className={styles.label}>Last watered:</span>
        <span className={styles.date}>{formattedDate}</span>
      </div>

      {/* Water Button */}
      <button className={styles.waterButton} onClick={onWater}>
        💧 Water Plant
      </button>
    </div>
  );
};

export default PlantCard;
