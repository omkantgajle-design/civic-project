package civicflow_backend.service;

import civicflow_backend.entity.Complaint;
import civicflow_backend.repository.ComplaintRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final AIClassificationService aiClassificationService;

    public ComplaintService(
            ComplaintRepository complaintRepository,
            AIClassificationService aiClassificationService) {

        this.complaintRepository = complaintRepository;
        this.aiClassificationService = aiClassificationService;
    }

    // Create a new complaint
    public Complaint createComplaint(Complaint complaint) {

        // 1. Set basic complaint information
        complaint.setStatus("PENDING");
        complaint.setCreatedAt(LocalDateTime.now());

        // 2. AI Classification
        if (complaint.getDescription() != null &&
                !complaint.getDescription().isBlank()) {

            String category =
                    aiClassificationService.classifyComplaint(
                            complaint.getDescription()
                    );

            complaint.setCategory(category);
        }

        // 3. AI Priority Prediction
        if (complaint.getDescription() != null &&
                !complaint.getDescription().isBlank()) {

            String priority =
                    aiClassificationService.predictPriority(
                            complaint.getDescription()
                    );

            complaint.setPriority(priority);
        }

        // 4. Generate complaint code
        if (complaint.getComplaintCode() == null ||
                complaint.getComplaintCode().isBlank()) {

            complaint.setComplaintCode(
                    "CF-" + System.currentTimeMillis()
            );
        }

        // 5. Save complaint to PostgreSQL
        return complaintRepository.save(complaint);
    }


    // Get all complaints
    public List<Complaint> getAllComplaints() {

        return complaintRepository.findAll();
    }


    // Get complaint by database ID
    public Complaint getComplaintById(Long id) {

        return complaintRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Complaint not found"));
    }


    // Get complaint by complaint code
    public Complaint getComplaintByCode(String complaintCode) {

        return complaintRepository.findByComplaintCode(complaintCode)
                .orElseThrow(() ->
                        new RuntimeException("Complaint not found"));
    }


    // Update complaint status
    public Complaint updateStatus(Long id, String status) {

        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Complaint not found"));

        complaint.setStatus(status);

        return complaintRepository.save(complaint);
    }
}