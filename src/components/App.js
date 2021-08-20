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

  // componentDidUpdate(prevProps, prevState) {
  //   const prevQuery = prevState.query;
  //   const newQuery = this.state.query;

  //   const prevDataModal = prevState.dataModal;
  //   const newDataModal = this.state.dataModal;

  //   if (newQuery !== prevQuery) {
  //     this.setState({ gallery: [], currentPage: 1 });
  //     this.fetchImages();
  //   }

  //   if (newDataModal !== prevDataModal) {
  //     this.toggleModal();
  //   }
  // }

  useEffect(() => {
    console.log("первый запуск");
    if (!query) {
      return;
    }
    setGallery([]);
    setCurrentPage(1);
    fetchImages();
  }, [query]);

  const hadleFormSubmit = (searchName) => {
    setQuery(searchName);
  };

  const fetchImages = () => {
    setStatus("padding");

    const options = { query, currentPage };

    API(options)
      .then((resolved) => {
        setGallery((prevGallery) => [...prevGallery, ...resolved.hits]);
        setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
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
    button = <ButtonLoadMore onClick={fetchImages} />;
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

// export default class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       query: '',

//       gallery: [],
//       currentPage: 1,
//       error: null,
//       status: '',

//       showModal: false,
//       dataModal: '',
//     };
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const prevQuery = prevState.query;
//     const newQuery = this.state.query;

//     const prevDataModal = prevState.dataModal;
//     const newDataModal = this.state.dataModal;

//     if (newQuery !== prevQuery) {
//       this.setState({ gallery: [], currentPage: 1 });
//       this.fetchImages();
//     }

//     if (newDataModal !== prevDataModal) {
//       this.toggleModal();
//     }
//   }

//   hadleFormSubmit = searchName => {
//     this.setState({ query: searchName });
//   };

//   fetchImages = () => {
//     this.setState({ status: 'padding' });

//     const { query, currentPage } = this.state;
//     const options = { query, currentPage };

//     API(options)
//       .then(resolved =>
//         this.setState(({ gallery, currentPage }) => ({
//           gallery: [...gallery, ...resolved.hits],
//           currentPage: currentPage + 1,
//           status: 'resolved',
//         })),
//       )
//       .catch(error => this.setState({ error, status: 'rejected' }))
//       .finally(() => {
//         window.scrollTo({
//           top: document.documentElement.scrollHeight,
//           behavior: 'smooth',
//         });
//       });
//   };

//   handleShowModal = e => {
//     if (e.target.nodeName === 'IMG') {
//       const alt = e.target.alt;

//       const src = e.target.dataset.modal;
//       const dataImage = { src, alt };

//       this.setState({ dataModal: dataImage });
//     }
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({ showModal: !showModal }));
//   };

//   render() {
//     const { gallery, status, error, showModal, dataModal } = this.state;

//     let button;

//     if (gallery.length > 0 && status === 'resolved') {
//       button = <ButtonLoadMore onClick={this.fetchImages} />;
//     } else if (status === 'padding') {
//       button = <Loader />;
//     }

//     return (
//       <>
//         <Header>
//           <Searchbar onSubmit={this.hadleFormSubmit} />
//         </Header>

//         <Section>
//           <ImageGallery listGallery={gallery} onImgClick={this.handleShowModal} />
//           {button}
//           {status === 'rejected' && <Error message={error.message} />}

//           {showModal && <Modal onClose={this.toggleModal} data={dataModal} />}
//         </Section>
//       </>
//     );
//   }
// }
