# LLM Setup Guide

Quick setup guide for the LLM feature in Smart Approval Management System.

## 🚀 Quick Start

### Step 1: Install Ollama

**Windows:**
```powershell
# Download from https://ollama.ai/download
# Or use winget
winget install Ollama.Ollama
```

**Mac:**
```bash
brew install ollama
```

**Linux:**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### Step 2: Pull LLM Model

```bash
# Pull Llama 3 8B (recommended)
ollama pull llama3:8b

# Or use smaller model for testing
ollama pull llama3:8b-instruct
```

### Step 3: Start Ollama Server

```bash
ollama serve
```

The server will start on `http://localhost:11434`

### Step 4: Configure Backend

Update `backend/src/main/resources/application.yml` or set environment variables:

```yaml
llm:
  ollama:
    base-url: http://localhost:11434
    model: llama3:8b
    timeout: 30000
    temperature: 0.3
```

Or use environment variables:
```bash
export LLM_OLLAMA_BASE_URL=http://localhost:11434
export LLM_MODEL=llama3:8b
export LLM_TIMEOUT_MS=30000
export LLM_TEMPERATURE=0.3
```

### Step 5: Test the Integration

1. Start the backend server
2. Use the frontend LLM text input component
3. Enter a natural language approval request
4. The form should auto-populate

## 🧪 Testing

### Test with cURL

```bash
curl -X POST http://localhost:8080/api/v1/llm/extract-approval \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "text": "I need approval for purchasing new servers for IT department. Total cost is 25.5 lakhs. Vendor is ABC Technologies.",
    "userId": 1,
    "organizationId": 1
  }'
```

## 🔧 Troubleshooting

### Ollama not responding

1. Check if Ollama is running: `ollama list`
2. Verify model is downloaded: `ollama show llama3:8b`
3. Check Ollama logs

### Slow response times

- Use a smaller model (llama3:8b instead of 70b)
- Reduce temperature for faster inference
- Use GPU if available

### JSON parsing errors

- The LLM might return extra text. The parser handles this automatically.
- If issues persist, check the prompt template in `OllamaLLMService.java`

## 📚 Additional Resources

- [Ollama Documentation](https://ollama.ai/docs)
- [Llama 3 Model Card](https://ai.meta.com/llama/)
- [LLM Integration Documentation](./LLM_INTEGRATION.md)
