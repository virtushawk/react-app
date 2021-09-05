import "./App.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Button from "./component/Button";

function App() {
  return (
    <div>
      <Header elements={Button} />
      <div className="app-page"></div>
      <Footer />
    </div>
  );
}

export default App;
