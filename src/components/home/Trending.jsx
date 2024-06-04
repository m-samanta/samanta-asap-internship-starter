import React, { useEffect, useState } from "react";
import VerifiedIcon from "../../assets/verified.png";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../ui/Skeleton";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Trending() {
  const [trendingNFTsData, setTrendingNFTsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrendingNFTs() {
      const { data } = await axios.get(
        "https://remote-internship-api-production.up.railway.app/trendingnfts"
      );
      const trendingData = data.data;
      setTrendingNFTsData(trendingData);
      setLoading(false);
    }

    fetchTrendingNFTs();
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section id="trending">
      <div className="container">
        <div className="row trending__row">
          <div
            className="trending__header"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            <h2 className="trending__header__title">Trending NFTs</h2>
            <Link className="trending__header__button" to={"/collections"}>
              View All
            </Link>
          </div>
          <div
            className="trending__body"
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="600"
          >
            <div className="trending-column">
              <div className="trending-column__header">
                <div className="trending-column__header__rank">#</div>
                <div className="trending-column__header__collection">
                  Collection
                </div>
                <div className="trending-column__header__price">
                  Floor Price
                </div>
                <div className="trending-column__header__price">Volume</div>
              </div>
              <div className="trending-column__body">
                {trendingNFTsData.slice(0, 5).map((collection, index) => (
                  <Link
                    to={`/collection/${collection.collectionId}`}
                    key={index}
                    className="trending-collection"
                  >
                    <div className="trending-collection__rank">
                      {loading ? index + 1 : collection.rank}
                    </div>
                    <div className="trending-collection__collection">
                      <figure className="trending-collection__img__wrapper">
                        {loading ? (
                          <Skeleton
                            width="100%"
                            height="100%"
                            borderRadius="12px"
                          />
                        ) : (
                          <img
                            src={collection.imageLink}
                            alt=""
                            className="trending-collection__img"
                          />
                        )}
                      </figure>
                      <div className="trending-collection__name">
                        {loading ? (
                          <Skeleton
                            width="130px"
                            height="18px"
                            borderRadius="2px"
                          />
                        ) : (
                          collection.title
                        )}
                      </div>
                      {loading ? (
                        <Skeleton />
                      ) : (
                        <img
                          src={VerifiedIcon}
                          className="trending-collection__verified"
                        />
                      )}
                    </div>
                    <div className="trending-collection__price">
                      <span className="trending-collection__price__span">
                        {loading ? (
                          <Skeleton
                            width="70px"
                            height="18px"
                            borderRadius="2px"
                          />
                        ) : (
                          parseFloat(collection.floor).toFixed(2) + " ETH"
                        )}
                      </span>
                    </div>
                    <div className="trending-collection__volume">
                      <span className="trending-collection__volume__span">
                        {loading ? (
                          <Skeleton
                            width="70px"
                            height="18px"
                            borderRadius="2px"
                          />
                        ) : (
                          collection.totalVolume + " ETH"
                        )}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="trending-column">
              <div className="trending-column__header trending-column__header2">
                <div className="trending-column__header__rank">#</div>
                <div className="trending-column__header__collection">
                  Collection
                </div>
                <div className="trending-column__header__price">
                  Floor Price
                </div>
                <div className="trending-column__header__price">Volume</div>
              </div>
              <div className="trending-column__body">
                {trendingNFTsData.slice(5, 10).map((collection, index) => (
                  <Link
                    to={`/collection/${collection.collectionId}`}
                    key={index}
                    className="trending-collection"
                  >
                    <div className="trending-collection__rank">
                      {loading ? index + 6 : collection.rank}
                    </div>
                    <div className="trending-collection__collection">
                      <figure className="trending-collection__img__wrapper">
                        {loading ? (
                          <Skeleton
                            width="100%"
                            height="100%"
                            borderRadius="12px"
                          />
                        ) : (
                          <img
                            src={collection.imageLink}
                            alt=""
                            className="trending-collection__img"
                          />
                        )}
                      </figure>
                      <div className="trending-collection__name">
                        {loading ? (
                          <Skeleton
                            width="130px"
                            height="18px"
                            borderRadius="2px"
                          />
                        ) : (
                          collection.title
                        )}
                      </div>
                      {loading ? (
                        <Skeleton />
                      ) : (
                        <img
                          src={VerifiedIcon}
                          className="trending-collection__verified"
                        />
                      )}
                    </div>
                    <div className="trending-collection__price">
                      <span className="trending-collection__price__span">
                        {loading ? (
                          <Skeleton
                            width="70px"
                            height="18px"
                            borderRadius="2px"
                          />
                        ) : (
                          parseFloat(collection.floor).toFixed(2) + " ETH"
                        )}
                      </span>
                    </div>
                    <div className="trending-collection__volume">
                      <span className="trending-collection__volume__span">
                        {loading ? (
                          <Skeleton
                            width="70px"
                            height="18px"
                            borderRadius="2px"
                          />
                        ) : (
                          collection.totalVolume + " ETH"
                        )}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
