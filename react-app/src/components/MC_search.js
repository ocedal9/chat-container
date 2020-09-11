import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSearch } from "../features/search/searchSlice";

export default function MCsearch() {
  const state = useSelector((state) => state);
  // console.log(state);
  const dispatch = useDispatch();

  const allUsers = state.allusers;
  const searchByName = state.search;
  const clius = state.user.profile;
  const cliuser = clius.nickname;
  const contIdArr = state.contacts;
  let searchArr = [];
  for (const user of allUsers) {
    if (user.nickname !== cliuser) {
      let newCont = true;
      for (const contId of contIdArr) {
        if (user.id === contId) {
          newCont = false;
        }
      }
      if (newCont) searchArr.push(user);
    }
  }

  const filteredData = searchArr.filter((user) => {
    return user.nickname.toLowerCase().includes(searchByName.toLowerCase());
  });

  let { url } = useRouteMatch();
  const toprofile = function (e) {
    dispatch(setSearch(""));
  };

  return (
    <div>
      <h1>Users</h1>
      {filteredData.map((user) => (
        <p key={user.id}>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to={{
              pathname: `${url}/profile`,
              profile: { user },
              cliuser: { clius },
            }}
            onClick={toprofile}
          >
            {user.nickname}
          </Link>
        </p>
      ))}
    </div>
  );
}
