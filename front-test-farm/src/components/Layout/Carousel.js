import React, { Fragment } from 'react';
import style from './styles/Carousel.module.css';
import { Link } from 'react-router-dom';
const Carousel = () => {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-ride="carousel"
    >
      {/* <div className="carousel-inner">
        <Fragment className="carousel-item active">
          <div className={style['cards-wrapper']}>
            <div className={style.card}>
              <img
                src="..."
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <Link
                  href="#"
                  className="btn btn-primary"
                >
                  Go somewhere
                </Link>
              </div>
            </div> */}
      {/* <div className="card d-none d-md-block">
              <img
                src="..."
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <Link
                  href="#"
                  className="btn btn-primary"
                >
                  Go somewhere
                </Link>
              </div>
            </div>
            <div className="card d-none d-md-block">
              <img
                src="..."
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <Link
                  href="#"
                  className="btn btn-primary"
                >
                  Go somewhere
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>*/}
      {/* <a
        className="carousel-control-prev"
        href="#carouselExampleControls"
        role="button"
        data-slide="prev"
      >
        <span
          className="carousel-control-prev-icon"
          aria-hidden="true"
        ></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleControls"
        role="button"
        data-slide="next"
      >
        <span
          className="carousel-control-next-icon"
          aria-hidden="true"
        ></span>
        <span className="sr-only">Next</span>
      </a> */}
    </div>
  );
};
export default Carousel;
