package com.ai.SpringAi.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class ImageService {

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

    public ImageService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public String generateImage(String prompt){
        String requestBody = """
                {
                "model" : "openai/gpt-oss-20b:free",
                "prompt" : "%s"
                }
                """.formatted(prompt);

        try{
            String response = webClient.post()
                    .uri(apiUrl)
                    .header("Authorization", "Bearer" + apiKey)
                    .header("Content-Type", "application/json")
                    .header("HTTP-Referer", referer)
                    .header("X-Title", title)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            JsonNode root = objectMapper.readTree(response);

            JsonNode imageUrl = root.path("data").get(0).path("url");
            if(!imageUrl.isMissingNode()){
                return imageUrl.asText();
            }

            JsonNode base64 = root.path("data").get(0).path("b64_json");
            if(base64.isMissingNode()){
                return base64.asText();
            }

            return "No Image Generated.";

        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\": \"Error occurred while generating image\"}";
        }
    }
}

