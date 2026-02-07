package com.smartapproval.repository;

import com.smartapproval.constant.AttachmentType;
import com.smartapproval.model.DocumentAttachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentAttachmentRepository extends JpaRepository<DocumentAttachment, Long> {
    List<DocumentAttachment> findByApprovalRequestId(Long approvalRequestId);
    List<DocumentAttachment> findByOrganizationId(Long organizationId);
    List<DocumentAttachment> findByAttachmentType(AttachmentType attachmentType);
    List<DocumentAttachment> findByUploadedById(Long userId);
    List<DocumentAttachment> findByApprovalRequestIdAndAttachmentType(
            Long approvalRequestId, AttachmentType attachmentType);
}
