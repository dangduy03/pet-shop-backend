import * as fs from 'fs';
import { template } from 'lodash';

export default class OtpTemplate {
  private html: any;

  constructor() {
    this.init();
  }

  private async readTemplateFile() {
    try {
      const fileContent = await new Promise<string>((resolve, reject) => {
        fs.readFile(`${__dirname}/otp.template.hbs`, (err, data) => {
          if (err) reject(err);
          else resolve(data.toString());
        });
      });
      return fileContent;
    } catch (error) {
      console.error('Error reading template file:', error);
      throw error; // Rethrow the error to handle it outside this method
    }
  }

  private async init() {
    try {
      const templateContent = await this.readTemplateFile();
      this.html = template(templateContent);
    } catch (error) {
      console.error('Error initializing template:', error);
    }
  }

  public render(context: any) {
    try {
      return this.html(context);
    } catch (error) {
      console.error('Render error', error);
      throw error; // Rethrow the error to handle it outside this method
    }
  }
}
