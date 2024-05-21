import '@logseq/libs';

import { settings } from './settings';
import { GoogleBookService } from './services/GoogleBookService';

function proccessTemplate(
  template: string,
  data: { key: string; value: string }[],
): { content: string }[] {
  const blocks = template
    .replace(/^[\t\s]*-[\t\s]*/, '')
    .split(/\\n[\t\s]*-[\t\s]*/);
  return blocks.map((block) => {
    for (const item of data) {
      block = block
        .replaceAll(`{{${item.key}}}`, item.value)
        .replace(/\\n/g, '\n');
    }
    return {
      content: block,
    };
  });
}

/**
 * Retrieves book data based on the provided ISBN.
 * @param isbn - The ISBN of the book.
 * @returns An array of strings representing the book data.
 */
async function getDataBook(
  isbn: string,
): Promise<[string, { key: string; value: string }[]]> {
  const bookService = new GoogleBookService();
  const book = await bookService.getBook(isbn);

  if (!book) {
    logseq.UI.showMsg(`
    [:div.p-2
      [:h1 "Book not found!"]
    ]
    `);
    return null;
  }

  logseq.UI.showMsg(`
  [:div.p-2
    [:h1 "${book.title}"]
  ]
  `);

  const result: { key: string; value: string }[] = [];

  if (book.thumbnailUrl) {
    result.push({
      key: 'thumbnail',
      value: book.thumbnailUrl,
    });
  } else {
    result.push({
      key: 'thumbnail',
      value:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png',
    });
  }

  result.push({
    key: 'title',
    value: book.title,
  });

  result.push({
    key: 'isbn',
    value: book.isbn ?? 'N/A',
  });
  result.push({
    key: 'authors',
    value: book.authors?.join(', ') ?? 'N/A',
  });
  result.push({
    key: 'publishedAt',
    value: book.publishedAt?.toLocaleDateString() ?? 'N/A',
  });
  result.push({
    key: 'categories',
    value: book.categories?.join(', ') ?? 'N/A',
  });
  result.push({
    key: 'pages',
    value: book.pages?.toString() ?? 'N/A',
  });
  result.push({
    key: 'language',
    value: book.language ?? 'N/A',
  });
  result.push({
    key: 'publisher',
    value: book.publisher ?? 'N/A',
  });
  result.push({
    key: 'maturityRating',
    value: book.maturityRating ?? 'N/A',
  });
  result.push({
    key: 'description',
    value: book.description ?? 'N/A',
  });
  return [book.title, result];
}

function main() {
  logseq.useSettingsSchema(settings);
  logseq.Editor.registerSlashCommand('Book Fetch', async () => {
    const { content, uuid } = (await logseq.Editor.getCurrentBlock()) ?? {};

    if (!content) return;

    const isOnlyISBN = content.match(/^\d{10,13}$/);
    let isbn = content;
    if (!isOnlyISBN) {
      isbn = content.match(/\d{10,13}(?=\s*$)/)?.[0];
      if (!isbn) {
        logseq.UI.showMsg(`[:h1 "No ISBN found!"]`);
        return;
      }
    }
    const [title, data] = await getDataBook(isbn);
    let { template } = logseq.settings;
    if (!template || typeof template !== 'string') {
      template = settings.find((setting) => setting.key === 'template').default;
    }
    const blocks = proccessTemplate(template as string, data);
    if (blocks.length === 0) {
      logseq.UI.showMsg(`
      [:div.p-2
        [:h1 "No template found!"]
      ]
      `);
      return;
    }
    if (!isOnlyISBN) {
      // concat all blocks
      const textContent = blocks.map((block) => block.content).join('\n');
      const position = content.lastIndexOf(isbn);
      if (position !== -1) {
        const start = content.substring(0, position);
        const end = content.substring(position + isbn.length);
        const newContent = start + textContent + end;
        await logseq.Editor.updateBlock(uuid, newContent);
      } else {
        const newContent = content + '\n' + textContent;
        await logseq.Editor.updateBlock(uuid, newContent);
      }
      return;
    }
    if (!title) return;
    await logseq.Editor.insertBatchBlock(uuid, blocks, {
      sibling: false,
    });
  });
}

logseq.ready(main).catch(console.error);
