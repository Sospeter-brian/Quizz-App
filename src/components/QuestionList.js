import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";
function QuestionList(){
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
      fetch("https://man-united-quizzes-api.herokuapp.com/questions")
      //fetch("http://localhost:3000/questions")
      //fetch("https://backenqapi.herokuapp.com/db")
        .then((r) => r.json())
          .then((questions) => {
            setQuestions(questions);

        });
    }, []);


    function handleDeleteClick(id) {
       //fetch (`http://localhost:3000/questions/${id}`, {
      fetch(`https://man-united-quizzes-api.herokuapp.com/questions/${id}`,{
        //fetch(`https://backenqapi.herokuapp.com/db/${id}`,{
    
          method: "DELETE",
        })
          .then((r) => r.json())
          .then(() => {
            const updatedQuestions = questions.filter((q) => q.id !== id);
            setQuestions(updatedQuestions);
          });
      }

    
    function handleAnswerChange(id, correctIndex) {
        //fetch(`http://localhost:3000/questions/${id}`, {
        fetch(`https://man-united-quizzes-api.herokuapp.com/questions/${id}`,{
          //fetch(`https://backenqapi.herokuapp.com/db/${id}`,{
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ correctIndex }),
        })
          .then((r) => r.json())
          .then((updatedQuestion) => {
            const updatedQuestions = questions.map((q) => {
              if (q.id === updatedQuestion.id) return updatedQuestion;
              return q;
            });
            setQuestions(updatedQuestions);
          });
      }

      const questionItems = questions.map((q) => (
        <QuestionItem
          key={q.id}
          question={q}
          onDeleteClick={handleDeleteClick}
          onAnswerChange={handleAnswerChange}
        />
      ));
      return (
        <section>
            <h1>
                Man United Quizzes
            </h1>
            <ul>{questionItems}</ul>
        </section>

      )
}


export default QuestionList;