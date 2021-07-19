import React from 'react';
import ReactDOM from 'react-dom';

import MyComponent from './myComponent';
import myJSfile from './myJSfile';


const App = () => {
  const isTrue = myJSfile();

  return (
    <>
    <h1>My React and TypeScript App! {new Date().getDate()}</h1>
    <MyComponent />
    <footer>is it true? {String(isTrue)}</footer>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
