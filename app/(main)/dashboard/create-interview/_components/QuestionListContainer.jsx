import React from 'react'

function QuestionListContainer({questionList}) {
  return (
    <div>
      <h2 className="font-bold text-lg ">Generated Interview Questions : </h2>
          <div className="p-5  border border-primary rounded-xl bg-[white] mt-5">
            {questionList.map((item, index) => (
              <div
                key={index}
                className="p-3 mt-4 border border-primary rounded-xl bg-primary text-[#faf5e6]"
              >
                <h2>
                  <span className="font-bold">Question:</span> {item.question}
                </h2>
                <h2>
                  <span className="font-bold">Type:</span> {item?.type}
                </h2>
              </div>
            ))}
          </div>
    </div>
  )
}

export default QuestionListContainer
