import {Fragment, useState} from "react";
import axiosInstance from "../services/axiosConfig";

function CommentForm(props) {
  const [comment, setComment] = useState({usuario: "", comentario: ""});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('onSubmit', comment);
    if (!isFormValid()) {
      setError("Todos los campos son requeridos");
      return;
    }
    setError("");
    setLoading(true);
    axiosInstance
      .post('/api/mensajes/', comment)
      .then((res) => {
        console.log('respuesta', res.status);
        props.reloadComentarios();
        setLoading(false);
        setComment({usuario: "", comentario: ""})
      })
      .catch((err) => {
        console.log(err);
        setError("Error al enviar el comentario.");
        setLoading(false);
      })
  }
  const isFormValid = () => {
    return comment.usuario !== "" && comment.comentario !== "";
  }
  const renderError = () => {
    return error ? (
      <div className="alert alert-danger">{error}</div>
    ) : null;
  }
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setComment({
      ...comment,
      [name]: value
    })
  }
  return (
    <Fragment>
        <form method="post" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              onChange={handleInputChange}
              value={comment.usuario}
              className="form-control"
              placeholder="😎 Tu nombre"
              name="usuario"
              type="text"
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleInputChange}
              value={comment.comentario}
              className="form-control"
              placeholder="🤬 Tu comentario"
              name="comentario"
              rows="5"
            />
          </div>
          {renderError()}
          <div className="form-group">
            <button disabled={loading} className="btn btn-primary">
              Comentar &#10148;
            </button>
          </div>
        </form>
      </Fragment>
  )
}

export default CommentForm
