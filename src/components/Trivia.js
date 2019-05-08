import React, { Component } from "react";
import TriviaList from "./TriviaList";
import API from "../utils/api";
export class Trivia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      questions: null,
      options: null,
      answer: null,
      index: 0
    };
  }

  getData = () => {
    API.get("api.php?amount=10&category=9&difficulty=easy&type=multiple")
      .then(res => {
        this.setState({ results: res.data.results });
        this.optionsCombining(res.data.results);
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.getData();
  }

  optionsCombining = () => {
    const { results, index } = this.state;
    let incorrect = results[index].incorrect_answers;
    incorrect.splice(
      Math.floor(Math.random() * 4),
      0,
      results[index].correct_answer
    );
    console.log(incorrect);
    this.setState({ options: incorrect });
  };

  onAnswerChange = event => {
    const { results, index } = this.state;
    console.log(event.target.value);
    if (event.target.value === results[index].correct_answer) {
      console.log("yes");
    } else {
      console.log("no");
    }
    this.setState({ answer: event.target.value });
  };
  nextQuestion = () => {
    const { results, index } = this.state;

    console.log(index, results.length);
    if (index < results.length - 1) {
      this.setState({ index: index + 1, answer: null }, () => {
        this.optionsCombining();
      });
    }
  };
  render() {
    const { results, index, options } = this.state;

    let OptionData =
      options !== null &&
      options.map((data, index) => (
        <TriviaList
          data={data}
          key={index}
          onAnswerChange={this.onAnswerChange}
        />
      ));

    return (
      <div>
        <p>{results !== null && results[index].question}</p>
        {OptionData}
        <button onClick={this.nextQuestion}>next</button>
      </div>
    );
  }
}

export default Trivia;
