import React from "react";
import { useSelector } from "react-redux";
// import MCsearch from "./MC_search";

// import { SearchContext } from "../utils/Search";
// import MCsearch from "./MC_search";
// import { SearchContext } from "../utils/Search";

export default function MCmain() {
  const state = useSelector((state) => state);
  const name = state.user.profile.nickname;
  // const text = state.search;
  // if (text) {
  //   // console.log("there is text");
  //   return <MCsearch />;
  // }
  // console.log(text);
  return <h1>Welcome {name}</h1>;
}
