const doIt = () => {
  console.log('do it with args...');
  console.log(process.argv);
  console.log('env');
  console.log(process.env)
  return 'done';
}

doIt();
