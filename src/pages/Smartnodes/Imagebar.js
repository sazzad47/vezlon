import React from "react";
function Sidebar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <aside>
      <div className="heading">Drag/Drop nodes</div>
      <div
        className="element"
        onDragStart={(event) => onDragStart(event, "Load Model")}
        draggable
      >
        Load Model
      </div>
      <div
        className="element"
        onDragStart={(event) => onDragStart(event, "Load Image")}
        draggable
      >
        Load Image
      </div>
      <div
        className="element"
        onDragStart={(event) => onDragStart(event, "Resize")}
        draggable
      >
        Resize
      </div>
      <div
        className="element"
        onDragStart={(event) => onDragStart(event, "Split Transparency")}
        draggable
      >
        Split Transparency
      </div>
      <div
        className="element"
        onDragStart={(event) => onDragStart(event, "Upscale")}
        draggable
      >
        Upscale
      </div>
      <div
        className="element"
        onDragStart={(event) => onDragStart(event, "Preview")}
        draggable
      >
        Preview
      </div>
    </aside>
  );
}
export default Sidebar;
