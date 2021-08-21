import React, { useState, useEffect } from "react";

import Searchbar from "./Searchbar";

import Header from "./Header";

import Section from "./Section";

import API from "../services";

import ImageGallery from "./ImageGallery";

import ButtonLoadMore from "./ButtonLoadMore";

import Loader from "./Loader";

import Error from "./Error";

import Modal from "./Modal";

const App = () => {
  const [query, setQuery] = useState("");

  const [gallery, setGallery] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState("");

  useEffect(() => {
    if (!query) {
      return;
    }

    setStatus("padding");

    const options = { query, currentPage };

    API(options)
      .then((resolved) => {
        setGallery((prevGallery) => [...prevGallery, ...resolved.hits]);

        setStatus("resolved");
      })
      .catch((error) => {
        setError(error);
        setStatus("rejected");
      })
      .finally(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      });
  }, [query, currentPage]);

  useEffect(() => {
    if (!dataModal) return;
    setShowModal((prevShowModal) => !prevShowModal);
  }, [dataModal]);

  const hadleFormSubmit = (searchName) => {
    setGallery([]);
    setCurrentPage(1);
    setQuery(searchName);
  };

  const nextPage = () => {
    setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
  };

  const handleShowModal = (e) => {
    if (e.target.nodeName === "IMG") {
      const alt = e.target.alt;

      const src = e.target.dataset.modal;
      const dataImage = { src, alt };

      setDataModal(dataImage);
    }
  };

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  let button;

  if (gallery.length > 0 && status === "resolved") {
    button = <ButtonLoadMore onClick={nextPage} />;
  } else if (status === "padding") {
    button = <Loader />;
  }

  return (
    <>
      <Header>
        <Searchbar onSubmit={hadleFormSubmit} />
      </Header>

      <Section>
        <ImageGallery listGallery={gallery} onImgClick={handleShowModal} />
        {button}
        {status === "rejected" && <Error message={error.message} />}

        {showModal && <Modal onClose={toggleModal} data={dataModal} />}
      </Section>
    </>
  );
};

export default App;
