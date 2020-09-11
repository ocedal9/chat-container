import React from "react";
// import { SearchContext } from "../utils/Search";
// import MCsearch from "./MC_search";
import MCmain from "./MC_main";
import MCprofile from "./MC_profile";
import MCnoti from "./MC_notification";
import MCcontact from "./MC_contact";
import MCchatbox from "./MC_conversation";
import MCgroup from "./MC_group";
import MCsearch from "./MC_search";
import { useSelector } from "react-redux";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";

// export default function MainContent() {
//   const { searchByName } = useContext(SearchContext);
//   if (searchByName) {
//     return <MCsearch />;
//   } else {
//     return <MCmain />;
//   }
// }

export default function MainContent() {
  let { path } = useRouteMatch();
  const inSearch = useSelector((state) => state.search);
  // console.log(path);
  return (
    <Router>
      <Switch>
        <Route exact path={path} component={!inSearch ? MCmain : MCsearch} />

        <Route
          path={`${path}/notification`}
          component={!inSearch ? MCnoti : MCsearch}
        />
        <Route
          path={`${path}/profile`}
          component={!inSearch ? MCprofile : MCsearch}
        />
        <Route
          path={`${path}/contact`}
          component={!inSearch ? MCcontact : MCsearch}
        />
        <Route
          path={`${path}/conversation`}
          component={!inSearch ? MCchatbox : MCsearch}
        />
        <Route
          path={`${path}/group`}
          component={!inSearch ? MCgroup : MCsearch}
        />
        {/* <Route path={`${path}/search`} component={MCsearch} /> */}
      </Switch>
    </Router>
  );
}
