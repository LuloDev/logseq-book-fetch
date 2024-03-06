import { Book } from '../enities/Book';
import { GoogleBookResponse } from '../enities/GoogleBook';
import { IBookService } from './IBookService';

export class GoogleBookService implements IBookService {
  private readonly baseUrl = 'https://www.googleapis.com/books/v1/volumes';

  async getBook(isbn: string): Promise<Book | null> {
    const url = `${this.baseUrl}?q=isbn:${isbn}`;
    const response = await fetch(url);
    const data: GoogleBookResponse = await response.json();
    if (data.totalItems === 0) {
      return null;
    }
    const book = data.items[0].volumeInfo;
    return {
      isbn,
      title: book.title,
      authors: book.authors,
      publishedAt: new Date(book.publishedDate),
      pages: book.pageCount,
      language: book.language,
      publisher: book.publisher,
      description: book.description,
      thumbnailUrl: book.imageLinks?.thumbnail,
    };
  }
}
