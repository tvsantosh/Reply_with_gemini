package com.email.writer;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class EmailGeneratorController {


    private final EmailGeneratorService emailGeneratorService;

    private final OllamaService ollamaService;

@PostMapping("/generate")
public ResponseEntity<String> generateEmail( @RequestBody EmailRequest emailRequest )
{
    String response=emailGeneratorService.generateEmailReply( emailRequest );
    return ResponseEntity.ok( response );
}
@PostMapping("/reply")
public String generateReply(@RequestBody String emailContent) {
        String prompt = "Write a formal reply to this email:\n\n" + emailContent;
        return ollamaService.generateText(prompt);
}
}


