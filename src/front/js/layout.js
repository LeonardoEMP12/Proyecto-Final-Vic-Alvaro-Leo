import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Demo } from "./pages/demo";
import { LandingPage } from "./pages/landingpage"
import { SelectFavGenre } from "./pages/selectfavgenre";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Register from "./pages/register";
import Login from "./pages/login";
import NewPassword from "./pages/newpassword";
import Email from "./pages/email";

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
                    <Navbar />
                    <Routes>
                        <Route element={<Register />} path="/register" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<NewPassword />} path="/newpassword"  />
                        <Route element={<Email />} path="/email"  />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<LandingPage />} path="/" />
                        <Route element={<SelectFavGenre />} path="/selectfavgenre" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
