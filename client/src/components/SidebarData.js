import React from 'react'
import * as AiIcons from 'react-icons/ai';
import * as TbIcons from "react-icons/tb";
import * as BsIcons from "react-icons/bs";
import * as GiIcons from "react-icons/gi";
import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";

export const SidebarData = [
    {
        title: 'Home',
        path: '/homeadmin',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'ABM Admins',
        path: '/abmadmins',
        icon: <RiIcons.RiAdminLine />,
        cName: 'nav-text'
    },
    {
        title: 'ABM Camiones',
        path: '/abmcamiones',
        icon: <BsIcons.BsTruck />,
        cName: 'nav-text'
    },
    {
        title: 'ABM Choferes',
        path: '/abmchoferes',
        icon: <TbIcons.TbSteeringWheel />,
        cName: 'nav-text'
    },
    {
        title: 'ABM Clientes',
        path: '/abmclientes',
        icon: <AiIcons.AiOutlineUserSwitch />,
        cName: 'nav-text'
    },
    {
        title: 'ABM Estado Camion',
        path: '/abmestadocamion',
        icon: <TbIcons.TbStatusChange />,
        cName: 'nav-text'
    },
    {
        title: 'ABM Tecnicos',
        path: '/abmtecnicos',
        icon: <GiIcons.GiMechanicGarage />,
        cName: 'nav-text'
    },
    {
        title: 'ABM Tipo Camion',
        path: '/abmtipocamion',
        icon: <TbIcons.TbVersions />,
        cName: 'nav-text'
    },
    {
        title: 'ABM Transportes',
        path: '/abmtransportes',
        icon: <BsIcons.BsBoxes />,
        cName: 'nav-text'
    },
    {
        title: 'Choferes Sin Transporte',
        path: '/listadochoferessintransporte',
        icon: <TbIcons.TbSteeringWheel />,
        cName: 'nav-text'
    },
    {
        title: 'Clientes',
        path: '/listadoclientes',
        icon: <AiIcons.AiOutlineUserSwitch />,
        cName: 'nav-text'
    },
    {
        title: 'Gastos',
        path: '/listadogastos',
        icon: <MdIcons.MdAttachMoney />,
        cName: 'nav-text'
    },
    {
        title: 'Transportes No Realizados',
        path: '/listadotransportesnorealizados',
        icon: <TbIcons.TbBoxOff />,
        cName: 'nav-text'
    },
]