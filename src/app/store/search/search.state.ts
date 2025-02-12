export interface Place {
  id: number;
  name: string;
  location: string;
  description: string;
}

export interface SearchState {
  query: string;
  results: Place[];
  loading: boolean;
  error: string | null;
}

export const initialSearchState: SearchState = {
  query: '',
  results: [],
  loading: false,
  error: null,
};
