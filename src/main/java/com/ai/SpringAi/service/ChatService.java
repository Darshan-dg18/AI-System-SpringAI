package com.ai.SpringAi.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class ChatService {

    private final WebClient webClient;
    private final ObjectMapper objectMapper = new ObjectMapper();


    @Value("${open-router.api.key}")
    private String apiKey;

    @Value("${open-router.api.url}")
    private String apiUrl;

    @Value("${open-router.api.referer}")
    private String referer;

    @Value("${open-router.api.title}")
    private String title;

    public ChatService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public String getResponse(String prompt) {
        String requestBody = """
                {
                    "model": "openai/gpt-oss-20b:free",
                    "messages": [
                        {"role": "user", "content": "%s"}
                    ]
                }
                """.formatted(prompt);
        try {
            String response = webClient.post()
                    .uri(apiUrl)
                    .header("Authorization", "Bearer " + apiKey)
                    .header("HTTP-Referer", referer) // required by OpenRouter
                    .header("X-Title", title)       // optional
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            JsonNode root = objectMapper.readTree(response);
            JsonNode contentNode = root.path("choices").get(0).path("message").path("content");

            return contentNode.asText();
        }catch (Exception e){
            e.printStackTrace();
            return "Error occurred while processing AI rsponse";
        }
    }


}
