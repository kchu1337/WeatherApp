import React from "react";
import "./styles/EditableSection.css";
import DatePicker from "./DatePicker.js";
import TextField from "./TextField.js";

const EditableSection = (props) => {

    return (
      <div className="editable-section">
        <DatePicker
          title="Start Date"
          onChange={props.onStartDateChange}
          testId="startDate"
          value={props.startDate}
        />
        <DatePicker
          title="End Date"
          onChange={props.onEndDateChange}
          testId="endDate"
          value={props.endDate}
        />
        <TextField
          title="Location"
          onChange={props.onLocationChange}
          testId="location"
          value={props.location}
        />
      </div>
    );
}

export default EditableSection;
