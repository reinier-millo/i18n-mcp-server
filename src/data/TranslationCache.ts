import { promises as fs } from 'fs';
import path from 'path';
import { extractJSONValues, traverseJSON } from '../utils/json';

export class TranslationCache {
  private static instance: TranslationCache;

  private languageFile?: string;

  private originalData: object = {};

  private originalValues: string[] = [];

  private targetLanguages: string[] = [];

  private translatedValues: Record<string, Record<string, string>> = {};

  chunkSize: number = 250;

  currentChunk: number = 0;

  private constructor() {}

  public get numOfEntries(): number {
    return this.originalValues.length;
  }

  public get values(): string[] {
    return this.originalValues;
  }

  public get translations(): Record<string, Record<string, string>> {
    return this.translatedValues;
  }

  /**
   * Allow to get singleton instance
   */
  static get shared(): TranslationCache {
    if (!TranslationCache.instance) {
      TranslationCache.instance = new TranslationCache();
    }
    return TranslationCache.instance;
  }

  public setTargetLanguages(languages: string[]): void {
    this.targetLanguages = languages;
    this.originalValues.forEach((value) => {
      this.translatedValues[value] = {};
      this.targetLanguages.forEach((language) => {
        this.translatedValues[value][language] = '';
      });
    });
  }

  async loadBaseI18nJsonLanguageFile(filePath: string): Promise<void> {
    try {
      this.languageFile = filePath;
      const data = await fs.readFile(filePath, 'utf8');
      this.originalData = JSON.parse(data);
      this.originalValues = extractJSONValues(this.originalData);
      this.currentChunk = 0;
    } catch (error) {
      throw new Error(
        `Error reading file: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  getNextChunk(): string[] {
    const start = this.currentChunk * this.chunkSize;
    const end = start + this.chunkSize;

    if (start >= this.originalValues.length) {
      return [];
    }

    const chunkValues = this.originalValues.slice(start, end);
    this.currentChunk++;
    return chunkValues;
  }

  updateTranslations(
    originalItems: string[],
    language: string,
    transaltedItems: string[],
  ): void {
    if (originalItems.length !== transaltedItems.length) {
      console.error('Original items and translated items length mismatch');
      return;
    }
    let idx = 0;
    for (const originalItem of originalItems) {
      if (!this.translatedValues[originalItem]) {
        this.translatedValues[originalItem] = {};
      }
      this.translatedValues[originalItem][language] = transaltedItems[idx];
      idx++;
    }
  }

  async saveTranslations(language: string) {
    if (!this.languageFile) {
      throw new Error('Language file not found');
    }
    const filename = path.join(
      path.dirname(this.languageFile),
      `${language}.json`,
    );
    let newValues = JSON.parse(JSON.stringify(this.originalData));
    newValues = traverseJSON(newValues, (text: string) => (this.translatedValues[text][language]?.length > 0
      ? this.translatedValues[text][language]
      : text));

    await fs.writeFile(filename, JSON.stringify(newValues, null, 4), 'utf8');
    return { filename };
  }

  clear(): void {
    this.originalData = {};
    this.originalValues = [];
    this.targetLanguages = [];
    this.translatedValues = {};
    this.languageFile = undefined;
  }
}
