import { useCallback, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Modal, ModalBody, ModalHeader, UncontrolledDropdown } from 'reactstrap';
import { toast } from 'react-toastify';
function CustomNode({ data, id }) {
  let label = data.label;
  let setNodes = data.setNodes;

  const [modal, setModal] = useState(false)
  const [title, setTitle] = useState(label)

  const handleChange = (e) => {
    setTitle(e.target.value);
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
    <div className='custom-node'>
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
      <Handle type="target" position={Position.Top} />
      <div className='d-flex align-items-center justify-content-between' style={{ padding: '2rem', paddingRight: '0' }}>
        <div style={{ whiteSpace: 'nowrap' }}>{data.label}</div>
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
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}
export default CustomNode;
