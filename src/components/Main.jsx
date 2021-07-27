import React, { useState, useRef, useCallback } from "react";
import "./Main.css";
import useImages from "../hooks/useImages";
import Modal from "./Modal/Modal";

const Main = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, images, hasMore } = useImages(pageNumber);
  const [openModal, setModal] = useState(false);
  const [targetImage, seTargetImage] = useState();

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node && observer.current.observe) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const openImage = (image, index) => {
    setModal(true);
    seTargetImage({ ...image, index });
  };

  const onCloseModal = () => {
    setModal(false);
  };

  const nextImage = () => {
    const nextImage = images[targetImage.index + 1];
    seTargetImage({ ...nextImage, index: targetImage.index + 1 });
  };

  const prevImage = () => {
    const prevImage = images[targetImage.index - 1];
    seTargetImage({ ...prevImage, index: targetImage.index - 1 });
  };

  return (
    <div className="main-container">
      <div className="images-grid">
        {images.length > 0 &&
          images.map((image, index) => {
            if (images.length === index + 1) {
              return (
                <img
                  key={image.id}
                  alt="img"
                  ref={lastElementRef}
                  src={image.urls.thumb}
                  onClick={() => openImage(image, index)}
                />
              );
            } else {
              return (
                <img
                  key={image.id}
                  alt="img"
                  src={image.urls.thumb}
                  onClick={() => openImage(image, index)}
                />
              );
            }
          })}
      </div>
      {loading && <div className="loading-section">Loading ...</div>}
      <Modal
        title={targetImage ? `#${targetImage.id}` : "#"}
        open={openModal}
        onClose={onCloseModal}
      >
        {targetImage && (
          <div className="image-container">
            {
              <img
                className="expanded-image"
                src={targetImage.urls?.regular}
                alt="img"
              />
            }
            <button
              className="next-btn"
              disabled={images.length === targetImage.index + 1}
              onClick={nextImage}
            >
              Next
            </button>
            <button
              className="prev-btn"
              disabled={0 === targetImage.index}
              onClick={prevImage}
            >
              Prev
            </button>
          </div>
        )}
        <div className="image-details">
          {targetImage?.description && (
            <span className="image-desc">{targetImage?.description}</span>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Main;
