import { useCallback, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { Col, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Modal, ModalBody, ModalHeader, Row, UncontrolledDropdown } from 'reactstrap';
import { toast } from 'react-toastify';
function CustomImgH({ data, id }) {
  let label = data.label;
  let lastWordL = label.split(" ")[1]
  let setNodes = data.setNodes;
  
  const [modal, setModal] = useState(false)
  const [title, setTitle] = useState(label)
  const [image, setImage] = useState('')
  
  const handleChange = (e) => {
    setTitle(e.target.value);
  }
  
  const handleFile = (event, id) => {
    setImage(URL.createObjectURL(event.target.files[0]))
  }
  
  const notify = () => toast.success("Node updated successfully", { theme: "colored" });
  
  const handleUpdate = (id) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id !== id) {
          return node;
        }
        return {
          ...node,
          data: {
            ...node.data,
            label: title
          }
        }
      }))
    notify();
  }
  
  const deleteNode = (id) => {
    setNodes((nodes) => nodes.filter((item) => item.id !== id))
  };
  
  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  }, [modal]);
  
  return (
    <div>
      <Modal id="showModal" isOpen={modal} toggle={toggle} centered>
        <ModalHeader className="bg-light p-3" toggle={toggle}>
          Edit Node
        </ModalHeader>
        <ModalBody>
          <input type="hidden" id="id-field" />
          <div className="mb-3">
            <Label
              htmlFor="id-field"
              className="form-label"
            >
              Title
            </Label>
            <Input
              name="orderId"
              id="id-field"
              className="form-control"
              placeholder="Enter Title"
              type="text"
              onChange={handleChange}
              value={title}
            />
          </div>
        </ModalBody>
        <div className="modal-footer">
          <div className="hstack gap-2 justify-content-end">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => {
                setModal(false);
              }}
            >
              Close
            </button>
            <button className="btn btn-success" onClick={() => {
              handleUpdate(id);
              setModal(false);
            }}>
              Update
            </button>
          </div>
        </div>
      </Modal>
      <div className={image === '' ? 'customImg-node' : 'withImg customImg-node'}>
        <div className='d-flex align-items-center justify-content-between' style={{ padding: '0 2rem', paddingRight: '0' }}>
          <Row><Col xs={6}><div style={{ whiteSpace: 'nowrap' }}>{data.label}</div></Col></Row>
          <div className='ms-3'>
            <UncontrolledDropdown className="card-header-dropdown" direction="start">
              <DropdownToggle className="text-reset dropdown-btn" tag="a" role="button">
                <span className="text-muted fs-18"><i className="mdi mdi-dots-vertical"></i></span>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu dropdown-menu-end">
                <DropdownItem onClick={() => setModal(true)}>
                  <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                  Edit</DropdownItem>
                <DropdownItem onClick={() => deleteNode(id)}>
                  <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                  Remove</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
        <div>
          <Row>
            <Col xs={12} className='d-flex align-items-center justify-content-center mt-2'>
              <input type="file" name={id} id={id} accept="image/*" onChange={event => handleFile(event, id)} className="inputfile" />
              <label htmlFor={id} ><i className="ri-upload-2-line align-bottom me-2 text-muted"></i>Choose a file</label>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className='d-flex align-items-center justify-content-center'>
              {image === '' ? null : <img src={image} alt='file' height={100} width={100} />}
            </Col>
          </Row>
          <div className='d-flex align-items-center justify-content-between w-100 px-2 mt-2'>
            <button className="button1 me-2">{label === 'Load Model' ? '4x' : 'RGBA'}</button><button className="button1">{data.label === 'Load Model' ? '23nb' : 'PNG'}</button>
          </div>
          <div className='d-flex align-items-center justify-content-center mt-2'>Outputs</div>
          <button className="button2 mt-2">{lastWordL}</button>
          {label === 'Load Model' ? null : <button className="button2">Image Directory</button>}
          <button className="button2 mb-2">{lastWordL} Name</button>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}
export default CustomImgH;
