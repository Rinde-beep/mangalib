import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/PostIdPage";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Register from "../pages/Register";


export const privateRoutes = [
    {path: '/', component: Main, exact: true},
    {path: '/main', component: Main, exact: true},
    {path: '/login', component: Login, exact: true},
    {path: '/reg', component: Register, exact: true},
    {path: '/about', component: About, exact: true},
    {path: '/posts', component: Posts, exact: true},
    {path: '/posts/:name', component: PostIdPage, exact: true},
]

export const publicRoutes = [
    {path: '/', component: Main, exact: true},
    {path: '/main', component: Main, exact: true},
    {path: '/login', component: Login, exact: true},
    {path: '/reg', component: Register, exact: true},
    {path: '/about', component: About, exact: true},
    {path: '/posts', component: Posts, exact: true},
    {path: '/posts/:name', component: PostIdPage, exact: true},
]