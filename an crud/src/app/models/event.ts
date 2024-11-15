export interface EventModel {
  id?: number;
  eventCode: string;
  type: string;
  description: string;
  timestamp: string; 
  status: string;
  chauffeurId?: number;
  orderTransportId: number;
  location: string;
  impactLevel: string;
  createdAt?: string;
  updatedAt?: string;
}


export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface Ordre {
  id: number;
  nomClient: string;
  descriptionOrdre: string;
  cin: string;
  num: string;
}
