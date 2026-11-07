export interface Testimonial {
  author: string;
  text: string;
  role?: string;
  rating?: number;
  tag?: string;
  date?: string;
  authorPhotoUrl?: string;
  relativeTime?: string;
  isGoogleVerified?: boolean;
  reviewUrl?: string;
}

export interface GoogleReviewsSummary {
  rating: number;
  totalReviews: number;
  placeUrl?: string;
  writeReviewUrl?: string;
}

export interface ReviewsApiResponse {
  summary: GoogleReviewsSummary;
  reviews: Testimonial[];
}
