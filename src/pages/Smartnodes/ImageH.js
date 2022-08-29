import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "react-flow-renderer";
import Imagebar from "./Imagebar";
import { MarkerType } from "react-flow-renderer";
import { Col, Row } from "reactstrap";
import CustomNode from "./CustomNode";
import CustomImgH from "./CustomImgH";
const nodeTypes = { custom: CustomNode, CustomImgH };
const ImageH = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  let id = nodes.length;
  const getId = () => `${id++}`;
  const initialNodes = ({ setNodes, nodes }) => [
    {
      id: "1",
      type: "CustomImgH",
      data: { label: "Load Model", setNodes, nodes },
      position: { x: 300, y: 0 },
    },
    {
      id: "6",
      type: "CustomImgH",
      data: { label: "Load Image", setNodes, nodes },
      position: { x: 100, y: 0 },
    },
    {
      id: "2",
      type: "custom",
      data: {
        label: "Resize",
        setNodes,
        nodes,
      },
      position: { x: 50, y: 250 },
    },
    {
      id: "3",
      type: "custom",
      data: {
        label: "Split Transparency",
        setNodes,
        nodes,
      },
      position: { x: 50, y: 200 },
    },
    {
      id: "4",
      type: "custom",
      position: { x: 250, y: 250 },
      data: {
        label: "Upscale",
        setNodes,
        nodes,
      },
    },
    ,
    {
      id: "5",
      type: "custom",
      position: { x: 150, y: 350 },
      data: {
        label: "Preview",
        setNodes,
        nodes,
      },
    },
  ];
  const initialedges = [
    { id: "e1-2", source: "1", target: "2", label: "" },
    { id: "e1-4", source: "1", target: "4" },
    {
      id: "e2-3",
      source: "2",
      target: "3",
      animated: true,
      label: "",
    },
    {
      id: "e3-5",
      source: "3",
      target: "5",
      label: "",
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    },
    ,
    {
      id: "e4-5",
      source: "4",
      target: "5",
      label: "",
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    },
  ];
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialedges);
  useEffect(() => {
    setNodes(initialNodes({ setNodes, nodes }));
  }, []);
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
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
        type:
          type === "Load Model" || type === "Load Image"
            ? "CustomImgH"
            : "custom",
        position,
        data: { label: `${type}`, setNodes, nodes },
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
          <Imagebar />
        </Row>
      </Col>
    </Row>
  );
};
export default ImageH;
