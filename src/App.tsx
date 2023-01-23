import { useEffect } from "react";
import { useCounterStore } from "./assets/store/counterStore";
import { shallow } from "zustand/shallow"; // se necesita esta función cuando se llama como objeto, ya que si no, al hacer cambios hay problemas

const App = () => {
  const count = useCounterStore((state) => state.count);
  const title = useCounterStore((state) => state.title);
  const posts = useCounterStore((state) => state.posts);

  // otra forma de ontener los valores
  /*  
  const {title, count} = useCounterStore ((state) => ({
    count: state.count,
    title: state.title
  }), shallow)

  console.log(values); */

  //se puede usar de esta forma const increment = useCounterStore(state => state.increment)
  // o esta

  const { increment, getPosts, clearStore, multiply } = useCounterStore();

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <>
      <div>{title}</div>
      <div>Counter: {count}</div>
      <button
        onClick={() => {
          increment(10);
        }}
      >
        Increment
      </button>
      <button
        onClick={() => {
          multiply(2);
        }}
      >
        multiply by 2
      </button>
      <hr />
      <button
        onClick={() => {
          clearStore();
        }}
      >
        clear
      </button>
      <hr />
      {JSON.stringify(posts)}
    </>
  );
};

export default App;
