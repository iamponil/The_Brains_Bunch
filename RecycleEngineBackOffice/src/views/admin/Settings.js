import React from "react";

// components

import CardSettings from "components/Cards/CardSettings.js";
import ProfileDetails from "components/Cards/ProfileDetails";

export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <ProfileDetails />
        </div>
      </div>
    </>
  );
}
