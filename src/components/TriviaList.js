import React from "react";

const TriviaList = ({ data, index, onAnswerChange }) => {
  return (
    <div key={index}>
      <label>{data}</label>
      <input
        type="radio"
        name="choice"
        value={data}
        onChange={onAnswerChange}
      />
    </div>
  );
};

export default TriviaList;
