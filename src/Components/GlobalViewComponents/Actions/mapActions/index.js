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
} from 'reactstrap';
import { DispatchContext, StateContext } from '../../../../pages/Pages/GlobalViewPage/StateProvider';
import classnames from 'classnames';

const MapActions = ({ flyToPos }) => {
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
        <div className="mb-2">
            <div className="d-flex">
                <Nav pills className="animation-nav profile-nav  gap-2 gap-lg-3 flex-grow-1"
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
                </Nav>
            </div>
        </div>
    )
}

export default MapActions;