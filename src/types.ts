export type ChakraStatus = 'blocked' | 'underactive' | 'balanced' | 'overactive' | 'overflowing';

export interface ChakraInfo {
  id: string;
  name: string;
  sanskritName: string;
  color: string;
  element: string;
  location: string;
  symbol: string;
  description: string;
}

export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    impact: Record<string, number>; // chakraId -> score change
  }[];
}

export interface DiagnosticResult {
  chakraId: string;
  score: number;
  status: ChakraStatus;
}
