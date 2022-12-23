import React from "react";

import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  Layout,
  ReadyPage,
  ErrorComponent,
  AuthPage,
} from "@pankod/refine-antd";
import "@pankod/refine-antd/dist/reset.css";

import dataProvider, { GraphQLClient } from "@pankod/refine-hasura";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";
const API_URL = "https://your-hasura-url/graphql";

const client = new GraphQLClient(API_URL, {
  headers: {
    "x-hasura-role": "public",
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
    />
  );
}

export default App;
