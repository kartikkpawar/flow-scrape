"use server";

import prisma from "@/lib/prisma";
import { AppNode, TaskType, WorkflowStatus } from "@/lib/types";
import { createFlowNode } from "@/lib/workflow/CreateFlowNode";
import {
  createWorkflowShema,
  createWorkflowShemaType,
} from "@/schema/workflows";
import { auth } from "@clerk/nextjs/server";
import { Edge } from "@xyflow/react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getWorkflowsForUser() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }
  return prisma.workflow.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });
}

export async function createWorkflow(form: createWorkflowShemaType) {
  const { success, data } = createWorkflowShema.safeParse(form);

  if (!success) {
    throw new Error("Invalid form data");
  }

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  const initWorkflow: { nodes: AppNode[]; edges: Edge[] } = {
    nodes: [],
    edges: [],
  };
  initWorkflow.nodes.push(createFlowNode(TaskType.LAUNCH_BROWSER));
  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: "TODO",
      ...data,
    },
  });
  if (!result) {
    throw new Error("Failed to create workflow");
  }

  redirect(`/workflow/editor/${result.id}`);
}

export async function deleteWorkflow(workflowId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  await prisma.workflow.delete({
    where: {
      userId,
      id: workflowId,
    },
  });

  revalidatePath("/workflows");
}

export async function updateWorkFlow({
  id,
  definition,
}: {
  id: string;
  definition: string;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  if (workflow.status !== WorkflowStatus.DRAFT) {
    throw new Error("Workflow is not draft");
  }

  await prisma.workflow.update({
    data: {
      definition,
    },
    where: {
      id,
      userId,
    },
  });
  revalidatePath("/workflows");
}
