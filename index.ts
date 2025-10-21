export interface Movie {
  id: string;
  title: string;
  genre: string[];
  language: string;
  rating: number;
  censorRating: string;
  releaseDate: string;
  description: string;
  image: string;
  userRatings: number[];
  trailerUrl?: string;
}

export interface Theater {
  id: string;
  name: string;
  location: string;
}

export interface Show {
  id: string;
  theaterId: string;
  movieId: string;
  time: string;
  date: string;
  pricePerSeat: number;
  totalSeats: number;
  bookedSeats: string[];
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'regular' | 'premium';
  price: number;
}

export interface Booking {
  movieId: string;
  showId: string;
  theaterId: string;
  seats: string[];
  totalPrice: number;
}

export type CardType = 'credit' | 'debit';

export interface PaymentDetails {
  cardType: CardType;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}
