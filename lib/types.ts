import { Node } from "@xyflow/react";

export enum WorkflowStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export enum TaskType {
  LAUNCH_BROWSER = "LAUNCH_BROWSER",
}
export enum TaskParamType {
  STRING = "STRING",
}

export interface AppNodeData {
  [key: string]: any;
  type: TaskType;
  inputs: Record<string, string>;
}

export interface AppNode extends Node {
  data: AppNodeData;
}

export interface TaskParam {
  name: string;
  type: TaskParamType;
  helperText?: string;
  required?: boolean;
  hideHandle?: boolean;
  [key: string]: any;
}

export interface ParamProps {
  param: TaskParam;
  value: string;
  updateNodeParamValue: (newValue: string) => void;
}
