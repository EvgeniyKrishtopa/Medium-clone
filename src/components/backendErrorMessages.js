import React from "react";

const ErrosList = (...errorMessages) => {
  const [messagesList] = errorMessages;

  const items = messagesList.errorMessages.map((errorMessage) => {
    return <li key={errorMessage}>{errorMessage}</li>;
  });

  return <ul className="error-messages">{items}</ul>;
};

const BackendErrorMessages = ({ backendError }) => {
  const errorKeys = Object.keys(backendError);

  const messages = errorKeys.map((name) => {
    const message = backendError[name].join("");
    return `${name} ${message}`;
  });

  return <ErrosList errorMessages={messages} />;
};

export default BackendErrorMessages;
