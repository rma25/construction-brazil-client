import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StringManipulationService {
  constructor() {}

  public removeNaN(text?: string): string {
    const cleanText = text
      ? Array.from(text)
          .filter((x) => !isNaN(parseInt(x)))
          .join('')
      : '';

    return cleanText;
  }

  public containsNaN(text?: string, exceptions?: Array<string>): boolean {
    if (!text) return false;

    let filteredText = text;

    if (exceptions && exceptions.length > 0) {
      exceptions.forEach((exception) => {
        filteredText = filteredText.replaceAll(exception, '');
      });
    }

    const containsNaN = Array.from(filteredText).some((x) =>
      isNaN(parseInt(x))
    );

    return containsNaN;
  }
}
