import React, { Component } from 'react';

import Searchbar from './Searchbar';



import Header from './Header';

import Section from './Section';

import API from '../services';

import ImageGallery from './ImageGallery';

import ButtonLoadMore from './ButtonLoadMore';

import Loader from './Loader';

import Error from './Error';

import Modal from './Modal';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',

      gallery: [],
      currentPage: 1,
      error: null,
      status: '',

      showModal: false,
      dataModal: '',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const newQuery = this.state.query;

    const prevDataModal = prevState.dataModal;
    const newDataModal = this.state.dataModal;

    if (newQuery !== prevQuery) {
      this.setState({ gallery: [], currentPage: 1 });
      this.fetchImages();
    }

    if (newDataModal !== prevDataModal) {
      this.toggleModal();
    }
  }

  hadleFormSubmit = searchName => {
    this.setState({ query: searchName });
  };

  fetchImages = () => {
    this.setState({ status: 'padding' });

    const { query, currentPage } = this.state;
    const options = { query, currentPage };

    API(options)
      .then(resolved =>
        this.setState(({ gallery, currentPage }) => ({
          gallery: [...gallery, ...resolved.hits],
          currentPage: currentPage + 1,
          status: 'resolved',
        })),
      )
      .catch(error => this.setState({ error, status: 'rejected' }))
      .finally(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  };

  handleShowModal = e => {
    if (e.target.nodeName === 'IMG') {
      const alt = e.target.alt;

      const src = e.target.dataset.modal;
      const dataImage = { src, alt };

      this.setState({ dataModal: dataImage });
    }
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { gallery, status, error, showModal, dataModal } = this.state;

    let button;

    if (gallery.length > 0 && status === 'resolved') {
      button = <ButtonLoadMore onClick={this.fetchImages} />;
    } else if (status === 'padding') {
      button = <Loader />;
    }

    return (
      <>
        <Header>
          <Searchbar onSubmit={this.hadleFormSubmit} />
        </Header>

        <Section>
          <ImageGallery listGallery={gallery} onImgClick={this.handleShowModal} />
          {button}
          {status === 'rejected' && <Error message={error.message} />}

          {showModal && <Modal onClose={this.toggleModal} data={dataModal} />}
        </Section>
      </>
    );
  }
}
