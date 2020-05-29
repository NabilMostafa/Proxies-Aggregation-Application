import React from "react";
import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header h3">
                    <ul className="nav-item">
                        <Link className="nav-link js-scroll-trigger" to="/">Proxy Application</Link>
                    </ul>
                </div>
            </div>
        </nav>
    )
};

export default NavBar;