import React from 'react';


function Greeter(greeting: string) {
  console.log(greeting);
}

function* myGenerator() {
  yield true;
}

function MyComponent() {
  Greeter('hola');

  return (
    <p>MyComponent has a first name!</p>
  );
}



export default MyComponent;
