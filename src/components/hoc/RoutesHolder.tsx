import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  LoadableCategory,
  LoadableChallenge,
  LoadableChallengeDetail,
  LoadableDashboard,
  LoadableReport,
  LoadableShop,
  LoadableSubscription,
  LoadableUser,
  LoadableUserDetail,
} from "../../utils/imports/LoadableComponents";
import Login from "../../pages/login";
import MainLayout from "../layouts/MainLayout";

const RoutesHolder: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes inside Main Layout */}
      <Route element={<MainLayout />}>
        <Route index element={<LoadableDashboard />} />

        {/* Categories */}
        <Route path="/categories" element={<LoadableCategory />} />
        <Route path="/categories/detail/:id" element={<LoadableShop />} />
        <Route path="/categories/create" element={<LoadableShop />} />
        <Route path="/categories/update/:id" element={<LoadableShop />} />

        {/* Challenges */}
        <Route path="/challenges" element={<LoadableChallenge />} />
        <Route
          path="/challenges/detail/:id"
          element={<LoadableChallengeDetail />}
        />
        <Route path="/challenges/create" element={<LoadableShop />} />
        <Route path="/challenges/update/:id" element={<LoadableShop />} />

        {/* Reports */}
        <Route path="/reports" element={<LoadableReport />} />
        <Route path="/reports/detail/:id" element={<LoadableShop />} />
        <Route path="/reports/create" element={<LoadableShop />} />
        <Route path="/reports/update/:id" element={<LoadableShop />} />

        {/* Shops */}
        <Route path="/shops" element={<LoadableShop />} />
        <Route path="/shops/detail/:id" element={<LoadableShop />} />

        {/* Subscriptions */}
        <Route path="/subscriptions" element={<LoadableSubscription />} />

        {/* Users */}
        <Route path="/users" element={<LoadableUser />} />
        <Route path="/users/detail/:id" element={<LoadableUserDetail />} />
      </Route>
    </Routes>
  );
};

export default RoutesHolder;
