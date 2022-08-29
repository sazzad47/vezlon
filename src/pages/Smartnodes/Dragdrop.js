import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "react-flow-renderer";
import Sidebar from "./Sidebar";
import { MarkerType } from "react-flow-renderer";
import { Col, Row } from "reactstrap";
import CustomNode from "./CustomNode";
const initialNodes = ({ setNodes, nodes }) => [
  {
    id: "1",
    type: "custom",
    data: {
      label: "UI",
      setNodes,
      nodes,
    },
    position: { x: 100, y: 0 },
  },
  {
    id: "2",
    type: "custom",
    data: {
      label: "CAMERA",
      setNodes,
      nodes,
    },
    position: { x: 50, y: 100 },
  },
  {
    id: "3",
    type: "custom",
    data: {
      label: "3D-model generator",
      setNodes,
      nodes,
    },
    position: { x: 50, y: 200 },
  },
  {
    id: "4",
    type: "custom",
    position: { x: 250, y: 100 },
    data: {
      label: "CLOTH SELECTOR",
      setNodes,
      nodes,
    },
  },
  ,
  {
    id: "5",
    type: "custom",
    position: { x: 150, y: 300 },
    data: {
      label: "RENDERER",
      setNodes,
      nodes,
    },
  },
];
const initialedges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    label: "Open-camera",
    type: "step",
    labelStyle: { fill: "#05d0e3" },
    labelBgStyle: { fill: "#020d1f" },
  },
  { id: "e1-4", source: "1", target: "4" },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: true,
    label: "person image",
    type: "step",
    labelStyle: { fill: "#05d0e3" },
    labelBgStyle: { fill: "#020d1f" },
  },
  {
    id: "e3-5",
    source: "3",
    target: "5",
    label: "person 3D model",
    type: "step",
    labelStyle: { fill: "#05d0e3" },
    labelBgStyle: { fill: "#020d1f" },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  ,
  {
    id: "e4-5",
    source: "4",
    target: "5",
    label: "user selected cloth",
    type: "step",
    labelStyle: { fill: "#05d0e3" },
    labelBgStyle: { fill: "#020d1f" },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];
let id = 6;
const getId = () => `${id++}`;
const nodeTypes = { custom: CustomNode };
const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialedges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  useEffect(() => {
    setNodes(initialNodes({ setNodes, nodes }));
  }, []);
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      if (typeof type === "undefined" || !type) {
        return;
      }
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type: "custom",
        position,
        data: {
          label: `${type}`,
          setNodes,
          nodes,
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  return (
    <Row className="dndContainer">
      <Col xs={12} md={10} className="p-0 m-0 pe-3">
        <div className="dndflow">
          <ReactFlowProvider>
            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodeTypes={nodeTypes}
                fitView
              >
                <Controls />
              </ReactFlow>
            </div>
          </ReactFlowProvider>
        </div>
      </Col>
      <Col xs={12} md={2} className="dndTool px-1">
        <Row className="drag-drop">
          <Sidebar />
        </Row>
      </Col>
    </Row>
  );
};
export default DnDFlow;
