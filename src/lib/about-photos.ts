import type { AboutPhoto } from "./types";

/**
 * Static photo data — images served from /public/photos/ via Vercel CDN.
 * Much faster than Notion's expiring signed URLs.
 */
export const aboutPhotos: AboutPhoto[] = [
  { id: "drawing", label: "Drawing <3", size: "wide", order: 1, imageUrl: "/photos/drawing.jpg" },
  { id: "eating", label: "Eating pasta", size: "normal", order: 2, imageUrl: "/photos/eating.jpg" },
  { id: "traveling", label: "Traveling", size: "normal", order: 3, imageUrl: "/photos/traveling.jpg" },
  { id: "building", label: "Building stuff", size: "normal", order: 4, imageUrl: "/photos/building.jpg" },
  { id: "family", label: "Time with Family", size: "tall", order: 5, imageUrl: "/photos/family.jpg" },
  { id: "cocktails", label: "Drinking good cocktails", size: "tall", order: 6, imageUrl: "/photos/cocktails.jpg" },
  { id: "reading", label: "Reading things", size: "tall", order: 6, imageUrl: "/photos/reading.jpg" },
  { id: "adventure", label: "Having adventures", size: "wide", order: 6, imageUrl: "/photos/adventure.jpg" },
  { id: "pastry", label: "Eating Croissant(s)", size: "normal", order: 6, imageUrl: "/photos/pastry.jpg" },
  { id: "plants", label: "Plant shopping", size: "normal", order: 6, imageUrl: "/photos/plants.jpg" },
  { id: "friendship", label: "Time to Friendship", size: "normal", order: 6, imageUrl: "/photos/friendship.jpg" },
  { id: "food", label: "Eating more foood", size: "normal", order: 6, imageUrl: "/photos/food.jpg" },
  { id: "mountains", label: "Going to the mountains", size: "wide", order: 6, imageUrl: "/photos/mountains.jpg" },
  { id: "alex", label: "Time with my love", size: "normal", order: 6, imageUrl: "/photos/alex.jpg" },
  { id: "sunsets", label: "Watching Sunsets", size: "wide", order: 6, imageUrl: "/photos/sunsets.jpg" },
  { id: "nature-living", label: "Feeding local horses", size: "tall", order: 6, imageUrl: "/photos/nature-living.jpg" },
  { id: "ocean-life", label: "Time in the ocean", size: "normal", order: 6, imageUrl: "/photos/ocean-life.jpg" },
];
