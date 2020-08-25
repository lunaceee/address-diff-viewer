import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ReactDiffViewer from "react-diff-viewer";

const DiffView = () => {
  let { url1, url2 } = useParams();
  url1 = decodeURIComponent(url1);
  url2 = decodeURIComponent(url2);
  const history = useHistory();
  let [body1, setBody1] = useState("");
  let [body2, setBody2] = useState("");

  function formatBody(body) {
    let formatted = body.split(",");
    formatted = formatted.join(",\n");
    formatted = formatted.replace("{", "");
    formatted = formatted.replace(/}$/, "");
    return formatted;
  }

  useEffect(() => {
    fetch(`http://localhost:5000${url1}`)
      .then((res) => res.text())
      .then((response) => {
        setBody1(formatBody(response));
      })
      .catch((error) => console.error("Caught an error!", error));

    fetch(`http://localhost:5000${url2}`)
      .then((res) => res.text())
      .then((response) => {
        setBody2(formatBody(response));
      })
      .catch((error) => console.error("Caught an error!", error));
  }, [url1, url2]);

  return (
    <div className="diff">
      <button className="go-back" onClick={() => history.push("/")}>
        Go back
      </button>
      <ReactDiffViewer oldValue={body1} newValue={body2} splitView={true} />
    </div>
  );
};

export default DiffView;
