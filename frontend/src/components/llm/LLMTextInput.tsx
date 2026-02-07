import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Card, ActivityIndicator, Text } from 'react-native-paper';
import { ExtractedApprovalData, LLMResponse } from '../../types';

interface LLMTextInputProps {
  onExtract: (data: ExtractedApprovalData) => void;
  onError?: (error: string) => void;
  userId: number;
  organizationId: number;
}

const EXAMPLE_PROMPTS = [
  "I need approval for purchasing new servers for IT department. Total cost is 25.5 lakhs. Vendor is ABC Technologies.",
  "Request approval for software license renewal. Budget is 10 lakhs, YTD spend is 5 lakhs. This is for growth purposes.",
  "Need approval for hiring 2 new developers for the Cloud Migration project. This is a non-financial request.",
];

export const LLMTextInput: React.FC<LLMTextInputProps> = ({
  onExtract,
  onError,
  userId,
  organizationId,
}) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<LLMResponse | null>(null);

  const handleExtract = async () => {
    if (!text.trim()) {
      onError?.('Please enter your approval request description');
      return;
    }

    setLoading(true);
    setResponse(null);

    try {
      const { llmService } = await import('../../services/llmService');
      const result = await llmService.extractApprovalRequest(
        text,
        userId,
        organizationId
      );

      setResponse(result);

      if (result.success && result.data) {
        onExtract(result.data);
      } else {
        onError?.(result.message || 'Failed to extract approval request');
      }
    } catch (error: any) {
      onError?.(error.message || 'Error processing request');
    } finally {
      setLoading(false);
    }
  };

  const handleUseExample = (example: string) => {
    setText(example);
  };

  return (
    <Card style={styles.card}>
      <Card.Title title="Create Approval with AI" subtitle="Describe your request in natural language" />
      <Card.Content>
        <TextInput
          label="Describe your approval request"
          value={text}
          onChangeText={setText}
          multiline
          numberOfLines={8}
          mode="outlined"
          disabled={loading}
          placeholder="Example: I need approval for purchasing new servers for IT department. Total cost is 25.5 lakhs..."
          style={styles.textInput}
        />

        <View style={styles.exampleSection}>
          <Text variant="bodySmall" style={styles.exampleLabel}>
            💡 Example prompts:
          </Text>
          {EXAMPLE_PROMPTS.map((example, index) => (
            <Button
              key={index}
              mode="text"
              compact
              onPress={() => handleUseExample(example)}
              disabled={loading}
              style={styles.exampleButton}
            >
              {example.substring(0, 50)}...
            </Button>
          ))}
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" />
            <Text variant="bodySmall" style={styles.loadingText}>
              AI is analyzing your request...
            </Text>
          </View>
        )}

        {response && !loading && (
          <View style={styles.responseContainer}>
            {response.warnings && response.warnings.length > 0 && (
              <View style={styles.warningContainer}>
                <Text variant="bodySmall" style={styles.warningText}>
                  ⚠️ Warnings: {response.warnings.join(', ')}
                </Text>
              </View>
            )}
            {response.errors && response.errors.length > 0 && (
              <View style={styles.errorContainer}>
                <Text variant="bodySmall" style={styles.errorText}>
                  ❌ Errors: {response.errors.join(', ')}
                </Text>
              </View>
            )}
            {response.success && (
              <Text variant="bodySmall" style={styles.successText}>
                ✅ Successfully extracted {response.data?.extractedFields?.length || 0} fields
              </Text>
            )}
          </View>
        )}

        <Button
          mode="contained"
          onPress={handleExtract}
          disabled={loading || !text.trim()}
          style={styles.extractButton}
          icon="robot"
        >
          {loading ? 'Processing...' : '✨ Generate Form'}
        </Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
  },
  textInput: {
    marginBottom: 16,
    minHeight: 150,
  },
  exampleSection: {
    marginBottom: 16,
  },
  exampleLabel: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  exampleButton: {
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  loadingText: {
    marginLeft: 8,
  },
  responseContainer: {
    marginBottom: 16,
  },
  warningContainer: {
    backgroundColor: '#FFF3CD',
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  warningText: {
    color: '#856404',
  },
  errorContainer: {
    backgroundColor: '#F8D7DA',
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  errorText: {
    color: '#721C24',
  },
  successText: {
    color: '#155724',
    fontWeight: 'bold',
  },
  extractButton: {
    marginTop: 8,
  },
});
