import { Request, Response } from "express";  // Importing required types for request and response
import MarkdownService from "../services/markdownService";  // Importing MarkdownService for handling Markdown conversion

class MarkdownController {
  private markdownService: MarkdownService;  // Private instance of MarkdownService

  constructor(markdownService: MarkdownService) {  // Constructor accepting MarkdownService
    this.markdownService = markdownService;  // Initializing the service
  }

  public convertMarkdown = (req: Request, res: Response): void => {  // Public method to handle Markdown conversion
    try {
      const { markdown } = req.body;  // Extracting Markdown input from request body

      if (!markdown) {  // Checking if Markdown input is provided
        res.status(400).json({ error: "Markdown input is required" });  // Returning error if input is missing
        return;
      }

      const html = this.markdownService.convertMarkdown(markdown);  // Converting Markdown to HTML using the service

      res.status(200).json({ html });  // Sending back the converted HTML
    } catch (error) {
      res.status(500).json({ error: "Server error" });  // Handling server errors
    }
  };
}

export default new MarkdownController(new MarkdownService());  // Exporting the controller instance with MarkdownService
