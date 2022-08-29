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
        onDragStart={(event) => onDragStart(event, "UI")}
        draggable
      >
        UI
      </div>
      <div
        className="element"
        onDragStart={(event) => onDragStart(event, "CAMERA")}
        draggable
      >
        CAMERA
      </div>
      <div
        className="element"
        onDragStart={(event) => onDragStart(event, "CLOTH SELECTOR")}
        draggable
      >
        CLOTH SELECTOR
      </div>
      <div
        className="element"
        onDragStart={(event) => onDragStart(event, "3D-model-generator")}
        draggable
      >
        3D-model-generator
      </div>
      <div
        className="element"
        onDragStart={(event) => onDragStart(event, "RENDERER")}
        draggable
      >
        RENDERER
      </div>
    </aside>
  );
}
export default Sidebar;
