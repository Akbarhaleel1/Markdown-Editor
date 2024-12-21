import { marked } from 'marked';

class MarkdownService {
  public convertMarkdown(markdown: string): any {
    return marked(markdown);
  }
}

export default MarkdownService;
