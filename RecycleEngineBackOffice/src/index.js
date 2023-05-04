import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts


import Profile from "views/Profile.js";
import Index from "views/Index.js";
import Settings from "views/admin/Settings";
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
     
      <Route path="/auth" component={Auth} />
      {/* add routes without layouts */}
   
     
      <Route path="/" component={Admin} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
