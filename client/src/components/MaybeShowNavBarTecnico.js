import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const MaybeShowNavBarTecnico = ({children}) => {
  const location = useLocation();

  const [showNavBar, setShowNavBar] = useState(false);


  useEffect(() => {
    console.log('this is location: ', location)
    if(location.pathname === '/' || location.pathname === '/homeadmin'
    || location.pathname === '/abm/abmchoferes' || location.pathname === '/abm/abmchoferes/CreateChofer'
    || location.pathname === '/abm/abmchoferes/UpdateChofer' || location.pathname === '/abm/abmchoferes/modPassword'
    || location.pathname === '/abm/abmtecnicos' || location.pathname === '/abm/abmadmins'
    || location.pathname === '/abm/abmcamiones' || location.pathname === '/abm/abmclientes'
    || location.pathname === '/abm/abmestadocamion' || location.pathname === '/abm/abmtipocamion'
    || location.pathname === '/abm/abmtransportes' || location.pathname === '/listadochoferessintransporte'
    || location.pathname === '/listadoclientes' || location.pathname === '/listadogastos'
    || location.pathname === '/listadotransportesnorealizados') {
      setShowNavBar(false)
    } else {
      setShowNavBar(true)
    }
  }, [location])

  return (
    <div>{showNavBar && children}</div>
  )
}

export default MaybeShowNavBarTecnico