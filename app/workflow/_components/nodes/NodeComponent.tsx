import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./NodeCard";
import NodeHeader from "./NodeHeader";
import { AppNodeData } from "@/lib/types";
import { TaskRegistry } from "@/lib/workflow/task/Registry";
import NodesInputs from "./NodeInputs";
import NodeInput from "./NodeInput";

const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;
  const task = TaskRegistry[nodeData.type];
  return (
    <NodeCard nodeId={props.id} isSelected={!!props.selected}>
      <NodeHeader taskType={nodeData.type} />
      <NodesInputs>
        {task.inputs.map((input) => (
          <NodeInput input={input} key={input.name} nodeId={props.id} />
        ))}
      </NodesInputs>
    </NodeCard>
  );
});

export default NodeComponent;
NodeComponent.displayName = "NodeComponent";
// 2:24:35
