export const API_BASE_URL = __DEV__ 
  ? 'http://localhost:8080/api/v1' 
  : 'https://api.smartapproval.com/api/v1';

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB in bytes

export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/png',
  'image/jpeg',
  'image/jpg',
  'text/plain',
];

export const ALLOWED_FILE_EXTENSIONS = [
  'pdf',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'png',
  'jpg',
  'jpeg',
  'txt',
];

