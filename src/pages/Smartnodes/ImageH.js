import React, { useState,useEffect, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from 'react-flow-renderer';
import Imagebar from './Imagebar';
import { MarkerType } from 'react-flow-renderer';
import './Search.css';
import { Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from 'reactstrap';

let id = 7;
const getId = () => `dndnode_${id++}`;

const ImageH = () => {
  
    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }   
    
const initialNodes = [

{
      id: '6',
      type: 'input',
      data: { label: (
      <>
       Load Model <br />
    <button className="button mt-3"><input  type="file"  accept="/*" onChange={handleChange}   /></button>
    <br />
    <br />Outputs<br />
    <br /><button className="button2" >Model</button>
    <br /><button className="button2">Model Name</button>
       </>
         
   
       )
    }
      ,
      position: { x: 300, y: 0 },
      style: {display: 'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width: 200, height: 200 },
   
    },   
    {
      id: '1',
      type: 'input',
      data: { label: (<>
       Load Image <br />
    <button className="button mt-3">
      <input className='button' type="file"  id="img" accept="image/*" onChange={handleChange}>
        </input>
        
      </button>
    <br /><div className='d-flex align-items-center justify-content-between w-100 px-2'>
    <button className="button1">RGBA</button><button className="button1">PNG</button>
      </div>
         
    <br />Outputs<br />
    <br /><button className="button2">Image</button>
    <br /><button className="button2">Image directory
    </button>
    <br /><button className="button2">Image name</button>
       </>
         
   
       )
    }
      ,
      position: { x: 100, y: 0 },
      style: { display: 'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width: 200, height: 270 },
   
    }, 
    {
      id: '2',
      data: {
        label:'Resize'
      },
      position: { x: 50, y: 250 },
    },
    {
      id: '3',
      data: {
        label: 'Split Transparency'
      },
      position: { x: 50, y: 200 },
      style: {
        background: '#1a192b',
        border: '1px solid #222138',
        width: 180,
      },
    },
    {
      id: '4',
      position: { x: 250, y: 250 },
      data: {
        label: 'Upscale'
      },
      style: {
        background: '#1a192b',
      }
    },
    ,
    {
      id: '5',
      position: { x: 150, y: 350 },
      data: {
        label: 'Preview',
      },
    },
    
    
  
  ];
   const initialedges = [
    { id: 'e1-2', source: '1', target: '2', label: '' },
    { id: 'e1-4', source: '1', target: '4' },
    {
      id: 'e2-3',
      source: '2',
      target: '3',
      animated: true,
      label: '',
    },
    {
      id: 'e3-5',
      source: '3',
      target: '5',
      label: '',
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    },
    ,
    {
      id: 'e4-5',
      source: '4',
      target: '5',
      label: '',
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    },
    
     
  ];
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialedges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const [nodeHidden, setNodeHidden] = useState(false);
  const [nodeName, setNodeName] = useState('');
  
  const deleteNode = (id) => {
    setNodes((nodes) => nodes.filter((element) => element.id !== id));
    
  };
  // useEffect(() => {
  //   setNodes((nds) =>
  //     nds.map((node) => {
  //       if (node.id === nodeName) {
  //         node.hidden = nodeHidden;
  //       }
  //       return node;
  //     })
  //   );
    
  // }, [nodeHidden, setNodes]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

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
 
  return (
    
    // <div className="dndflow">
         
        
         

    //   <ReactFlowProvider>
    //     <div className="reactflow-wrapper" ref={reactFlowWrapper}>
    //       <ReactFlow
    //         nodes={nodes}
    //         edges={edges}
    //         onNodesChange={onNodesChange}
    //         onEdgesChange={onEdgesChange}
    //         onConnect={onConnect}
    //         onInit={setReactFlowInstance}
    //         onDrop={onDrop}
    //         onDragOver={onDragOver}
    //         fitView
    //       >
    //         <Controls />
    //         <div className="updatenode__controls">
    //         <div className="updatenode__checkboxwrapper">
            
    //     <select value={nodeName} onChange={(evt) => setNodeName(evt.target.value)}>
    //     <option value="" selected disabled hidden>Select node</option>
    //     <option value="1">Load Image</option>
    //     <option value="6">Load Model</option>
    //     <option value="2">Resize </option>
    //     <option value="3">Split Transparency</option>
    //     <option value="4">Upscale</option>
    //     <option value="5">Preview</option>
    //     </select>
    //       <label>delete:</label>
    //       <input
    //         type="checkbox"
    //         checked={nodeHidden}
    //         onChange={(evt) => setNodeHidden(evt.target.checked)}
    //       />
    //     </div></div>
    //         <img src={file} height={100} width={100} />
            
    //       </ReactFlow>
    //     </div>
    //     <Imagebar />
    //   </ReactFlowProvider>
      
    // </div>

    <Row className='dndContainer'>
    <Col xs={12} md={10} className='p-0 m-0 pe-3'>

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
          fitView
          
        >
          
          <Controls />
          <img src={file} height={100} width={100} />
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
              <DropdownItem onClick={() => deleteNode('1')}>Load Image</DropdownItem>
              <DropdownItem onClick={() => deleteNode('6')}>Load Model</DropdownItem>
              <DropdownItem onClick={() => deleteNode('2')}>Resize</DropdownItem>
              <DropdownItem onClick={() => deleteNode('3')}>Split Transparency</DropdownItem>
              <DropdownItem onClick={() => deleteNode('4')}>Upscale</DropdownItem>
              <DropdownItem onClick={() => deleteNode('5')}>Preview</DropdownItem>
          </DropdownMenu>
      </UncontrolledDropdown>
  </div>
     
      </Row>
      <Row className='deleteNode mt-5'>

    <Imagebar />
      </Row>
    </Col>
   </Row>
    
  );
};

export default ImageH;
