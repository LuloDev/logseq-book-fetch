import { Book } from '../enities/Book';

export interface IBookService {
  getBook(isbn: string): Promise<Book | null>;
}
