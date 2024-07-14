// components/Navbar/index.js

import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />

                <NavMenu>
                    <NavLink to="/" >
                        Option1
                    </NavLink>
                    <NavLink to="/events" activeStyle>
                        Option2
                    </NavLink>
                    <NavLink to="/annual" activeStyle>
                        Option3
                    </NavLink>
                    <NavLink to="/team" activeStyle>
                        Option4
                    </NavLink>
                    <NavLink to="/blogs" activeStyle>
                        Option5
                    </NavLink>
                    <NavLink to="/sign-up" activeStyle>
                        Sign Up
                    </NavLink>
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/signin">
                        Sign In
                    </NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar;
