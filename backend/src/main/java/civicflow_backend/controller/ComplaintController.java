package civicflow_backend.controller;

import civicflow_backend.entity.Complaint;
import civicflow_backend.service.ComplaintService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "http://localhost:3000")
public class ComplaintController {

    private final ComplaintService complaintService;

    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    // Create complaint
    @PostMapping
    public ResponseEntity<Complaint> createComplaint(
            @RequestBody Complaint complaint) {

        Complaint savedComplaint =
                complaintService.createComplaint(complaint);

        return ResponseEntity.ok(savedComplaint);
    }

    // Get all complaints
    @GetMapping
    public ResponseEntity<List<Complaint>> getAllComplaints() {

        return ResponseEntity.ok(
                complaintService.getAllComplaints()
        );
    }

    // Get complaint by database ID
    @GetMapping("/{id}")
    public ResponseEntity<Complaint> getComplaint(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                complaintService.getComplaintById(id)
        );
    }

    // Get complaint by complaint code
    @GetMapping("/code/{complaintCode}")
    public ResponseEntity<Complaint> getComplaintByCode(
            @PathVariable String complaintCode) {

        return ResponseEntity.ok(
                complaintService.getComplaintByCode(complaintCode)
        );
    }

    // Update complaint status
    @PutMapping("/{id}/status")
    public ResponseEntity<Complaint> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {

        String status = request.get("status");

        Complaint updatedComplaint =
                complaintService.updateStatus(id, status);

        return ResponseEntity.ok(updatedComplaint);
    }
}