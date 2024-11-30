import ProtectedRoute from "@/components/misc/ProtectedRoute";
import { Layout } from "@ui-kitten/components";
import React from "react";

export default function index() {
  return (
    <ProtectedRoute redirectTo="/home">
      <Layout />
    </ProtectedRoute>
  );
}
