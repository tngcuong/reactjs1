import { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/context";
import axios from "axios";
import { getAllPosts } from "../../Reducer/action";
import Posts from "../../Components/Post/Posts";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
} from "@mui/material";

function Home() {
  const { state, dispatch } = useContext(AppContext);
  const [postContent, setPostContent] = useState("");
  const [reRender, setReRender] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("https://whats-the-fox.onrender.com/api/v1/posts").then((res) => {
      dispatch(getAllPosts(res.data.data.posts));
      setLoading(false);
    });
  }, [reRender]);

  const handleSendPost = async () => {
    setLoading(true);
    if (postContent) {
      const token = localStorage.getItem("token");
      await axios
        .post(
          "https://whats-the-fox.onrender.com/api/v1/posts",
          {
            content: postContent,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
            setReRender(!reRender);
          setPostContent("");
          setLoading(false);
        })
        .catch(() => {
          alert("error");
          setLoading(false);
        });
    }
  };

  return (
    <>
      {state.user  && (
        <Box sx={{ marginBottom: "1rem", marginTop: "2rem" }}>
          <TextField
            label="Viết bài..."
            multiline
            rows={4}
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendPost}
            sx={{ marginTop: "1rem" }}
          >
            Gửi
          </Button>
        </Box>
      )}
      {loading && (
        <div style={{ textAlign: "center" }}>
          <CircularProgress sx={{ margin: "10px" }}></CircularProgress>
        </div>
      )}
      {state.posts.map((post) => (
        <Posts post={post}></Posts>
      ))}
    </>
  );
}

export default Home;
