import React from "react";
import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Regsiter } from "./pages/login/Regsiter";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { DetailsPages } from "./pages/details/DetailsPages";
import { Account } from "./pages/account/Account";
import { Create } from "./components/create/Create";
import { useContext } from "react";
import { Context } from "./context/Context";

const App = () => {
  const { user } = useContext(Context);

  return (
    <>
      <Router>
        <Header />
          <Route exact path="/">{ user ? <Home/> : <Login/>}</Route>
          <Route exact path="/login"  >{ user ? <Home/> : <Login/>}</Route>
          <Route exact path="/register" >{ user ? <Home/> : <Regsiter/>}</Route>
          <Route exact path="/details/:id"  >{ user ? <DetailsPages/> : <Regsiter/>}</Route>
          <Route exact path="/account" >{ user ? <Account/> : <Login/>}</Route>
          <Route exact path="/create" >{ user ? <Create/> : <Login/>}</Route>
      </Router>
    </>
  );
};
export default App;
