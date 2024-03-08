import '@logseq/libs';

import { settings } from './settings';
import { GoogleBookService } from './services/GoogleBookService';

/**
 * Retrieves book data based on the provided ISBN.
 * @param isbn - The ISBN of the book.
 * @returns An array of strings representing the book data.
 */
async function getDataBook(isbn: string): Promise<[string, string[]]> {
  const bookService = new GoogleBookService();
  const book = await bookService.getBook(isbn);

  if (!book) {
    logseq.UI.showMsg(`
    [:div.p-2
      [:h1 "Book not found!"]
    ]
    `);
    return [null, []];
  }

  logseq.UI.showMsg(`
  [:div.p-2
    [:h1 "${book.title}"]
  ]
  `);

  const {
    enableTitle,
    enableThumbnail,
    enableISBN,
    enableAuthors,
    enablePublishedAt,
    enablePages,
    enableLanguage,
    enablePublisher,
    enableCategories,
    enableMaturityRating,
    enableDescription,
  } = logseq.settings;
  const result: string[] = [];

  if (enableThumbnail && book.thumbnailUrl) {
    result.push(`![${book.title}](${book.thumbnailUrl})`);
  } else {
    result.push(`THUMBNAIL NOT FOUND!`);
  }

  if (enableTitle) {
    result.push(`**Title:** ${book.title ?? 'N/A'}`);
  }
  if (enableISBN) {
    result.push(`**ISBN:** ${book.isbn ?? 'N/A'}`);
  }
  if (enableAuthors) {
    result.push(`**Authors:** ${book.authors?.join(', ') ?? 'N/A'}`);
  }
  if (enablePublishedAt) {
    result.push(
      `**Published At:** ${book.publishedAt?.toLocaleDateString() ?? 'N/A'}`,
    );
  }
  if (enableCategories) {
    result.push(`**Categories:** ${book.categories?.join(', ') ?? 'N/A'}`);
  }
  if (enablePages) {
    result.push(`**Pages:** ${book.pages ?? 'N/A'}`);
  }
  if (enableLanguage) {
    result.push(`**Language:** ${book.language ?? 'N/A'}`);
  }
  if (enablePublisher) {
    result.push(`**Publisher:** ${book.publisher ?? 'N/A'}`);
  }
  if (enableMaturityRating) {
    result.push(`**Maturity Rating:** ${book.maturityRating ?? 'N/A'}`);
  }
  if (enableDescription) {
    result.push(`**Description:** ${book.description ?? 'N/A'}`);
  }

  return [book.title, result];
}

function main() {
  logseq.useSettingsSchema(settings);
  logseq.Editor.registerSlashCommand('Book Fetch', async () => {
    const { content, uuid } = (await logseq.Editor.getCurrentBlock()) ?? {};

    if (!content) return;

    const isbn = content;
    const [title, data] = await getDataBook(isbn);
    const blocks = data.map((it) => ({ content: it }));
    if (!title) return;
    await logseq.Editor.updateBlock(uuid, title);

    await logseq.Editor.insertBatchBlock(uuid, blocks, {
      sibling: false,
    });
  });
}

logseq.ready(main).catch(console.error);
