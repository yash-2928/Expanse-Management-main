import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Admin from "./Admin";
import Report from "./Report";

export default function Body() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/admin" component={Admin} />
        <Route path="/report" component={Report} />
        <Route path="/about" component={()=> <h4>Page not found</h4>} />
      </div>
    </Router>
  );
}