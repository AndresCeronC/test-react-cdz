function Comment(props) {
  const { usuario, comentario } = props.comment;
  return (
    <div className="media mb-3" style={{display: 'flex'}}>
      <img
        className="mr-3 bg-light rounded"
        width="48"
        height="48"
        src={`https://ui-avatars.com/api/?name=${usuario}`}
        alt={usuario}
      />

      <div className="media-body p-2 shadow-sm rounded bg-light border" style={{flexGrow: 1, marginLeft: '5px'}}>
        <h6 className="mt-0 mb-1 text-muted">{usuario}</h6>
        {comentario}
      </div>
    </div>
  )
}

function CommentList(props) {
  return (
    <div className="commentList">
      <h5 className="text-muted mb-4">
        <span className="badge badge-success">{props.comments.length}</span>{" "}
        Comentario{props.comments.length > 1 ? "s" : ""}
      </h5>

      {props.comments.length === 0 && !props.loading ? (
        <div className="alert text-center alert-info">
          Se el primero en comentar!
        </div>
      ) : null}

      {/*Ojo, considerar key: https://es.reactjs.org/docs/lists-and-keys.html */}
      {props.comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </div>
  );
}

export default CommentList
