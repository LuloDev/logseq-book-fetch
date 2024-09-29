import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user';

export const settings: SettingSchemaDesc[] = [
  {
    key: 'template',
    description:
      'The template to use when fetching a book. Use the following variables: title, isbn, authors, publishedAt, categories, pages, language, publisher, maturityRating, description, thumbnail',
    type: 'string',
    default:
      '- ![Book Cover]({{thumbnail}})\\n- Title: {{title}}\\n- ISBN: {{isbn}}\\n- Authors: {{authors}}\\n- Published At: {{publishedAt}}\\n- Categories: {{categories}}\\n- Pages: {{pages}}\\n- Language: {{language}}\\n- Publisher: {{publisher}}\\n- Maturity Rating: {{maturityRating}}\\n- Description: {{description}}',
    title: 'Template',
  },
];
