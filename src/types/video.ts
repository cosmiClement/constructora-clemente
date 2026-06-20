// src/types/video.ts

export type VideoQuality = '4k' | '1080p' | '720p' | '480p' | 'low';

export interface VideoBreakpoints {
  [key: string]: {
    minWidth: number;
    minDPR?: number;
    requiredConnection?: string;
  };
}

export interface VideoSources {
  '4k'?: string;
  '1080p'?: string;
  '720p'?: string;
  '480p'?: string;
}

export interface HeroVideoContent {
  sources: VideoSources;
  poster: string;
  fallback: string;
}