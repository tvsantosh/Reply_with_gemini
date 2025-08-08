package com.email.writer;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

@Service
public class OllamaService {

    public String generateText(String prompt) {
        String url = "http://localhost:11434/api/generate";

        OllamaRequest request = new OllamaRequest("llama3", prompt, false);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<OllamaRequest> entity = new HttpEntity<>(request, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<OllamaResponse> response =
                restTemplate.postForEntity(url, entity, OllamaResponse.class);

        return response.getBody().getResponse();
    }
}
