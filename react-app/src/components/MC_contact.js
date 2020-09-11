import React from "react";

export default function MCcontact(props) {
  const contact = props.location.state.user;

  return (
    <div style={{ color: "white" }}>
      <h1>Contact</h1>
      <h3>"""USER IMAGE"""</h3>

      <h3>Nickname: {contact.nick}</h3>
    </div>
  );
}
