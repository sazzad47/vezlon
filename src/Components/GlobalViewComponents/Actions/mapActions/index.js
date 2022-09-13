import React, { useContext, useState } from 'react';
import './mapActions.scss';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Input,
    InputGroup,
    InputGroupText,
    Nav,
    NavItem,
    NavLink,
    Row,
    Card,
    Col,
    Button,
    CardBody,
    Label,
} from 'reactstrap';
import { DispatchContext, StateContext } from '../../../../pages/Pages/GlobalViewPage/StateProvider';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import ConfirmBookmark from '../confirmBookmark';

const MapActions = ({setShowPosition, flyToPos }) => {
    const {
        startBookMark,
        bookmarked,
        showHoverCoordinates,
        hoverCoordinates,
    } = useContext(StateContext);
    const dispatch = useContext(DispatchContext);

    const [seachedBookmarked, setSearchedBookmarked] = useState([...bookmarked]);
    const [searchText, setSearchText] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleBookmark = () => {
        // start/stop bookmarking process
        dispatch({
            type: "UPDATE_STARTBOOKMARK"
        })
    };

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const toggleShowHover = () => {
        dispatch({
            type: "UPDATE_SHOWHOVERCOORD"
        })
    }

    const flyToBookmark = (e) => {
        const name = e.target.innerText;
        const savedPos = bookmarked.filter(mark => mark.name === name)
        if (!savedPos[0].pos) return
        const { longitude, latitude } = savedPos[0]
        flyToPos(longitude, latitude)
    }

    const onSearchChange = (e) => {
        const { value } = e.target
        setSearchText(value)
        if(!value.trim()) {
            setSearchedBookmarked([...bookmarked])
            return
        }
        const filtered = bookmarked.filter(bookmarked => ((bookmarked.name).toLowerCase()).includes(value.toLowerCase()))
        setSearchedBookmarked([...filtered])
    }

    const doNothing = () => { }

    return (
          <> 
          
           
            <Card>
                        <CardBody>
                            <Row className="g-2">
                                <Col sm={4} className='d-flex align-items-center justify-content-start'>
                                    {/* <div className="search-box">
                                        <Input type="text" className="form-control" placeholder="Search for cameras, locations..." />
                                        <i className="ri-search-line search-icon"></i>
                                    </div> */}
                                    <div className="form-check form-switch form-switch-right form-switch-md">
                                   

                                    <Label className="form-label text-muted">Show Position</Label>
                                    <Input onChange={(e) => setShowPosition(e.target.checked)} className="form-check-input code-switcher" type="checkbox" />
                                  
                                    </div>
                                </Col>
                                <Col sm={4}>
                                    <div className="d-flex align-items-center justify-content-center search-box">
                                        {/* <Input type="text" className="form-control" placeholder="Search for cameras, locations..." />
                                        <i className="ri-search-line search-icon"></i> */}
                                       <Dropdown
                                          isOpen={dropdownOpen} toggle={toggleDropdown}
                                          >
                                          <DropdownToggle type="button" className="btn btn-light view-btn" caret>
                                            Select location
                                          </DropdownToggle>
                                          <DropdownMenu 
                                          flip
                                       
                                          style={{ maxHeight: '120px', overflowY: 'scroll', overflowX: 'hidden'}}
                                          >
                                          {seachedBookmarked?.map((bookmark, i) => (
                                            <DropdownItem key={i} onClick={flyToBookmark}>{bookmark.name}</DropdownItem>
                                        ))}
                                          </DropdownMenu>
                                      </Dropdown>
                                    </div>
                                    {/* <div className="list-grid-nav hstack gap-1">

                                       
                                        <Dropdown
                                          
                                            >
                                            <DropdownToggle type="button" className="btn btn-soft-info btn-icon fs-14">
                                                <i className="ri-more-2-fill"></i>
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <li><Link className="dropdown-item" to="#">All</Link></li>
                                                <li><Link className="dropdown-item" to="#">Last Week</Link></li>
                                                <li><Link className="dropdown-item" to="#">Last Month</Link></li>
                                                <li><Link className="dropdown-item" to="#">Last Year</Link></li>
                                            </DropdownMenu>
                                        </Dropdown>
                                        <Button color="success" onClick={toggleBookmark}
                                            >
                                            <i className="ri-add-fill me-1 align-bottom"></i> Bookmark location</Button>
                                    </div> */}
                                
                                </Col>
                                <Col sm={4}>
                                    <div className='d-flex align-items-center justify-content-end'>

                                <Button color="success" onClick={toggleBookmark}
                                >
                                <i className="ri-add-fill me-1 align-bottom"></i> Bookmark location</Button>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                    <ConfirmBookmark startBookMark={startBookMark}/>
                {/* <Nav pills className="profile-nav  gap-2 gap-lg-3 flex-grow-1"
                    role="tablist">
                    <NavItem className="border rounded-2 navItems d-flex align-items-center justify-content-center cursor-pointer">
                        <NavLink
                            className={classnames({ active: showHoverCoordinates })}
                            onClick={toggleShowHover}
                        >
                            <i className="ri-airplay-fill d-inline-block d-md-none"></i> <span
                                className="d-none d-md-inline-block p-1">Show coordinates</span>
                        </NavLink>
                    </NavItem>
                    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} direction='down' color="primary" className="d-flex align-items-center justify-content-center" >
                        <DropdownToggle caret>Select location</DropdownToggle>
                        <DropdownMenu
                            flip
                            style={{ maxHeight: '120px', overflowY: 'scroll', overflowX: 'hidden'}}
                        >
                                <Input className="coordinates_input p-1" placeholder='Search' value={searchText} onChange={onSearchChange} />
                                {seachedBookmarked?.map((bookmark, i) => (
                                <DropdownItem key={i} onClick={flyToBookmark}>{bookmark.name}</DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    <NavItem className="border rounded-2 d-flex align-items-center justify-content-center cursor-pointer">
                        <NavLink
                            className={classnames({ active: startBookMark })}
                            onClick={toggleBookmark}
                        >
                            <i className="ri-list-unordered d-inline-block d-md-none"></i> <span
                                className="d-none d-md-inline-block p-1">Bookmark location</span>
                        </NavLink>
                    </NavItem>
                    {showHoverCoordinates && (
                        <>
                            <NavItem className="border rounded-2 d-flex align-items-center justify-content-center">
                                <NavLink>
                                    <i className="ri-list-unordered d-inline-block d-md-none"></i>
                                    <InputGroup className=" coordinates_inputGroup">
                                        <InputGroupText className="coordinates_inputText p-1">
                                            Long:
                                        </InputGroupText>
                                        <Input className="coordinates_input p-1" value={hoverCoordinates?.long} onChange={doNothing} />
                                    </InputGroup>
                                </NavLink>
                            </NavItem>
                            <NavItem className="border rounded-2 d-flex align-items-center justify-content-center ">
                                <NavLink>
                                    <i className="ri-list-unordered d-inline-block d-md-none"></i>
                                    <InputGroup className="coordinates_inputGroup">
                                        <InputGroupText className="coordinates_inputText p-1">
                                            Lat
                                        </InputGroupText>
                                        <Input className="coordinates_input p-1" value={hoverCoordinates?.lat} onChange={doNothing} />
                                    </InputGroup>
                                </NavLink>
                            </NavItem>
                        </>
                    )}
                </Nav> */}
           
       </>
    )
}

export default MapActions;