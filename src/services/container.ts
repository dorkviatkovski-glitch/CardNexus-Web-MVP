import { cardRepository } from "@/repositories/CardRepository";
import { CardProcessingPipeline } from "@/services/pipeline/CardProcessingPipeline";
import { MockPricingService } from "@/services/pricing/PricingService";
import { MockCardRecognitionService } from "@/services/recognition/CardRecognitionService";

const recognitionService = new MockCardRecognitionService();
const pricingService = new MockPricingService();

export const services = {
  repository: cardRepository,
  processingPipeline: new CardProcessingPipeline(
    cardRepository,
    recognitionService,
    pricingService,
  ),
};
