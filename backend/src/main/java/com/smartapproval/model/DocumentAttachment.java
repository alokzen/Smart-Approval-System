package com.smartapproval.model;

import com.smartapproval.constant.AttachmentType;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@Entity
@Table(name = "document_attachments")
@Data
@EqualsAndHashCode(callSuper = true)
public class DocumentAttachment extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id", nullable = false)
    private Organization organization;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approval_request_id")
    private ApprovalRequest approvalRequest;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private AttachmentType attachmentType;
    
    @Column(nullable = false, length = 255)
    private String fileName;
    
    @Column(nullable = false, length = 255)
    private String storedFileName;
    
    @Column(nullable = false, length = 500)
    private String filePath;
    
    @Column(nullable = false)
    private Long fileSize;
    
    @Column(length = 100)
    private String mimeType;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uploaded_by", nullable = false)
    private User uploadedBy;
    
    @Column(nullable = false)
    private LocalDateTime uploadedAt;
}
