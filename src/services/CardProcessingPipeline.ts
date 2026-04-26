interface CardRecognitionLike {
  identify(url: string): Promise<{ name: string; set: string }>;
}

export class CardProcessingPipeline {
  constructor(private recognition: CardRecognitionLike) {}

  async run(id: string, url: string) {
    void id;
    return await this.recognition.identify(url);
  }
}
