import { NotFoundError } from "@/domain/errors";
import type { CardRepository } from "@/repositories/CardRepository";
import type { PricingService } from "@/services/pricing/PricingService";
import type { CardRecognitionService } from "@/services/recognition/CardRecognitionService";
import { logger } from "@/lib/logger";

export class CardProcessingPipeline {
  constructor(
    private readonly repository: CardRepository,
    private readonly recognitionService: CardRecognitionService,
    private readonly pricingService: PricingService,
  ) {}

  async run(cardId: string) {
    const card = await this.repository.findById(cardId);

    if (!card) {
      throw new NotFoundError("Card not found", { cardId });
    }

    logger.info("Starting card processing", { cardId });

    const recognition = await this.recognitionService.identify(card.imageUrl);
    const valueUsd = await this.pricingService.estimateValueUsd({
      name: recognition.name,
      set: recognition.set,
    });

    const status = recognition.confidence >= 0.5 ? "identified" : "failed";

    const updated = await this.repository.update({
      id: cardId,
      name: recognition.name,
      set: recognition.set,
      status,
      valueUsd,
      updatedAt: new Date().toISOString(),
    });

    if (!updated) {
      throw new NotFoundError("Card not found after processing", { cardId });
    }

    logger.info("Finished card processing", {
      cardId,
      status,
      confidence: recognition.confidence,
      valueUsd,
    });

    return updated;
  }
}
