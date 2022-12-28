import './App.css';


// import {Main, Create} from "./components"
import Docs from "./components/Docs";
import Edit from "./components/Edit";
import Discuss from "./components/Discuss";
import History from "./components/History";
import Search from "./components/Search";
import Header from "./Header";
import NotHome from "./components/NotHome";
import {  Link, BrowserRouter,  Routes,  Route} from "react-router-dom";

function App() {
  return (
    <>
      <Header/>

      <Routes>
        <Route path="/" element={<NotHome/>} />
        <Route path="/docs/:query" element={<Docs/>} />
        <Route path="/edit/:query" element={<Edit/>} />
        <Route path="/discuss/:query" element={<Discuss/>} />
        <Route path="/history/:query" element={<History/>} />
        <Route path="/search/:query" element={<Search/>} />
      </Routes>
    </>
  );
}



export default App;
