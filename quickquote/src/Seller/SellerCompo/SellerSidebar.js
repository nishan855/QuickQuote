import React from 'react'
import "./SellerDashBoard.css";
import {SidebarData} from "./SidebarData";
import {Link} from "react-router-dom";

function SellerSidebar() {
    return (
        <div className = "Sidebar">
        <ul className= "SidebarList">
            {SidebarData.map((val,key) => {
        return (
            <li
                key = {key}
                className = "row">
                <Link to={val.link} className = "link">
                    {val.icon}
                    <span>{val.title}</span>
                </Link>

            </li>
        );
    })}
        </ul>
        </div>
    );

}

export default SellerSidebar
