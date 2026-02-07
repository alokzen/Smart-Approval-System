import api from './api';
import { ExtractedApprovalData, LLMRequest, LLMResponse } from '../types';

/**
 * Service for LLM-based approval request extraction
 */
export const llmService = {
  /**
   * Extract approval request data from natural language text
   */
  extractApprovalRequest: async (
    text: string,
    userId: number,
    organizationId: number
  ): Promise<LLMResponse> => {
    const request: LLMRequest = {
      text,
      userId,
      organizationId,
    };

    const response = await api.post<LLMResponse>(
      '/llm/extract-approval',
      request
    );

    return response.data;
  },
};
