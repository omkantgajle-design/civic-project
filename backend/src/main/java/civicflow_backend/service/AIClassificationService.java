package civicflow_backend.service;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Service
public class AIClassificationService {

    private final RestClient restClient;

    public AIClassificationService() {

        this.restClient = RestClient.builder()
                .baseUrl("http://localhost:8000")
                .build();
    }

    // Feature 9: AI Complaint Classification
    public String classifyComplaint(String description) {

        Map<String, String> request = Map.of(
                "description", description
        );

        Map response = restClient.post()
                .uri("/classify")
                .contentType(MediaType.APPLICATION_JSON)
                .body(request)
                .retrieve()
                .body(Map.class);

        if (response == null || response.get("category") == null) {
            return "Other";
        }

        return response.get("category").toString();
    }


    // Feature 10: AI Priority Prediction
    public String predictPriority(String description) {

        Map<String, String> request = Map.of(
                "description", description
        );

        Map response = restClient.post()
                .uri("/predict-priority")
                .contentType(MediaType.APPLICATION_JSON)
                .body(request)
                .retrieve()
                .body(Map.class);

        if (response == null || response.get("priority") == null) {
            return "MEDIUM";
        }

        return response.get("priority").toString();
    }
}