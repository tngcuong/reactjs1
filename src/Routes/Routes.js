import Home from "../Pages/Home/Home"
import Login from "../Pages/Login/Login"
import Register from "../Pages/Register/Register"
import DefaultPage from "../Pages/DefaultPage/DefaultPage"

export const publicRoutes =[
    {path:"/home", component: Home},
    {path:"*", component: DefaultPage}
]

export const authRoutes =[
    {path:"/login", component: Login},
    {path:"/register", component: Register},
]