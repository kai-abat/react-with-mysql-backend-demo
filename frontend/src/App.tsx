// import { useEffect, useState } from "react";

import "./App.css";
import ContactList from "./components/ContactList";
import TestForm from "./components/Form";
// import Divisible from "./components/Divisible";
// import Square from "./components/Square";

function App() {
  // const [numbers, setNumbers] = useState<number[]>([]);
  // useEffect(() => {
  //   // async function getData() {
  //   //   const response = await fetch("http://localhost:5173");
  //   //   const data = await response.json();
  //   //   setNumbers(data);
  //   // }
  //   // getData();

  //   fetch("http://localhost:5020")
  //     .then((response) => response.json())
  //     .then((data) => setNumbers(data));
  // }, []);

  return (
    <div>
      {/* <div>test</div> */}
      {/* {numbers.map((n) => {
        return (
          <div key={n}>
            <Divisible num={n}></Divisible>
          </div>
        );
      })} */}
      {/* <div className="wrapper">
        <Square type="red" />
        <Square type="green" />
      </div> */}
      <ContactList />
    </div>
  );
}

export default App;
