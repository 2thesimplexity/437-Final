import { Auth, History, Store, Switch, define } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
import { AppHeaderElement } from "./components/app-header";
import { PropertyTable } from "./components/property-table";
import { ProfileViewElement } from "./views/profile-view";
import { LandingView } from "./views/landing-view";

const routes = [
  {
    path: "/app/profiles/:id",
    view: (params: Switch.Params) => html`
      <profile-view .userid=${params.id}></profile-view>
    `
  },
  {
    path: "/app/properties",
    view: () => html`
      <property-table></property-table>
    `
  },
  {
    path: "/app",
    view: () => html`
      <landing-view></landing-view>
    `
  },
  {
    path: "/",
    redirect: "/app"
  }
];

define({
  "mu-auth": Auth.Provider,
  "mu-store": class AppStore extends Store.Provider<Model, Msg> {
    constructor() {
      super(update, init, "blazing:auth");
    }
  },
  "mu-history": History.Provider,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "blazing:history");
    }
  },
  "blazing-header": AppHeaderElement,
  "property-table": PropertyTable,
  "profile-view": ProfileViewElement,
  "landing-view": LandingView
});
