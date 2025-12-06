import { useParams } from 'react-router-dom';

const AuthorPage = () => {
  const params = useParams();

  return <div>{`AuthorPage: ${params.authorId}`}</div>;
};

export default AuthorPage;
