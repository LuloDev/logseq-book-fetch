import '@logseq/libs';
import { GoogleBookService } from './services/googleBookService';

async function getDataBook(isbn: string): Promise<string[]> {
  const bookService = new GoogleBookService();
  const book = await bookService.getBook(isbn);

  if (!book) {
    logseq.UI.showMsg(`
    [:div.p-2
      [:h1 "Book not found!"]
    ]
    `);
    return [];
  }

  logseq.UI.showMsg(`
  [:div.p-2
    [:h1 "${book.title}"]
  ]
  `);

  return [
    `![${book.title}](${book.thumbnailUrl ?? ''})`,
    `**Title:** ${book.title}`,
    `**Authors:** [[${book.authors.join(', ')}]]`,
    `**Published At:** ${book.publishedAt?.toLocaleDateString()}`,
    `**Pages:** ${book.pages ?? 'N/A'}`,
    `**Language:** ${book.language ?? 'N/A'}`,
    `**Publisher:** ${book.publisher ?? 'N/A'}`,
    `**Description:** ${book.description ?? 'N/A'}`,
  ];
}

function main() {
  logseq.Editor.registerSlashCommand('Book Fetch', async () => {
    const { content, uuid } = (await logseq.Editor.getCurrentBlock()) ?? {};

    if (!content) return;

    const isbn = content;
    const data = await getDataBook(isbn);
    const blocks = data.map((it) => ({ content: it }));

    await logseq.Editor.insertBatchBlock(uuid, blocks, {
      sibling: false,
    });
  });
}

logseq.ready(main).catch(console.error);
