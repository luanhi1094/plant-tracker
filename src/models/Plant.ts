/**
 * Plant Model & Types
 * Định nghĩa cấu trúc dữ liệu cho cây trồng
 */

export interface Plant {
  id: string;
  name: string;
  species: string; // Loài cây (e.g., "Succulent", "Monstera")
  emoji: string; // Icon cây (e.g., "🌿")
  lastWatered: Date; // Lần tưới gần nhất
  wateringFrequency: number; // Số ngày giữa các lần tưới (e.g., 3 ngày)
  wateringStreak: number; // Số lần tưới liên tiếp (combo)
  healthScore: number; // Sức khỏe 0-100
  maxHealthScore: number; // Sức khỏe tối đa (mặc định 100)
}

/**
 * Tính độ sức khỏe hiện tại dựa trên thời gian tưới gần nhất
 */
export const calculateHealthScore = (plant: Plant): number => {
  const now = new Date();
  const lastWatered = new Date(plant.lastWatered);
  const daysSinceWatered = (now.getTime() - lastWatered.getTime()) / (1000 * 60 * 60 * 24);

  // Nếu chưa tưới quá lâu, sức khỏe không thay đổi
  if (daysSinceWatered < plant.wateringFrequency) {
    return plant.healthScore;
  }

  // Mỗi ngày quá hạn, sức khỏe giảm 5 điểm
  const healthDecay = Math.floor(daysSinceWatered - plant.wateringFrequency) * 5;
  return Math.max(0, plant.healthScore - healthDecay);
};

/**
 * Tạo một cây mới với giá trị mặc định
 */
export const createPlant = (
  name: string,
  species: string,
  emoji: string = "🌿",
  wateringFrequency: number = 3
): Plant => {
  return {
    id: `plant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name,
    species,
    emoji,
    lastWatered: new Date(),
    wateringFrequency,
    wateringStreak: 0,
    healthScore: 100,
    maxHealthScore: 100,
  };
};

/**
 * Nước một cây
 */
export const waterPlant = (plant: Plant): Plant => {
  const now = new Date();
  const lastWatered = new Date(plant.lastWatered);
  const daysSinceWatered = (now.getTime() - lastWatered.getTime()) / (1000 * 60 * 60 * 24);

  // Nếu tưới đúng hạn (trong 2 ngày), tăng streak
  const newStreak = daysSinceWatered <= plant.wateringFrequency + 2 ? plant.wateringStreak + 1 : 1;

  return {
    ...plant,
    lastWatered: now,
    wateringStreak: newStreak,
    healthScore: Math.min(plant.maxHealthScore, plant.healthScore + 20), // Tăng sức khỏe 20 điểm
  };
};

/**
 * Xác định trạng thái cây dựa trên health score
 */
export const getPlantStatus = (healthScore: number): string => {
  if (healthScore >= 80) return "Excellent 😊";
  if (healthScore >= 60) return "Good 🙂";
  if (healthScore >= 40) return "Fair 😐";
  if (healthScore >= 20) return "Poor 😟";
  return "Critical 😰";
};
