import type { CardRecognizer, PipelineResult } from '@/types';

export class CardProcessingPipeline {
  constructor(private readonly recognition: CardRecognizer) {}

  async run(cardId: string, imageUrl: string): Promise<PipelineResult> {
    if (!cardId.trim()) {
      throw new Error('Card id is required before processing can begin.');
    }

    const identification = await this.recognition.identify(imageUrl);

    return {
      cardId,
      identifiedAt: new Date().toISOString(),
      identification,
    };
  }
}
