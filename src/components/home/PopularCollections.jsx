import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../ui/Skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/bundle";

export default function PopularCollections() {
  const [popularCollectionsData, setPopularCollectionsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPopularCollections() {
      const { data } = await axios.get(
        "https://remote-internship-api-production.up.railway.app/popularcollections"
      );
      const popularCollectionsData = data.data;
      setPopularCollectionsData(popularCollectionsData);
      setLoading(false);
    }

    fetchPopularCollections();
  }, []);

  return (
    <section id="popular-collections">
      <div className="container">
        <div className="row">
          <h2 className="popular-collections__title">Popular Collections</h2>
          <div className="popular-collections__body"> </div>
          {loading ? (
            <Swiper modules={[Navigation]} navigation loop slidesPerView="auto">
              {new Array(12).fill(0).map((_, index) => (
                <SwiperSlide className="collection-column" key={index}>
                  <div className="collection">
                    <Skeleton width="100%" height="180px" />
                    <div className="collection__info">
                      <h3 className="collection__name"></h3>
                      <div className="collection__stats">
                        <div className="collection__stat">
                          <span className="collection__stat__label">
                            <Skeleton
                              width="48px"
                              height="16px"
                              borderRadius="4px"
                            />
                          </span>
                          <span className="collection__stat__data">
                            <Skeleton
                              width="80%"
                              height="16px"
                              borderRadius="4px"
                            />
                          </span>
                        </div>
                        <div className="collection__stat">
                          <span className="collection__stat__label">
                            <Skeleton
                              width="48px"
                              height="16px"
                              borderRadius="4px"
                            />
                          </span>
                          <span className="collection__stat__data">
                            <Skeleton
                              width="80%"
                              height="16px"
                              borderRadius="4px"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Swiper modules={[Navigation]} navigation loop slidesPerView="auto">
              {popularCollectionsData.map((collection, index) => (
                <SwiperSlide className="collection-column" key={index}>
                  <Link
                    to={`/collection/${collection.collectionId}`}
                    className="collection"
                  >
                    <img
                      src={collection.imageLink}
                      alt={collection.title}
                      className="collection__img"
                    />
                    <div className="collection__info">
                      <h3 className="collection__name">{collection.title}</h3>
                      <div className="collection__stats">
                        <div className="collection__stat">
                          <span className="collection__stat__label">Floor</span>
                          <span className="collection__stat__data">
                            {parseFloat(collection.floor).toFixed(2)} ETH
                          </span>
                        </div>
                        <div className="collection__stat">
                          <span className="collection__stat__label">
                            Total Volume
                          </span>
                          <span className="collection__stat__data">
                            {collection.totalVolume} ETH
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
}
