import React from 'react'
import * as AiIcons from 'react-icons/ai';
import * as TbIcons from "react-icons/tb";
import * as GiIcons from "react-icons/gi";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
    {
        title: 'Home',
        path: '/homeadmin',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'ABM Choferes',
        path: '/abmchoferes',
        icon: <TbIcons.TbSteeringWheel />,
        cName: 'nav-text'
    },
    {
        title: 'ABM Tecnicos',
        path: '/abmtecnicos',
        icon: <GiIcons.GiMechanicGarage />,
        cName: 'nav-text'
    },
    {
        title: 'Soporte',
        path: '/soporte',
        icon: <IoIcons.IoMdHelpCircle />,
        cName: 'nav-text'
    },
]