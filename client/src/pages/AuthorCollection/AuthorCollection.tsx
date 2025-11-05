import { useParams } from 'react-router-dom';

export const AuthorCollection = () => {
  let { galleryId } = useParams();
  console.log(galleryId);

  return <div>AuthorCollection: {galleryId}</div>;
};
