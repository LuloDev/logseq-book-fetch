export type Book = {
  isbn: string;
  title: string;
  authors: string[];
  publishedAt: Date;
  pages: number;
  language: string;
  publisher: string;
  description: string;
  thumbnailUrl: string | undefined;
  categories: string[];
  maturityRating: string | undefined;
};
