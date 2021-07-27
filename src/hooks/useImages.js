import { useEffect, useState } from "react";
import { getImages } from "../helpers/requests";

const useImages = (pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const getImagesData = async () => {
    const response = await getImages(pageNumber);
    const { results, totalPages } = response;
    setTimeout(() => {
      setHasMore(pageNumber !== totalPages);
      setImages((oldImages) => {
        return [...oldImages, ...results];
      });
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    setLoading(true);
    getImagesData();
  }, [pageNumber]);
  return { loading, images, hasMore };
};

export default useImages;
