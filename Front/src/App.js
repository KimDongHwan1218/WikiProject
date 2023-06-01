import './App.css';


// import {Main, Create} from "./components"
import Docs from "./components/Docs";
import Edit from "./components/Edit";
import Discuss from "./components/Discuss";
import History from "./components/History";
import Search from "./components/Search";
import Header from "./Header";
import NotHome from "./components/NotHome";
import Sidebar from "./Sidebar";
import S3upload from "./components/S3upload";
import "./App.css"
import { Routes,  Route} from "react-router-dom";
import { useMediaQuery } from 'react-responsive'

function App() {
  return (
    <div className='App'>
      <Header/>
      <div className='container'>
        <Routes>
          <Route path="/" element={<NotHome/>} />
          <Route path="/docs/:query" element={<Docs/>} />
          <Route path="/edit/:query" element={<Edit/>} />
          <Route path="/discuss/:query" element={<Discuss/>} />
          <Route path="/history/:query" element={<History/>} />
          <Route path="/search/:query" element={<Search/>} />
          <Route path="/upload" element={<S3upload/>} />
        </Routes>
        <Sidebar/>
      </div>
    </div>
  );
}



export default App;
