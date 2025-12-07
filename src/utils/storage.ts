/**
 * localStorage utilities for persisting plant data
 */
import { Plant } from '../models/Plant';

const STORAGE_KEY = 'plant-tracker-data';

export const savePlantsToStorage = (plants: Plant[]): void => {
  try {
    const serialized = JSON.stringify(plants);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    console.error('Failed to save plants to localStorage:', error);
  }
};

export const loadPlantsFromStorage = (): Plant[] | null => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (serialized === null) {
      return null;
    }
    return JSON.parse(serialized);
  } catch (error) {
    console.error('Failed to load plants from localStorage:', error);
    return null;
  }
};

export const clearPlantsStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear plants storage:', error);
  }
};
