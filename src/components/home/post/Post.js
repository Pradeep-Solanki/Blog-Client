import { styled, Box, Typography } from "@mui/material";
import "./Post.css";
import moment from "moment/moment";
const Container = styled(Box)`
  align-items: center;
`;

const Image = styled("img")({
  width: "100%",
  objectFit: "cover",
  height: 150,
});

const Text = styled(Typography)`
    color: #878787
    font-size: 7px;
`;

const Heading = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
`;

const Details = styled(Typography)`
  font-size: 14px;
  word-break: break-word;
`;

const Post = ({ post }) => {
  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80";

  const addEllipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + "..." : str;
  };

  return (
    <div className="postCard">
      <div>
        <Image src={url} alt="post" />
      </div>
      <div className="content">
        <div className="Heading">
          <h2>Author: {post.username}</h2>
          <p>Category : {post.categories}</p>
          <p>Posted{moment(post.createdDate).fromNow()}</p>
        </div>
        <Container>
          <Heading>{addEllipsis(post.title, 60)}</Heading>

          <Details>{addEllipsis(post.description, 100)}</Details>
        </Container>
      </div>
    </div>
  );
};

export default Post;
