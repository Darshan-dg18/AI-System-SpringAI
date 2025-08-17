package com.ai.SpringAi.controller;

import com.ai.SpringAi.service.ChatService;
import com.ai.SpringAi.service.ImageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@RequestMapping("/api/images")
public class GenAiController {

    private final ChatService chatService;
    private final ImageService imageService;

    public GenAiController(ChatService chatService, ImageService imageService) {
        this.chatService = chatService;
        this.imageService = imageService;
    }

    @GetMapping("/ask-ai")
    public String getResponse(@RequestParam String prompt) {
        return chatService.getResponse(prompt);
    }

    @GetMapping("/generate-image")
    public ResponseEntity<?> generateImage(@RequestParam String prompt) {
        String result = imageService.generateImage(prompt);
        return ResponseEntity.ok().body(result);
    }

}
