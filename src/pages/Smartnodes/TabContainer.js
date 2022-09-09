import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import DnDFlow from "./Dragdrop";
import ImageH from "./ImageH";
const TabContainer = () => {
  const [customActiveTab, setcustomActiveTab] = useState("smartNodes");
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };
  return (
    <>
      <Nav tabs className="nav-tabs-custom nav-success">
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({
              active: customActiveTab === "smartNodes",
            })}
            onClick={() => {
              toggleCustom("smartNodes");
            }}
          >
            Smart Nodes
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({
              active: customActiveTab === "imageHandler",
            })}
            onClick={() => {
              toggleCustom("imageHandler");
            }}
          >
            Image Handler
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent
        activeTab={customActiveTab}
        className="border border-top-0"
        id="nav-tabContent"
        style={{
          minHeight: "40rem",
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <TabPane id="nav-smartNodes" tabId="smartNodes">
          <DnDFlow />
        </TabPane>
        <TabPane id="nav-imageHandler" tabId="imageHandler">
          <ImageH />
        </TabPane>
      </TabContent>
    </>
  );
};
export default TabContainer;
