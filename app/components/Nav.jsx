import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import {moonIcon, sunIcon} from "./icons";

class Nav extends Component {
    render() {
        const classActive = ({isActive}) => "nav-link" + (isActive ? " active" : "");
        const {theme, toggleTheme} = this.props

        return (
            <nav className={'split'}>
                <NavLink to={'/'} className={classActive}>
                    Github Solo
                </NavLink>
                <ul className={'row'}>
                    <li>
                        <NavLink to={'/'} className={classActive}>
                            Popular
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/battle'} className={classActive}>
                            Battle
                        </NavLink>
                    </li>
                    <li>
                        <button className={'btn secondary icon'} onClick={toggleTheme}>
                            {theme === 'light' ? moonIcon : sunIcon}
                        </button>
                    </li>
                </ul>
            </nav>
        );
    }
}

Nav.propTypes = {
    theme: PropTypes.string.isRequired,
    toggleTheme: PropTypes.func.isRequired,
}
export default Nav;