import React, { useContext } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../router";
import Posts from '../pages/Posts';
import About from '../pages/About';
import Error from '../pages/Error';
import PostIdPage from '../pages/PostIdPage';
import { AuthContext } from "../context";
import Loader from "./UI/Loader/Loader";
import Login from '../pages/Login';

const AppRouter = () => {
    const { isAuth, isLoading } = useContext(AuthContext);
    console.log(isAuth)

    if (isLoading) {
        return <Loader />
    }

    return (
        // <Routes>
        //         {routes.map(route =>
        //             {<Route component={route.component} path={route.path}></Route>}
        //         ) }
        //         <Route path="*" element={<Error></Error>}/>

        //     </Routes>


        // isAuth
        //     ?
        <Routes>
            {privateRoutes.map(route =>
                <Route
                    element={<route.component />}
                    path={route.path}
                    key={route.path}>

                </Route>
            )}
            <Route path="*" element={<Error></Error>} />
            {/* <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            /> */}
        </Routes>
        // :
        // <Routes>
        //     {publicRoutes.map(route =>
        //         <Route
        //             element={<route.component />}
        //             path={route.path}
        //             key={route.path}>

        //             </Route>
        //     )}
        //      <Route path="*" element={<Login></Login>}/>
        // </Routes>
    );
};

export default AppRouter;