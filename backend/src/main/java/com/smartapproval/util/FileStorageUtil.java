package com.smartapproval.util;

import com.smartapproval.config.FileStorageConfig;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

/**
 * Utility class for file storage operations
 */
@Component
public class FileStorageUtil {

    private final FileStorageConfig fileStorageConfig;

    public FileStorageUtil(FileStorageConfig fileStorageConfig) {
        this.fileStorageConfig = fileStorageConfig;
    }

    /**
     * Store file and return the file path
     */
    public String storeFile(MultipartFile file, Long organizationId, Long approvalId) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String extension = getFileExtension(originalFilename);
        String uniqueFilename = UUID.randomUUID().toString() + "." + extension;
        
        Path targetLocation = buildFilePath(organizationId, approvalId, uniqueFilename);
        Files.createDirectories(targetLocation.getParent());
        
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
        
        return targetLocation.toString();
    }

    /**
     * Build file path based on organization structure
     */
    private Path buildFilePath(Long organizationId, Long approvalId, String filename) {
        if (fileStorageConfig.isOrganizationBasedStructure()) {
            return Paths.get(fileStorageConfig.getBasePath())
                .resolve("org_" + organizationId)
                .resolve("approval_" + approvalId)
                .resolve(filename);
        } else {
            return Paths.get(fileStorageConfig.getBasePath())
                .resolve(filename);
        }
    }

    private String getFileExtension(String filename) {
        if (filename == null || !filename.contains(".")) {
            return "";
        }
        return filename.substring(filename.lastIndexOf(".") + 1);
    }
}

