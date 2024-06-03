import { faShoppingBag, faTableCells } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../ui/Skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function RecommendedItems({ itemPageData, itemId }) {
  const [recommendedItemsData, setRecommendedItemsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const collectionId = itemPageData?.collectionId;

  useEffect(() => {
    if (collectionId) {
      setLoading(true);
      setRecommendedItemsData([]);
      async function fetchRecommendedItems() {
        const { data } = await axios.get(
          `https://remote-internship-api-production.up.railway.app/collection/${collectionId}`
        );
        const fetchedRecommendedItemsData = data.data.items;
        setRecommendedItemsData(fetchedRecommendedItemsData);
      }
      fetchRecommendedItems();
    }
  }, [collectionId, itemId]);

  useEffect(() => {
    if (itemPageData.length === 0 || recommendedItemsData.length === 0) {
      setLoading(true);
    } else setLoading(false);
  }, [itemPageData, recommendedItemsData]);

  return (
    <section id="recommended-items">
      <div className="container">
        <div className="row recommended-items__row">
          <div className="recommended-items__wrapper">
            <div className="recommended-items__header">
              {loading ? (
                <Skeleton width="240px" height="16px" borderRadius="4px" />
              ) : (
                <>
                  <FontAwesomeIcon icon={faTableCells} />
                  <h3 className="recommended-items__header__title">
                    More from this collection
                  </h3>
                </>
              )}
            </div>
            <div className="recommended-items__body">
              {loading ? (
                <Swiper
                  modules={[Navigation]}
                  navigation
                  loop
                  slidesPerView="auto"
                >
                  {new Array(10).fill(0).map((_, index) => (
                    <SwiperSlide className="item-column" key={index}>
                      <div key={index} className="item">
                        <figure className="item__img__wrapper">
                          <Skeleton width="100%" height="100%" />
                        </figure>
                        <div className="item__details">
                          <span className="item__details__name">
                            <Skeleton
                              width="80px"
                              height="16px"
                              borderRadius="4px"
                            />
                          </span>
                          <span className="item__details__price">
                            <Skeleton
                              width="48px"
                              height="16px"
                              borderRadius="4px"
                            />
                          </span>
                          <span className="item__details__last-sale">
                            <Skeleton
                              width="120px"
                              height="16px"
                              borderRadius="4px"
                            />
                          </span>
                        </div>
                        <div className="item__see-more">
                          <button className="item__see-more__button">
                            See More
                          </button>
                          <div className="item__see-more__icon">
                            <FontAwesomeIcon icon={faShoppingBag} />
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <Swiper
                  modules={[Navigation]}
                  navigation
                  loop
                  slidesPerView="auto"
                >
                  {recommendedItemsData
                    .filter((item) => item.itemId !== itemId)
                    .slice(0, 10)
                    .map((item, index) => (
                      <SwiperSlide className="item-column" key={item.itemId}>
                        <Link to={"/item/" + item.itemId} className="item">
                          <figure className="item__img__wrapper">
                            <img
                              src={item.imageLink}
                              alt={item.title}
                              className="item__img"
                            />
                          </figure>
                          <div className="item__details">
                            <span className="item__details__name">
                              {item.title}
                            </span>
                            <span className="item__details__price">
                              {item.price} ETH
                            </span>
                            <span className="item__details__last-sale">
                              Last sale: {item.lastSale} ETH
                            </span>
                          </div>
                          <div className="item__see-more">
                            <button className="item__see-more__button">
                              See More
                            </button>
                            <div className="item__see-more__icon">
                              <FontAwesomeIcon icon={faShoppingBag} />
                            </div>
                          </div>
                        </Link>
                      </SwiperSlide>
                    ))}
                </Swiper>
              )}
            </div>
            <div className="recommended-items__footer">
              {loading ? (
                <Skeleton width="120px" height="24px" borderRadius="4px" />
              ) : (
                <Link
                  to={"/collection/" + collectionId}
                  className="recommended-items__footer__button"
                >
                  View Collection
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
