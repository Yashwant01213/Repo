import { Movie, Theater, Show } from '../types';

export const movies: Movie[] = [
  {
    id: '1',
    title: 'The Action Chronicles',
    genre: ['Action', 'Adventure'],
    language: 'English',
    rating: 4.5,
    censorRating: 'PG-13',
    releaseDate: '2025-10-15',
    description: 'An epic action-adventure that takes you on a thrilling journey across continents. When a retired special forces agent is forced back into action, he must confront his past while saving the world from a global threat.',
    image: 'https://images.unsplash.com/photo-1739891251370-05b62a54697b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpb24lMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NjA5MDA3OTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    userRatings: [5, 4, 5, 4, 5],
    trailerUrl: 'https://www.youtube.com/embed/uYPbbksJxIg'
  },
  {
    id: '2',
    title: 'Laugh Out Loud',
    genre: ['Comedy', 'Romance'],
    language: 'English',
    rating: 4.2,
    censorRating: 'PG',
    releaseDate: '2025-09-20',
    description: 'A hilarious romantic comedy about two complete opposites who are forced to work together on a project. Their constant bickering and mishaps lead to unexpected romance and plenty of laughs.',
    image: 'https://images.unsplash.com/photo-1751823886813-0cfc86cb9478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21lZHklMjBtb3ZpZSUyMGNpbmVtYXxlbnwxfHx8fDE3NjA5NTQyNzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    userRatings: [4, 4, 5, 4, 4],
    trailerUrl: 'https://www.youtube.com/embed/WslAXcKpYjg'
  },
  {
    id: '3',
    title: 'Dark Shadows',
    genre: ['Horror', 'Thriller'],
    language: 'English',
    rating: 4.0,
    censorRating: 'R',
    releaseDate: '2025-10-01',
    description: 'A spine-chilling horror thriller that will keep you on the edge of your seat. When a family moves into an old mansion, they discover dark secrets that have been buried for decades.',
    image: 'https://images.unsplash.com/photo-1630338679229-99fb150fbf88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3Jyb3IlMjBtb3ZpZSUyMGRhcmt8ZW58MXx8fHwxNzYwODU0NDY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    userRatings: [4, 4, 4, 3, 5],
    trailerUrl: 'https://www.youtube.com/embed/vBkBS4O3yvY'
  },
  {
    id: '4',
    title: 'Mind Games',
    genre: ['Thriller', 'Mystery'],
    language: 'English',
    rating: 4.6,
    censorRating: 'PG-13',
    releaseDate: '2025-10-10',
    description: 'A psychological thriller that challenges perception and reality. A detective must solve a series of puzzling crimes that seem impossible, leading to a shocking revelation.',
    image: 'https://images.unsplash.com/photo-1758525862239-0944a42a9dfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aHJpbGxlciUyMHN1c3BlbnNlJTIwbW92aWV8ZW58MXx8fHwxNzYwOTU0MjcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    userRatings: [5, 5, 4, 5, 4],
    trailerUrl: 'https://www.youtube.com/embed/rAiYR2ri24k'
  },
  {
    id: '5',
    title: 'The Journey Home',
    genre: ['Drama', 'Family'],
    language: 'Hindi',
    rating: 4.3,
    censorRating: 'PG',
    releaseDate: '2025-09-25',
    description: 'A heartwarming drama about family, love, and redemption. When a successful businessman returns to his village after 20 years, he must confront his past and rebuild broken relationships.',
    image: 'https://images.unsplash.com/photo-1611889466485-4d8a6d3bd2a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmFtYSUyMGZpbG0lMjBjaW5lbWF8ZW58MXx8fHwxNzYwOTQ1NTg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    userRatings: [4, 5, 4, 4, 4],
    trailerUrl: 'https://www.youtube.com/embed/SKVo2NhgWng'
  },
  {
    id: '6',
    title: 'Galactic Warriors',
    genre: ['Sci-Fi', 'Action'],
    language: 'English',
    rating: 4.7,
    censorRating: 'PG-13',
    releaseDate: '2025-10-18',
    description: 'An epic sci-fi adventure set in a distant galaxy. A group of rebels must fight against an oppressive empire to restore freedom to the universe. Stunning visuals and intense action sequences.',
    image: 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwZmljdGlvbiUyMG1vdmllfGVufDF8fHx8MTc2MDg2MTg3MHww&ixlib=rb-4.1.0&q=80&w=1080',
    userRatings: [5, 5, 5, 4, 5],
    trailerUrl: 'https://www.youtube.com/embed/adzYW5DZoWs'
  },
  {
    id: '7',
    title: 'Street Fighter',
    genre: ['Action', 'Crime'],
    language: 'Hindi',
    rating: 3.8,
    censorRating: 'R',
    releaseDate: '2025-10-05',
    description: 'A gritty action crime thriller set in the underground world of street fighting. A young fighter must navigate a dangerous world of crime and corruption to save his family.',
    image: 'https://images.unsplash.com/photo-1739891251370-05b62a54697b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpb24lMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NjA5MDA3OTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    userRatings: [4, 3, 4, 4, 4],
    trailerUrl: 'https://www.youtube.com/embed/Ha3WxbGOTFg'
  },
  {
    id: '8',
    title: 'Love in Paris',
    genre: ['Romance', 'Comedy'],
    language: 'English',
    rating: 3.9,
    censorRating: 'PG',
    releaseDate: '2025-09-30',
    description: 'A charming romantic comedy set against the beautiful backdrop of Paris. Two strangers meet by chance and embark on a whirlwind romance that changes their lives forever.',
    image: 'https://images.unsplash.com/photo-1751823886813-0cfc86cb9478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21lZHklMjBtb3ZpZSUyMGNpbmVtYXxlbnwxfHx8fDE3NjA5NTQyNzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    userRatings: [4, 4, 4, 3, 4],
    trailerUrl: 'https://www.youtube.com/embed/WslAXcKpYjg'
  },
  {
    id: '9',
    title: 'The Haunting',
    genre: ['Horror'],
    language: 'Tamil',
    rating: 3.5,
    censorRating: 'R',
    releaseDate: '2025-10-12',
    description: 'A terrifying horror film that explores the supernatural. A group of friends decide to spend a night in a haunted house, but they soon realize they are not alone.',
    image: 'https://images.unsplash.com/photo-1630338679229-99fb150fbf88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3Jyb3IlMjBtb3ZpZSUyMGRhcmt8ZW58MXx8fHwxNzYwODU0NDY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    userRatings: [3, 4, 3, 4, 4],
    trailerUrl: 'https://www.youtube.com/embed/vBkBS4O3yvY'
  },
  {
    id: '10',
    title: 'Mystery Island',
    genre: ['Thriller', 'Adventure'],
    language: 'Telugu',
    rating: 4.1,
    censorRating: 'PG-13',
    releaseDate: '2025-10-08',
    description: 'An adventurous thriller set on a mysterious island. A group of explorers discover ancient secrets that put their lives in danger. Can they escape before it\'s too late?',
    image: 'https://images.unsplash.com/photo-1758525862239-0944a42a9dfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aHJpbGxlciUyMHN1c3BlbnNlJTIwbW92aWV8ZW58MXx8fHwxNzYwOTU0MjcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    userRatings: [4, 4, 4, 5, 4],
    trailerUrl: 'https://www.youtube.com/embed/rAiYR2ri24k'
  }
];

export const theaters: Theater[] = [
  {
    id: 't1',
    name: 'PVR Cinemas',
    location: 'Downtown Mall'
  },
  {
    id: 't2',
    name: 'INOX Multiplex',
    location: 'Central Plaza'
  },
  {
    id: 't3',
    name: 'Cinepolis',
    location: 'Metro Junction'
  },
  {
    id: 't4',
    name: 'Carnival Cinemas',
    location: 'Riverside Complex'
  }
];

export const shows: Show[] = [
  // Shows for movie 1
  { id: 's1', theaterId: 't1', movieId: '1', time: '10:00 AM', date: '2025-10-20', pricePerSeat: 200, totalSeats: 100, bookedSeats: ['A1', 'A2', 'B1'] },
  { id: 's2', theaterId: 't1', movieId: '1', time: '02:00 PM', date: '2025-10-20', pricePerSeat: 250, totalSeats: 100, bookedSeats: ['A3', 'A4'] },
  { id: 's3', theaterId: 't2', movieId: '1', time: '06:00 PM', date: '2025-10-20', pricePerSeat: 300, totalSeats: 100, bookedSeats: ['C1', 'C2', 'C3'] },
  { id: 's4', theaterId: 't3', movieId: '1', time: '09:00 PM', date: '2025-10-20', pricePerSeat: 250, totalSeats: 100, bookedSeats: ['D1'] },
  
  // Shows for movie 2
  { id: 's5', theaterId: 't1', movieId: '2', time: '11:00 AM', date: '2025-10-20', pricePerSeat: 180, totalSeats: 100, bookedSeats: ['A1', 'A2'] },
  { id: 's6', theaterId: 't2', movieId: '2', time: '03:00 PM', date: '2025-10-20', pricePerSeat: 220, totalSeats: 100, bookedSeats: [] },
  { id: 's7', theaterId: 't4', movieId: '2', time: '07:00 PM', date: '2025-10-20', pricePerSeat: 200, totalSeats: 100, bookedSeats: ['B5', 'B6'] },
  
  // Shows for movie 3
  { id: 's8', theaterId: 't2', movieId: '3', time: '10:30 AM', date: '2025-10-20', pricePerSeat: 220, totalSeats: 100, bookedSeats: ['E1', 'E2', 'E3', 'E4'] },
  { id: 's9', theaterId: 't3', movieId: '3', time: '05:00 PM', date: '2025-10-20', pricePerSeat: 280, totalSeats: 100, bookedSeats: ['F1'] },
  { id: 's10', theaterId: 't4', movieId: '3', time: '10:00 PM', date: '2025-10-20', pricePerSeat: 250, totalSeats: 100, bookedSeats: [] },
  
  // Shows for movie 4
  { id: 's11', theaterId: 't1', movieId: '4', time: '12:00 PM', date: '2025-10-20', pricePerSeat: 200, totalSeats: 100, bookedSeats: ['A5', 'A6'] },
  { id: 's12', theaterId: 't2', movieId: '4', time: '04:00 PM', date: '2025-10-20', pricePerSeat: 250, totalSeats: 100, bookedSeats: ['B1', 'B2', 'B3'] },
  { id: 's13', theaterId: 't3', movieId: '4', time: '08:00 PM', date: '2025-10-20', pricePerSeat: 280, totalSeats: 100, bookedSeats: [] },
  
  // Shows for movie 5
  { id: 's14', theaterId: 't1', movieId: '5', time: '01:00 PM', date: '2025-10-20', pricePerSeat: 190, totalSeats: 100, bookedSeats: ['C5', 'C6'] },
  { id: 's15', theaterId: 't3', movieId: '5', time: '06:30 PM', date: '2025-10-20', pricePerSeat: 240, totalSeats: 100, bookedSeats: ['D2', 'D3'] },
  
  // Shows for movie 6
  { id: 's16', theaterId: 't2', movieId: '6', time: '11:30 AM', date: '2025-10-20', pricePerSeat: 300, totalSeats: 100, bookedSeats: ['A1', 'A2', 'A3'] },
  { id: 's17', theaterId: 't3', movieId: '6', time: '03:30 PM', date: '2025-10-20', pricePerSeat: 350, totalSeats: 100, bookedSeats: [] },
  { id: 's18', theaterId: 't4', movieId: '6', time: '09:30 PM', date: '2025-10-20', pricePerSeat: 320, totalSeats: 100, bookedSeats: ['B1'] },
];

export const genres = ['Action', 'Comedy', 'Horror', 'Thriller', 'Drama', 'Romance', 'Sci-Fi', 'Adventure', 'Mystery', 'Crime', 'Family'];
export const languages = ['English', 'Hindi', 'Telugu', 'Tamil'];
export const ratings = [
  { label: '4+', value: 4 },
  { label: '3+', value: 3 },
  { label: '2+', value: 2 },
  { label: '1+', value: 1 }
];
