import fs from 'fs';
import path from 'path';

import shiki from 'shiki';

export const darkHighlighter = shiki
  .getHighlighter({
    theme: JSON.parse(fs.readFileSync(path.resolve('./src/lib/themes/dark.json'), 'utf-8')),
  })
  .then((highlighter) => {
    console.log(highlighter.codeToHtml(`console.log('shiki');`, { lang: 'js' }));
  });
