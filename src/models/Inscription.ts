export interface Inscription {
  id: number;
  documentId: string;
  category?: string;
  participation_interest?: string;
  inscription_paid?: boolean;
  inscription_fee?: number;
  inscription_date?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
