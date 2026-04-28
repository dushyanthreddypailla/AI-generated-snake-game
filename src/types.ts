export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  coverUrl: string;
  color: string;
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface Point {
  x: number;
  y: number;
}

export const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Cyber Chase',
    artist: 'Neural Runner',
    duration: '3:45',
    coverUrl: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=400&h=400&fit=crop',
    color: 'var(--color-neon-cyan)'
  },
  {
    id: '2',
    title: 'Midnight Neon',
    artist: 'Synth Soul',
    duration: '4:20',
    coverUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&h=400&fit=crop',
    color: 'var(--color-neon-magenta)'
  },
  {
    id: '3',
    title: 'Glitch Protocol',
    artist: 'Digital Ghost',
    duration: '2:58',
    coverUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop',
    color: 'var(--color-neon-lime)'
  }
];
