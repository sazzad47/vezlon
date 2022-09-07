import React, { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Modal,
  Form,
  ModalBody,
  ModalHeader,
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Map } from "google-maps-react";
import Sigma from "sigma";
import Graph from "graphology";
import data from "./data.json";
const mapStyles = {
  width: "100%",
  height: "100%",
};
const Graphs = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedNode, setSelectedNode] = useState({});
  useEffect(() => {
    LoadGEFX();
  }, []);
  const LoadGEFX = () => {
    const container = document.getElementById("sigma-container");
    // Instantiate sigma:
    const graph = new Graph();
    graph.import(data);
    const renderer = new Sigma(graph, container);
    const state = { searchQuery: "" };
    // Actions:
    function setHoveredNode(node) {
      if (node) {
        renderer.setSetting("labelColor", { color: "#000" });
        state.hoveredNode = node;
        state.hoveredNeighbors = new Set(graph.neighbors(node));
      } else {
        renderer.setSetting("labelColor", { color: "#fcfc" });
        state.hoveredNode = undefined;
        state.hoveredNeighbors = undefined;
      }

      // Refresh rendering:
      renderer.refresh();
    }
    
    // Bind graph interactions:
    renderer.on("enterNode", ({ node }) => {
      setHoveredNode(node);
    });
    renderer.on("leaveNode", () => {
      setHoveredNode(undefined);
    });
    renderer.addListener("clickNode", ({ node }) => {
      console.log("node is as follows", node);
      const response = data.nodes.filter((noded, index) => {
        if (node == noded.key) {
          return noded;
        }
      });
      console.log("the response is here", response[0]);
      setSelectedNode(response[0]);
      setShowModal(true);
    });
    // Render nodes accordingly to the internal state:
    // 1. If a node is selected, it is highlighted
    // 2. If there is query, all non-matching nodes are greyed
    // 3. If there is a hovered node, all non-neighbor nodes are greyed
    renderer.setSetting("labelColor", { color: "#fcfc" });
    renderer.setSetting("nodeReducer", (node, data) => {
      const res = { ...data };
      if (
        state.hoveredNeighbors &&
        !state.hoveredNeighbors.has(node) &&
        state.hoveredNode !== node
      ) {
        res.label = "";
        res.color = "#f6f6f6";
      }

      return res;
    });

    // Render edges accordingly to the internal state:
    // 1. If a node is hovered, the edge is hidden if it is not connected to the
    //    node
    // 2. If there is a query, the edge is only visible if it connects two
    //    suggestions
    renderer.setSetting("edgeReducer", (edge, data) => {
      const res = { ...data };
      if (state.hoveredNode && !graph.hasExtremity(edge, state.hoveredNode)) {
        res.hidden = true;
      }

      if (
        state.suggestions &&
        (!state.suggestions.has(graph.source(edge)) ||
          !state.suggestions.has(graph.target(edge)))
      ) {
        res.hidden = true;
      }

      return res;
    });
  };
  const toggle = () => {
    setShowModal(!showModal);
  };
  document.title = "Graph | Velzon - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <Modal id="adddeals" isOpen={showModal} toggle={toggle} centered>
        <ModalHeader className="bg-light p-3" toggle={toggle}>
          Node Details
        </ModalHeader>
        <Form>
          <ModalBody>
            <div
              className="mb-3"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <label htmlFor="deatType" className="form-label">
                Sample Image
              </label>
              <img
                src={selectedNode?.data?.image}
                style={{ height: "100px", width: "100px" }}
              />
            </div>
          </ModalBody>
        </Form>
      </Modal>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Graph" pageTitle="Pages" />
          <Row>
            <Col lg={12}>
              <Card style={{ width: "100%", height: "462px" }}>
                <CardHeader>
                  <h4 className="card-title mb-0">Graph</h4>
                </CardHeader>
                <CardBody>
                  <div style={{ width: "100%", height: "100%" }} id="sigma-container"></div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Graphs;
