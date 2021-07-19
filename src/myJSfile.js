function myJSfile() {
  const a = new Promise();
  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
  });
  const b = new Map();

  Promise.all([promise1, promise2, promise3]).then((values) => {
    console.log(values);
  });

  return true;
}


export default myJSfile;
