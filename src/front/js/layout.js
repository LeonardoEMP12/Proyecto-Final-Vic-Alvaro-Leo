import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import Landing from "./pages/landingpage";
import { SelectFavGenre } from "./pages/selectfavgenre";
import injectContext from "./store/appContext";
import { Footer } from "./component/footer";
import Register from "./pages/register";
import Login from "./pages/login";
import NewPassword from "./pages/newpassword";
import Email from "./pages/email";
import Muro from "./pages/muro";
import PrivateRoute from "./component/privateRoute";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;
    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route element={<Landing />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<SelectFavGenre />} path="/selectfavgenre" />
                        <Route element={<Email />} path="/email"  />
                        {/* Private route implementation  */}
                        <Route path="/muro" element={<PrivateRoute Component={Muro} />} />
                        <Route path="/newpassword" element={<PrivateRoute Component={NewPassword} />} />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
