export type GoogleBookResponse = {
  kind: string;
  totalItems: number;
  items: Item[];
};

export type Item = {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
  searchInfo: SearchInfo;
};

export type AccessInfo = {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: Epub;
  pdf: Epub;
  webReaderLink: string;
  accessViewStatus: string;
  quoteSharingAllowed: boolean;
};

export type Epub = {
  isAvailable: boolean;
};

export type SaleInfo = {
  country: string;
  saleability: string;
  isEbook: boolean;
};

export type SearchInfo = {
  textSnippet: string;
};

export type VolumeInfo = {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: Date;
  description: string;
  industryIdentifiers: IndustryIdentifier[];
  readingModes: ReadingModes;
  pageCount: number;
  printType: string;
  categories: string[];
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary: PanelizationSummary;
  imageLinks: ImageLinks;
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
};

export type ImageLinks = {
  smallThumbnail: string;
  thumbnail: string;
};

export type IndustryIdentifier = {
  type: string;
  identifier: string;
};

export type PanelizationSummary = {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
};

export type ReadingModes = {
  text: boolean;
  image: boolean;
};
