interface Review {
    reviewBy: string;
    review: string;
    rating: number;
}

export interface Restaurant {
    restaurantName: string;
    name: string;
    description: string;
    id: number;
    thumbnail: string;
    location: string;
    averageRating: number;
    reviews: Review[];
}