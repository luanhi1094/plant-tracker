import React from "react";
import { Plant, calculateHealthScore } from "../models/Plant";
import styles from "./Statistics.module.css";

interface StatisticsProps {
  plants: Plant[];
}

const Statistics: React.FC<StatisticsProps> = ({ plants }) => {
  const totalPlants = plants.length;
  const totalStreak = plants.reduce((sum, plant) => sum + plant.wateringStreak, 0);
  const avgHealth = plants.length > 0
    ? Math.round(plants.reduce((sum, plant) => sum + calculateHealthScore(plant), 0) / plants.length)
    : 0;

  const healthyPlants = plants.filter((p) => calculateHealthScore(p) >= 80).length;

  return (
    <div className={styles.stats}>
      <div className={styles.statCard}>
        <div className={styles.statNumber}>{totalPlants}</div>
        <div className={styles.statLabel}>Total Plants</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statNumber}>🔥 {totalStreak}</div>
        <div className={styles.statLabel}>Total Streak</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statNumber}>{avgHealth}%</div>
        <div className={styles.statLabel}>Avg Health</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statNumber}>😊 {healthyPlants}</div>
        <div className={styles.statLabel}>Healthy Plants</div>
      </div>
    </div>
  );
};

export default Statistics;
