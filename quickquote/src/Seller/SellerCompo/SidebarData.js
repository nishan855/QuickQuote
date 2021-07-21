import React from 'react'
import AutorenewOutlinedIcon from '@material-ui/icons/AutorenewOutlined';
import ReorderIcon from '@material-ui/icons/Reorder';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import AssessmentRoundedIcon from '@material-ui/icons/AssessmentRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CategoryIcon from '@material-ui/icons/Category';

export const SidebarData = [
    {
        title: "Profile",
        icon: <AccountCircleIcon />,
        link: "/profile"
    },
    {
        title : "Material",
        icon : <CategoryIcon/>,
        link : "/material"
    },
    {
        title: "Setup Material",
        icon: <AutorenewOutlinedIcon />,
        link: "/setup"
    },
    {

        title : "Manage Order",
        icon : <ReorderIcon/>,
        link : "/manage_order"
    },
    {

        title : "Track Order",
        icon : <TrackChangesIcon />,
        link : "/track_order"
    },
    {

        title : "Customer",
        icon : <GroupRoundedIcon />,
        link : "/customer"
    },
    {
        title : "Metrics",
        icon : <AssessmentRoundedIcon/>,
        link : "/metrics"
    }
]

