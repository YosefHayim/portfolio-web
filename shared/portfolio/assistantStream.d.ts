export type AssistantStreamEvent =
  | { type: "content"; content: string }
  | { type: "error"; error: string };

export type AssistantStreamParserResult = {
  events: AssistantStreamEvent[];
  done: boolean;
};

export type AssistantStreamParser = {
  push(chunk: string): AssistantStreamParserResult;
  flush(): AssistantStreamParserResult;
};

export declare const ASSISTANT_STREAM_DONE_EVENT: string;
export declare function encodeAssistantSseEvent(
  event: AssistantStreamEvent,
): string;
export declare function createAssistantStreamParser(): AssistantStreamParser;
