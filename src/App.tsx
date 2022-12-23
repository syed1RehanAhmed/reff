import React from "react";

import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  Layout,
  ReadyPage,
  ErrorComponent,
  AuthPage,
  Sider,
} from "@pankod/refine-antd";
import "@pankod/refine-antd/dist/reset.css";

import dataProvider, { GraphQLClient } from "@pankod/refine-hasura";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";
import List1 from "List";
import UserCreate from "userCreate";
const API_URL = "https://classic-hedgehog-98.hasura.app/v1/graphql";

const client = new GraphQLClient(API_URL, {
  headers: {
    "x-hasura-admin-secret":
      "4b7GMwNrRYxfc3llKxMvmQxdJqcYytRLwrae9oW1Qktn4vl6A5gouILF5dJIILl0",
    "x-hasura-role": "public",
    "content-type": "application/json",
  },
});

const gqlDataProvider = dataProvider(client);

function App() {
  return (
    <Refine
      dataProvider={gqlDataProvider}
      notificationProvider={notificationProvider}
      Layout={Layout}
      ReadyPage={ReadyPage}
      catchAll={<ErrorComponent />}
      routerProvider={routerProvider}
      authProvider={authProvider}
      LoginPage={AuthPage}
      resources={[{ name: "user_info", list: List1, create: UserCreate }]}
    />
  );
}

export default App;
