// function to randomly select a way of saying "any"
export const randomAny = () => {
  const anyOptions = [
    "all of 'em",
    "everything",
    "all of it",
    "any",
    "I don't care",
    "whatever",
    "yes!",
  ];
  return anyOptions[Math.floor(Math.random() * anyOptions.length)];
};

export const randomQuestion = (name) => {
  // return one of many ways to ask the question
  const questions = [
    `What kind of ${name} do you want?`,
    `What type of ${name} do you want?`,
    `${name}! Choose!`,
    `Aha! So now, choose a ${name}!`,
  ];
  return questions[Math.floor(Math.random() * questions.length)];
};
