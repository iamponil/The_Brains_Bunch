import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";

import UserDetails from "views/admin/UserDetails";
import Users from "views/admin/Users.js";
import Login from "views/auth/Login";
import Settings from "views/admin/Settings";
import Analytics from "views/admin/Analytics";
export default function Admin() {

  return (
    <>
      <Sidebar />
   
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar  />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/profile" exact component={Settings} />
            <Route path="/admin/userdetails" exact component={UserDetails} />
            <Route path="/admin/users" exact component={Users} />
            <Route path="/admin/Analytics" exact component={Analytics} />
            <Route path="/auth/login" exact component={Login} />
            <Redirect from="/" to="/auth/login" />
            {/* <Redirect from="/" to="/admin/dashboard" /> */}
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
