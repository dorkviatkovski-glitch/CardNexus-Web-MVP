import type { CardIdentification, CardRecognizer } from '@/types';

export class CardRecognitionService implements CardRecognizer {
  async identify(url: string): Promise<CardIdentification> {
    const normalizedUrl = this.validateUrl(url);

    return {
      name: this.extractCardName(normalizedUrl),
      set: this.extractSetCode(normalizedUrl),
    };
  }

  private validateUrl(url: string): URL {
    try {
      return new URL(url);
    } catch {
      throw new Error('Card image URL is invalid. Provide a fully qualified URL.');
    }
  }

  private extractCardName(url: URL): string {
    const filename = url.pathname.split('/').pop() ?? '';
    const sanitized = filename
      .replace(/\.[^/.]+$/, '')
      .replace(/[_-]+/g, ' ')
      .trim();

    if (!sanitized) {
      return 'Unknown Card';
    }

    return sanitized
      .split(' ')
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(' ');
  }

  private extractSetCode(url: URL): string {
    const [firstSegment] = url.pathname.split('/').filter(Boolean);

    if (!firstSegment) {
      return 'UNKNOWN';
    }

    return firstSegment.replace(/[^a-z0-9]/gi, '').toUpperCase() || 'UNKNOWN';
  }
}
