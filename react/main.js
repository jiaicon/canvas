
const Parent = () => {
  React.useEffect(() => {
    Array.from({length: 10}).forEach(item => {
      console.log(item);
    })
  }, [])
  return (
    <div>
      123123
    </div>
  )
}

ReactDOM.render(<Parent />, document.querySelector('#root'));
