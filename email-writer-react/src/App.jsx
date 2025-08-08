import React, { useState } from 'react';
import './App.css';
import {
  Container,
  TextField,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Button,
} from '@mui/material';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setGeneratedReply('');

    try {
      const response = await fetch('http://localhost:8080/api/email/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailContent, tone }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate reply');
      }

      const data = await response.text()
      setGeneratedReply(data);
    } catch (err) {
      setError(err.message);
      console.error('Error generating reply:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Email Reply Generator
      </Typography>

      <Box sx={{ mx: 3 }}>
        <TextField
          fullWidth
          label="Original Email Content"
          multiline
          rows={7}
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Tone (Optional)</InputLabel>
          <Select
            value={tone}
            label="Set Tone"
            onChange={(e) => setTone(e.target.value)}
          >
            <MenuItem value="formal">Formal</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
            <MenuItem value="concise">Concise</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="apologetic">Apologetic</MenuItem>
            <MenuItem value="enthusiastic">Enthusiastic</MenuItem>
            <MenuItem value="empathetic">Empathetic</MenuItem>
            <MenuItem value="persuasive">Persuasive</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!emailContent || loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : 'Generate Reply'}
        </Button>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {generatedReply && (
          <Box sx={{ mt: 3, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography variant="h6">Generated Reply:</Typography>
            <TextField
              fullWidth
              multiline
              rows={7}
              value={generatedReply}
              variant="outlined"
              InputProps={{ readOnly: true }}
              sx={{ mt: 2 }}
            />
            <Button
              variant="outlined"
              onClick={handleCopy}
              sx={{ mt: 2 }}
              fullWidth
            >
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default App;



