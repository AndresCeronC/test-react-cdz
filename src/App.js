import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.css";
import './App.css';
import {useEffect, useState} from "react";
import CommentForm from './components/CommentForm'
import CommentList from "./components/CommentList";
import axiosInstance from "./services/axiosConfig";

function App() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComentarios();
    setLoading(true);
  }, [])

  const addComment = () => {
    console.log('addComment');
  }

  const loadComentarios= () => {
    axiosInstance.get('api/mensajes').then((res) => {
      console.log(res.data)
      setComments(res.data);
      setLoading(false);
    })
  }
  const loadingSpin = loading ? "App-logo Spin": "App-logo";
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
  return (
    <div className="App container bg-light shadow">
        <header className="App-header">
          <img src={logo} className={loadingSpin} alt="logo" />
          <h1 className="App-title">
            React Comments
            <span className="px-2" role="img" aria-label="Chat">
              💬
            </span>
          </h1>
        </header>
      <div className="row">
          <div className="col-4  pt-3 border-right">
            <h6>Ingresa tu comentario</h6>
            <CommentForm addComment={addComment} reloadComentarios={loadComentarios} />
          </div>
          <div className="col-8  pt-3 bg-white">
            <CommentList
              loading={loading}
              comments={comments}
            />
          </div>
        </div>
    </div>
  )
}

export default App;
