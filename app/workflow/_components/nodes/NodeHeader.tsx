"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TaskType } from "@/lib/types";
import { TaskRegistry } from "@/lib/workflow/task/Registry";
import { Coins, GripVerticalIcon } from "lucide-react";
import React from "react";

function NodeHeader({ taskType }: { taskType: TaskType }) {
  const task = TaskRegistry[taskType];
  return (
    <div className="flex items-center gap-2 p-2">
      <task.icon size={16} />
      <div className="flex items-center justify-between w-full">
        <p className="text-xs font-bold uppercase text-muted-foreground">
          {task.label}
        </p>
        <div className="flex gap-1 items-center">
          {task.isEntryPoint && <Badge className="py-1">Entry Point</Badge>}
          <Badge className="flex gap-2 items-center text-xs py-1">
            <Coins size={16} />
            TODO
          </Badge>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="drag-handle cursor-grab"
          >
            <GripVerticalIcon size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NodeHeader;
