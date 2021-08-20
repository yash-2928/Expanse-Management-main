import FormF from "./Form";
import Card from "./Card";
import { useState } from "react";

function Home() {
  
  const [flage, setFlage] = useState(true);
  function listChanged()
  {
    console.log("listChanged called")
    setFlage((prestate) => {
      return !prestate;
    });
  }
  return (
    <div sm={6}>
      <FormF OnCountChange={listChanged} />
      <Card OnCountChange={listChanged} />
    </div>
  );
}

export default Home;