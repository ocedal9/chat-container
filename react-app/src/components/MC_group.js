import React from "react";
import { useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_ROOM } from "../graphql/mutations";
import { socket } from "../views/dashboard";
import { socketn } from "../views/SignUp";

export default function MCgroup() {
  const state = useSelector((state) => state);
  const contacts = state.contacts;
  const conts = [...contacts];
  // console.log(conts);

  const [qwer5] = useMutation(CREATE_ROOM, {
    onCompleted(data) {
      // console.log("qwer5", data);
      socketn.emit("grouproom", data.createRoom);
    },
  });
  // console.log("creating room", data, loading);

  const cregrou = function (e) {
    e.preventDefault();
    const htmlElem = document.getElementsByClassName("checkbox");
    // console.log(htmlElem);
    const htmlArray = Array.from(htmlElem);
    // console.log(htmlArray);
    const membArray = [state.user.profile.id];
    for (const element of htmlArray) {
      if (element.checked) {
        membArray.push(element.value);
      }
    }
    // console.log(membArray);
    const gname = e.target.elements.groupname.value;
    // console.log(gname);
    const roomi = {};
    roomi.title = gname;
    roomi.type = "group";
    roomi.admin = state.user.profile.id;
    roomi.members = membArray;
    const date = new Date();
    const stringDate = date.toString();
    roomi.createdAt = stringDate;
    roomi.updatedAt = stringDate;
    qwer5({ variables: { roomi } });
    // console.log(e.target.elements);

    e.target.elements.groupname.value = "";
  };

  return (
    <div>
      <h1 style={{ color: "#61dafb" }}>
        Select the group`s members by checking the boxes and click create.
      </h1>
      <br></br>
      <form
        onSubmit={cregrou}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {!conts ? (
          <p>Add contacts</p>
        ) : (
          <div>
            {conts.map((conta) => (
              <div key={conta.id}>
                <input
                  style={{ float: "left" }}
                  type="checkbox"
                  className="checkbox"
                  value={conta.id}
                ></input>
                <label
                  style={{ float: "left", color: "white" }}
                  htmlFor={conta.id}
                >
                  {conta.nick}
                </label>
                <br></br>
              </div>
            ))}
          </div>
        )}

        <TextField
          //   className={classes.text}
          style={{ width: "20vw" }}
          variant="outlined"
          margin="normal"
          // fullWidth
          id="groupname"
          label="Group's name"
          name="groupname"
          placeholder="type here..."
          autoComplete="off"
          autoFocus
        />
        <Button
          style={{ color: "black", width: "20vw" }}
          type="submit"
          variant="contained"
          color="primary"
          to={{
            pathname: "/dashboard",
          }}
        >
          Create
        </Button>
      </form>
    </div>
  );
}
