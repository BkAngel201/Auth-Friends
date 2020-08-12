import React from 'react';
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute ({component: Component, ...propsRest}) {
    return (
        <Route {...propsRest} render={() => {
            if(localStorage.getItem('AuthenticationToken')) {
                return <Component />
            }
            console.log("Lool");
            return <Redirect to="/" />
        }}/>
    )
}

export default PrivateRoute