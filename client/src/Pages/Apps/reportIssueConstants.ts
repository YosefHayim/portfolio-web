export const POPULAR_ISSUES = [
  "Extension not loading",
  "Login/Authentication issue",
  "Feature not working as expected",
  "Slow performance",
  "UI/Display bug",
  "Data not saving",
  "Crash or freeze",
  "Missing feature request",
  "Billing/Subscription issue",
  "Other (Custom)",
] as const;

export const ACCEPTED_FILE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "video/mp4",
];

export const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
export const MAX_DESCRIPTION_LENGTH = 1000;

export type AttachedFile = {
  file: File;
  preview: string;
  type: "image" | "video";
};
