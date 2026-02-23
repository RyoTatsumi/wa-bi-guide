export interface WishlistItem {
  id: string;
  name: string;
  description: string;
  imageBase64?: string;
  estimatedPrice?: string;
  category?: string;
  materials?: string[];
  addedAt: number;
  locationName?: string;
}

export interface SouvenirAnalysis {
  name: string;
  description: string;
  history: string;
  materials: string[];
  craftsmanship: string;
  estimatedPrice: string;
  category: string;
}
