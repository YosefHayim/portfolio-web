export type ContactEmailInput = {
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
};

export type ContactEmailStatus = "sending" | "sent" | "failed";

export type ContactEmailMessage = {
  id: string;
  role: string;
  content: string;
  emailStatus?: ContactEmailStatus;
};

export type ContactEmailMessageOutput = {
  subject: string;
  text: string;
  html: string;
};

export declare const CONTACT_RECIPIENT_DEFAULT = "yosefisabag@gmail.com";
export declare const CONTACT_EMAIL_MARKER_REGEX: RegExp;
export declare const CONTACT_EMAIL_MARKER_EXAMPLE: string;
export declare function parseContactEmailMarker(
  content: string,
): ContactEmailInput | null;
export declare function stripContactEmailMarker(content: string): string;
export declare function markContactEmailStatus<T extends ContactEmailMessage>(
  messages: readonly T[],
  messageId: string,
  emailStatus: ContactEmailStatus,
): T[];
export declare function findPendingContactEmailRequest<
  T extends ContactEmailMessage,
>(
  messages: readonly T[],
  isStreaming: boolean,
): { messageId: string; emailData: ContactEmailInput } | null;
export declare function createContactEmailPreview(
  response: string,
  maxLength?: number,
): string;
export declare function createPortfolioEmail(
  input: ContactEmailInput,
): ContactEmailMessageOutput;
