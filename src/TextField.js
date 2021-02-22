import React from "react";
import "./styles/TextField.css";

const TextField = (props) => {
    return (
      <div className="inputWrapper">
        <p>{props.title}</p>
        <input
          className="textField"
          type="text"
          onChange={props.onChange}
          value={props.value}
        />
      </div>
    );
}

export default TextField;
