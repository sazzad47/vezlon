import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";

//SimpleBar
import SimpleBar from "simplebar-react";

const SensorMapFilterSearchBar = ({ sensorData, recieveSearchValue }) => {
  const [value, setValue] = useState("");
  const [newFilteredData, setNewFileteredData] = useState([]);

  const onChangeData = (value) => {
    let newArr = sensorData.current.filter((element) => {
      return element.name.toUpperCase().includes(value.toUpperCase());
    });
    setNewFileteredData(newArr);
    setValue(value);
  };

  useEffect(() => {
    var searchOptions = document.getElementById(
      "sensorFilter-search-close-options"
    );
    var dropdown = document.getElementById("sensorFilter-search-dropdown");
    var searchInput = document.getElementById("sensorFilter-search-options");

    searchInput.addEventListener("focus", function () {
      var inputLength = searchInput.value.length;
      if (inputLength > 0) {
        dropdown.classList.add("show");
        searchOptions.classList.remove("d-none");
      } else {
        dropdown.classList.remove("show");
        searchOptions.classList.add("d-none");
      }
    });

    searchInput.addEventListener("keyup", function () {
      var inputLength = searchInput.value.length;
      if (inputLength > 0) {
        dropdown.classList.add("show");
        searchOptions.classList.remove("d-none");
      } else {
        dropdown.classList.remove("show");
        searchOptions.classList.add("d-none");
      }
    });

    searchOptions.addEventListener("click", function () {
      searchInput.value = "";
      dropdown.classList.remove("show");
      searchOptions.classList.add("d-none");
    });

    document.body.addEventListener("click", function (e) {
      if (e.target.getAttribute("id") !== "sensorFilter-search-options") {
        dropdown.classList.remove("show");
        searchOptions.classList.add("d-none");
      }
    });
  }, []);

  return (
    <React.Fragment>
      <form style={{margin:'0 !important', padding:'0 !important'}} className="app-search d-none d-md-block">
        <div className="position-relative">
          <Input
            type="text"
            className="form-control bg-light"
            placeholder="Search..."
            id="sensorFilter-search-options"
            value={value}
            onChange={(e) => {
              onChangeData(e.target.value);
            }}
          />
          <span className="mdi mdi-magnify search-widget-icon"></span>
          <span
            className="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none"
            id="sensorFilter-search-close-options"
          ></span>
        </div>
        <div
          className="dropdown-menu dropdown-menu-lg"
          id="sensorFilter-search-dropdown"
        >
          <SimpleBar style={{ height: "320px" }}>
            <div className="dropdown-header">
              <h6 className="text-overflow text-muted mb-0 text-uppercase">
                Search Result
              </h6>
            </div>
            {newFilteredData.length > 0 &&
              newFilteredData.map((item, index) => (
                <div
                  key={index}
                  className="dropdown-item notify-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => recieveSearchValue(item)}
                >
                  <i className="ri-bubble-chart-line align-middle fs-18 text-muted me-2"></i>
                  <span>{item.name}</span>
                </div>
              ))}
          </SimpleBar>
        </div>
      </form>
    </React.Fragment>
  );
};

export default SensorMapFilterSearchBar;
