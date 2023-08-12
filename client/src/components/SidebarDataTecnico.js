import React from 'react'
import * as AiIcons from 'react-icons/ai';
import * as TbIcons from "react-icons/tb";
import * as GiIcons from "react-icons/gi";

export const SidebarDataTecnico = [
    {
      title: 'Home',
      path: '/hometecnico',
      icon: <AiIcons.AiFillHome />,
      cName: 'nav-text'
    },
    {
      title: 'Listado de camiones en reparación',
      path: '/listadocamionesreparacion',
      icon: <TbIcons.TbList />,
      cName: 'nav-text'
    },
    {
      title: 'Registrar mantenimiento',
      path: '/registrarmantenimiento',
      icon: <GiIcons.GiAutoRepair />,
      cName: 'nav-text'
    },
    {
      title: 'Solicitud de materiales',
      path: '/solicitudmateriales',
      icon: <TbIcons.TbShoppingCartPlus />,
      cName: 'nav-text'
    },
    {
      title: 'Cerrar sesión',
      path: '/logout',
      icon: <TbIcons.TbLogout2 />,
      cName: 'nav-text'
    },
]