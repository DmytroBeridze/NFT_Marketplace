import { useParams } from 'react-router-dom';

const AuthorCollection = () => {
  let { galleryId } = useParams();
  console.log(galleryId);

  return <div>AuthorCollection: {galleryId}</div>;
};
export default AuthorCollection;
