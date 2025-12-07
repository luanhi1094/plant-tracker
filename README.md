# 🌿 Digital Plant Watering Tracker

A beautiful and interactive web application to track and manage your plant watering schedule. Maintain your plants' health and build daily watering streaks!

## Features ✨

- **Plant Management**: Add, view, and delete multiple plants
- **Health Tracking**: Monitor plant health score (0-100) with visual health bar
- **Watering Streak**: Build and maintain consecutive watering streaks 🔥
- **Smart Health Calculation**: Health degrades over time if plants aren't watered
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **Interactive UI**: Beautiful gradient cards with smooth animations

## Project Structure 📁

```
plant-tracker/
├── src/
│   ├── components/
│   │   ├── PlantCard.tsx          # Plant card component (displays plant info & watering UI)
│   │   └── PlantCard.module.css   # Styles for plant card
│   ├── models/
│   │   └── Plant.ts               # Plant data model & business logic
│   ├── App.tsx                    # Main app component (state management)
│   ├── App.css                    # Global app styles
│   └── index.tsx                  # React entry point
├── public/
│   └── index.html                 # HTML template
├── package.json                   # Dependencies & scripts
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite build configuration
└── README.md                      # This file
```

## File Descriptions 📄

### `src/models/Plant.ts`
Defines the core data structure and business logic:
- **Plant Interface**: Contains plant properties (name, species, health, watering frequency, etc.)
- **calculateHealthScore()**: Computes current health based on days since last watering
- **waterPlant()**: Updates plant data when watered (increases health, updates streak)
- **createPlant()**: Factory function to create new plants
- **getPlantStatus()**: Returns human-readable plant status based on health

### `src/components/PlantCard.tsx`
React component that displays a single plant:
- Shows plant emoji, name, and species
- Displays health bar with color coding (green → yellow → red)
- Shows watering streak counter with 🔥 icon
- Displays last watering date/time
- "Water Plant" button to trigger watering action

### `src/App.tsx`
Main application component:
- Manages state for all plants
- Handles adding/deleting plants
- Initializes 4 sample plants on startup
- Renders the UI layout (header, plant grid, footer)
- Coordinates plant watering actions

## Getting Started 🚀

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

1. **Navigate to project directory**
```bash
cd d:\plant-tracker
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

Server runs at `http://localhost:3000` (opens automatically)

### Build for Production

```bash
npm run build
```

Output goes to `dist/` folder.

## How to Use 💧

1. **View Plants**: The app starts with 4 sample plants
2. **Water a Plant**: Click the "💧 Water Plant" button on any plant card
   - Health increases by 20 points
   - Last watered time updates
   - Watering streak increases if done on time
3. **Add New Plant**: Click "➕ Add New Plant" button
4. **Delete Plant**: Click the 🗑️ button on a plant card

## Plant Health System 🏥

### Health Score
- **Starts at**: 100/100
- **Decreases over time**: 5 points per day after watering frequency is exceeded
- **Increases when watered**: +20 points (max 100)

### Status Levels
- **Excellent (≥80)**: 😊 Perfect condition
- **Good (60-79)**: 🙂 Healthy
- **Fair (40-59)**: 😐 Needs attention
- **Poor (20-39)**: 😟 Critical soon
- **Critical (<20)**: 😰 Emergency!

### Watering Streak
- Increases by 1 each time you water on time (within 2 days of frequency)
- Resets to 1 if you water late
- Rewards consistency with 🔥 fire emoji

## Example Plants

The app includes these sample plants with different watering needs:
- **Monstera** (🌴): Every 4 days
- **Succulent** (🌵): Every 7 days (drought tolerant)
- **Snake Plant** (🌿): Every 10 days (very hardy)
- **Pothos** (🍃): Every 3 days (loves water)

## Technologies Used 🛠️

- **React 18**: UI framework
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool
- **CSS Modules**: Scoped styling
- **CSS Gradients & Animations**: Beautiful UI

## Customization 🎨

### Add Your Own Plants
Edit `src/App.tsx` - `useEffect` section:
```typescript
const initialPlants = [
  createPlant("Plant Name", "Species", "emoji", frequency),
  // Add more plants here
];
```

### Change Colors
Edit `PlantCard.module.css` or `App.css` to customize gradients and colors.

### Adjust Health Decay
Edit `src/models/Plant.ts` - `calculateHealthScore()`:
```typescript
const healthDecay = Math.floor(daysSinceWatered - plant.wateringFrequency) * 5; // Change this value
```

## Future Enhancements 🌱

- 📅 Local storage to persist plant data
- 🔔 Notifications for watering reminders
- 📊 Statistics dashboard (total streaks, health trends)
- 🌍 Multi-language support
- 📱 Mobile app version
- ☁️ Cloud sync across devices

## License 📜

MIT License - Feel free to use this project for learning and personal use!

## Tips for Success 💡

✅ Water plants on their regular schedule to maintain streaks
✅ Check daily for plants that need watering soon
✅ Try to keep all plants healthy (≥60 health)
✅ Build long streaks for bragging rights! 🔥

---

**Made with 💚 for plant lovers everywhere!**
