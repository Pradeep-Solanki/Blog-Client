import { useState, useEffect, useContext } from "react";

import { Box, Typography, styled } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
import { API } from "../../service/api";

import { DataContext } from "../../context/DataProvider";

// components
import Comments from "./comments/Comments";
import axios from "axios";

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const EditIcon = styled(Edit)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const Heading = styled(Typography)`
  font-size: 38px;
  font-weight: 600;
  text-align: center;
  margin: 50px 0 10px 0;
`;

const Author = styled(Box)(({ theme }) => ({
  color: "#878787",
  display: "flex",
  margin: "20px 0",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

const DetailView = () => {
  const url =
    "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  const [post, setPost] = useState({});
  const { account } = useContext(DataContext);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, []);

  const deleteBlog = async () => {
    try {
      // console.log(post._id);
      // await API.deletePost(post?._id);
      await axios.delete(`https://blog-eau9.onrender.com/delete/${post._id}`);
      // console.log(post._id);

      // Assuming API.deletePost handles the deletion on the server-sid:
      navigate("/"); // Navigate to the homepage after successful deletion
    } catch (error) {
      console.error("Error while deleting the blog post:", error);
      // Handle any error that might occur during the deletion process
    }
  };

  return (
    <Container>
      <Image src={post.picture || url} alt="post" />
      <Box style={{ float: "right" }}>
        {" "}
        {account.username === post.username && (
          <>
            <Link to={`/update/${post._id}`}>
              {" "}
              <EditIcon color="primary" />{" "}
            </Link>
            <DeleteIcon onClick={() => deleteBlog()} color="error" />
          </>
        )}{" "}
      </Box>{" "}
      <Heading> {post.title} </Heading>
      <Author>
        <Link
          to={`/?username=${post.username}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography>
            {" "}
            Author: <span style={{ fontWeight: 600 }}> {post.username} </span>
          </Typography>
        </Link>{" "}
        <Typography style={{ marginLeft: "auto" }}>
          {" "}
          {new Date(post.createdDate).toDateString()}{" "}
        </Typography>{" "}
      </Author>
      <Typography> {post.description} </Typography> <Comments post={post} />{" "}
    </Container>
  );
};

export default DetailView;
