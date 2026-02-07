package com.smartapproval.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration for file storage settings
 */
@Configuration
@ConfigurationProperties(prefix = "file.storage")
@Getter
@Setter
public class FileStorageConfig {
    private String basePath = "./storage/documents";
    private int maxSizeMb = 50;
    private String allowedExtensions = "pdf,doc,docx,xls,xlsx,png,jpg,jpeg,txt";
    private boolean organizationBasedStructure = true;
}

