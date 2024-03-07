<a name="readme-top"></a>

<div align="center">
  
  [![Contributors][contributors-shield]][contributors-url]
  [![Forks][forks-shield]][forks-url]
  [![Stargazers][stars-shield]][stars-url]
  [![Issues][issues-shield]][issues-url]

  <img src="icon.png" alt="Icon" height="100">

# LOGSEQ-BOOK-FETCH

This is a Logseq plugin that fetches book data based on an ISBN using the Google Books API.

[Report error](https://github.com/LuloDev/logseq-book-fetch/issues) · [Suggest something](https://github.com/LuloDev/logseq-book-fetch/issues)

</div>

## Usage

![Demo](demo.gif)

1. Open Logseq.
2. Enter the ISBN of the book you want to fetch data for.
3. Use the slash command `/Book Fetch` in the editor.

The plugin will fetch the book data and insert it into the current block.

<p align="right">(<a href="#readme-top">Go Top</a>)</p>

## Features

- Fetch book data based on an ISBN using the Google Books API.
- Insert fetched book data into the current block in Logseq.
- Provide a slash command `/Book Fetch` for easy access to the plugin.
- Configure which data to insert into the current block.

## Availability Data

| Data            | Description                                |
| --------------- | ------------------------------------------ |
| Title           | The title of the book.                     |
| Author          | The author(s) of the book.                 |
| Publisher       | The publisher of the book.                 |
| Publication     | The publication date of the book.          |
| Description     | A brief description of the book.           |
| Categories      | The categories or genres of the book.      |
| Page Count      | The total number of pages in the book.     |
| Language        | The language in which the book is written. |
| Image           | The cover image of the book.               |
| ISBN            | The ISBN of the book.                      |
| Maturity Rating | The Maturity Rating of the book.           |

<p align="right">(<a href="#readme-top">Go Top</a>)</p>

## Development

To build the project, run

```
pnpm run build
```

To start the development, run

```
pnpm run dev
```

<p align="right">(<a href="#readme-top">Go Top</a>)</p>

## Dependencies

- `@logseq/libs`
- `axios`

## Author

LuloDev

## LICENSE

[MIT License](LICENSE)

<p align="right">(<a href="#readme-top">Go Top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/LuloDev/logseq-book-fetch.svg?style=for-the-badge
[contributors-url]: https://github.com/LuloDev/logseq-book-fetch/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/LuloDev/logseq-book-fetch.svg?style=for-the-badge
[forks-url]: https://github.com/LuloDev/logseq-book-fetch/network/members
[stars-shield]: https://img.shields.io/github/stars/LuloDev/logseq-book-fetch.svg?style=for-the-badge
[stars-url]: https://github.com/LuloDev/logseq-book-fetch/stargazers
[issues-shield]: https://img.shields.io/github/issues/LuloDev/logseq-book-fetch.svg?style=for-the-badge
[issues-url]: https://github.com/LuloDev/l`ogseq-book-fetch/issues
