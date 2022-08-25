import React, { useState, useRef,useEffect, useCallback } from 'react';
import { useDrop } from "react-dnd";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from 'react-flow-renderer';

import Sidebar from './Sidebar';
import { MarkerType } from 'react-flow-renderer';
import './Search.css';
import { Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from 'reactstrap';


const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: {
      label: 'UI'
    },
    position: { x: 100, y: 0 },
  },
  {
    id: '2',
    data: {
      label: 'CAMERA'
    },
    position: { x: 50, y: 100 },
  },
  {
    id: '3',
    data: {
      label: '3D-model generator'
    },
    position: { x: 50, y: 200 },
    style: {
      
      border: '1px solid #222138',
      width: 180,
    },
  },
  {
    id: '4',
    position: { x: 250, y: 100 },
    data: {
      label: 'CLOTH SELECTOR',
    },
  },
  ,
  {
    id: '5',
    position: { x: 150, y: 300 },
    data: {
      label: 'RENDERER',
    },
  },
  
  

];
const initialedges = [
  { 
    id: 'e1-2', 
    source: '1', 
    target: '2', 
    label: 'Open-camera',
    type: 'step',
    labelStyle: { fill: '#05d0e3'}, 
    labelBgStyle: { fill: '#020d1f'},
  },
  { id: 'e1-4', 
    source: '1', 
    target: '4',
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    animated: true,
    label: 'person image',
    type: 'step',
    labelStyle: { fill: '#05d0e3'}, 
    labelBgStyle: { fill: '#020d1f'},
  },
  {
    id: 'e3-5',
    source: '3',
    target: '5',
    label: 'person 3D model',
    type: 'step',
    labelStyle: { fill: '#05d0e3'}, 
    labelBgStyle: { fill: '#020d1f'},
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  ,
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    label: 'user selected cloth',
    type: 'step',
    labelStyle: { fill: '#05d0e3'}, 
    labelBgStyle: { fill: '#020d1f'},
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  
   
];

let id = 6;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialedges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    // event.dataTransfer.dropEffect = 'move';
  }, []);
  const [nodeHidden, setNodeHidden] = useState(false);
  const [nodeName, setNodeName] = useState();
  console.log('nodes', nodes)
  console.log('nodehidden', nodeHidden)
  
  // useEffect(() => {
  //   setNodes((nds) =>
  //     nds.map((node) => {
  //       if (node.id === nodeName) {
  //         // when you update a simple type you can just update the value
  //         node.hidden = nodeHidden;
  //       }

  //       return node;
  //     })
  //   );
    
  // }, [nodeHidden, setNodes]);
  
  const deleteNode = (name) => {
    setNodes((nodes) => nodes.filter((element) => element.data.label !== name));
    
  };
 
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label:`${type}`  },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  console.log('reactFlow', reactFlowWrapper)
  return (
     <Row className='dndContainer'>
      <Col xs={12} md={10} className='p-0 m-0 pe-3'>

    <div className="dndflow">
      <ReactFlowProvider>
        <div draggable className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
           
            nodes={nodes}
            edges={edges}
            
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            
          >
            
            <Controls />
           
          </ReactFlow>
        </div>
      
      </ReactFlowProvider>
    </div>
      </Col>
      <Col xs={12} md={2} className='dndTool px-1'>
        <Row className='deleteNode'>
          <div className='heading px-5'>Delete Nodes</div>
        <div className="flex-shrink-0">
        <UncontrolledDropdown className="card-header-dropdown" direction='start'>
            <DropdownToggle className="deleteBtn" role="button" tag="a">
               Delete a Node<i className="mdi mdi-chevron-down align-middle ms-1"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu dropdown-menu-end">
                <DropdownItem onClick={() => deleteNode('UI')}>UI</DropdownItem>
                <DropdownItem onClick={() => deleteNode('CAMERA')}>CAMERA</DropdownItem>
                <DropdownItem onClick={() => deleteNode('CLOTH SELECTOR')}>CLOTH SELECTOR</DropdownItem>
                <DropdownItem onClick={() => deleteNode('3D-model generator')}>3D-model generator</DropdownItem>
                <DropdownItem onClick={() => deleteNode('RENDERER')}>RENDERER</DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    </div>
        </Row>
        <Row className='drag-drop'>

      <Sidebar />
        </Row>
      </Col>
     </Row>
  );
};

export default DnDFlow;
