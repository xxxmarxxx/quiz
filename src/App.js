import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
// 228/229/230/231/232/233/234
function App() {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext();
  if (waiting) {
    return <SetupForm />;
  }
  if (loading) {
    return <Loading />;
  }
  // console.log(questions);
  const { question, incorrect_answers, correct_answer } = questions[index];
  // const answers = [...incorrect_answers, correct_answer];
  let answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);
  if (tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }
  return (
    <main>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          correct answers :{correct}/{index}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
        </article>
        <div className="btn-container">
          {answers.map((answer, index) => {
            return (
              <button
                key={index}
                className="answer-btn"
                onClick={() => checkAnswer(correct_answer === answer)}
                dangerouslySetInnerHTML={{ __html: answer }}
              />
            );
          })}
        </div>
        <button className="next-question" onClick={nextQuestion}>
          next questions
        </button>
      </section>
    </main>
  );
}

export default App;
