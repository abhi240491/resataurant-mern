import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from "../screens/Home";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import UserDashboard from "../screens/UserDashboard";
import AdminDashboard from "../screens/AdminDashboard";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import NotFound from "../screens/NotFound";
import AdminEditProduct from "../screens/AdminEditProduct";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <UserRoute exact path="/user/dashboard" component={UserDashboard} />
          <AdminRoute
            exact
            path="/admin/dashboard"
            component={AdminDashboard}
          />
          <AdminRoute
            exact
            path="/admin/edit/product/:productId"
            component={AdminEditProduct}
          />
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
