import { ExecutionEnviornment, TaskType, WorkflowTask } from "@/lib/types";
import { LaunchBrowserExecutor } from "./LaunchBrowserExecutor";
import { PageToHtmlExecutor } from "./PageToHtmlExecutor";
import { ExtractTextFromElement } from "./ExtractTextFromElementExecutor";

type ExecutorFunction<T extends WorkflowTask> = (
  enviornment: ExecutionEnviornment<T>
) => Promise<boolean>;

type RegistryType = {
  [key in TaskType]: ExecutorFunction<WorkflowTask & { type: key }>;
};

export const ExecutorRegistry: RegistryType = {
  LAUNCH_BROWSER: LaunchBrowserExecutor,
  PAGE_TO_HTML: PageToHtmlExecutor,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElement,
};