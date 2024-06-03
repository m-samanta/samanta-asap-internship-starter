import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faShapes,
  faTag,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import RecommendedItems from "../components/item/RecommendedItems";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/ui/Skeleton";

export default function ItemPage() {
  const [itemPageData, setItemPageData] = useState([]);
  const [remainingTime, setRemainingTime] = useState("");
  const [loading, setLoading] = useState(true);

  const { itemId } = useParams();

  useEffect(() => {
    setItemPageData([])
    async function fetchItemPage() {
      const { data } = await axios.get(
        `https://remote-internship-api-production.up.railway.app/item/${itemId}`
      );
      const fetchedItemPageData = data.data;
      setItemPageData(fetchedItemPageData);
    }
    fetchItemPage();

    window.scrollTo(0, 0);
  }, [itemId]);

  useEffect(() => {
    if (itemPageData && itemPageData.expiryDate) {
      const intervalId = setInterval(() => {
        const expiryTime = itemPageData.expiryDate;
        const currentTime = Date.now();
        const remainingMillis = expiryTime - currentTime;

        if (remainingMillis < 0) {
          setRemainingTime("Sale ended");
          clearInterval(intervalId);
        } else {
          let remainingSeconds = remainingMillis / 1000;
          let remainingMinutes = remainingSeconds / 60;
          let remainingHours = remainingMinutes / 24;

          let secondsHTML = Math.floor(remainingSeconds) % 60;
          let minutesHTML = Math.floor(remainingMinutes) % 60;
          let hoursHTML = Math.floor(remainingHours);
          setRemainingTime(
            `Sale ends in ${hoursHTML}h ${minutesHTML}m ${secondsHTML}s `
          );
        }
      }, 10);

      return () => clearInterval(intervalId);
    }
  }, [itemPageData]);

  useEffect(() => {
    if (itemPageData.length === 0) {
      setLoading(true);
    } else setLoading(false);
  }, [itemPageData]);

  return (
    <>
      <section id="item-info">
        <div className="container">
          <div className="row item-page__row">
            <div className="item-page__left">
              <figure className="item-page__img__wrapper">
                <div className="item-page__img__details">
                  <FontAwesomeIcon
                    icon={faEthereum}
                    className="item-page__img__icon"
                  />
                  {loading ? (
                    <div className="item-page__img__likes">
                      <Skeleton width="36px" height="16px" borderRadius="4px" />
                    </div>
                  ) : (
                    <div className="item-page__img__likes">
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="item-page__img__icon"
                      />
                      <span className="item-page__img__likes__text">
                        {itemPageData.favorites}
                      </span>
                    </div>
                  )}
                </div>
                {loading ? (
                  <Skeleton width="100%" height="100%" />
                ) : (
                  <img
                    src={itemPageData.imageLink}
                    alt=""
                    className="item-page__img"
                  />
                )}
              </figure>
            </div>
            <div className="item-page__right">
              {loading ? (
                <div className="item-page__collection light-blue">
                  <Skeleton width="140px" height="16px" borderRadius="4px" />
                </div>
              ) : (
                <Link
                  to={`/collection/${itemPageData.collectionId}`}
                  className="item-page__collection light-blue"
                >
                  {itemPageData.collection}
                </Link>
              )}
              <h1 className="item-page__name">
                {loading ? (
                  <Skeleton width="280px" height="16px" borderRadius="4px" />
                ) : (
                  itemPageData.title
                )}
              </h1>
              <span className="item-page__owner">
                {loading ? (
                  <Skeleton width="140px" height="16px" borderRadius="4px" />
                ) : (
                  <>
                    Owned by{" "}
                    <Link
                      to={`/user/${itemPageData.ownerId}`}
                      className="light-blue item-page__owner__link"
                    >
                      {itemPageData.owner}
                    </Link>
                  </>
                )}
              </span>
              <div className="item-page__details">
                <div className="item-page__detail">
                  {loading ? (
                    <Skeleton width="84px" height="16px" borderRadius="4px" />
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faEye}
                        className="item-page__detail__icon"
                      />
                      <span className="item-page__detail__text">
                        {itemPageData.views} views
                      </span>
                    </>
                  )}
                </div>
                <div className="item-page__detail">
                  {loading ? (
                    <Skeleton width="84px" height="16px" borderRadius="4px" />
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="item-page__detail__icon"
                      />
                      <span className="item-page__detail__text">
                        {itemPageData.favorites} favorites
                      </span>
                    </>
                  )}
                </div>
                <div className="item-page__detail">
                  {loading ? (
                    <Skeleton width="84px" height="16px" borderRadius="4px" />
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faShapes}
                        className="item-page__detail__icon"
                      />
                      <span className="item-page__detail__text">
                        {itemPageData.category}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="item-page__sale">
                <div className="item-page__sale__header">
                  {loading ? (
                    <Skeleton width="240px" height="16px" borderRadius="4px" />
                  ) : (
                    <>
                      <div className="green-pulse"></div>
                      <span>{remainingTime}</span>
                    </>
                  )}
                </div>
                <div className="item-page__sale__body">
                  <span className="item-page__sale__label">
                    {loading ? (
                      <Skeleton width="84px" height="16px" borderRadius="4px" />
                    ) : (
                      "Current price"
                    )}
                  </span>
                  <div className="item-page__sale__price">
                    <span className="item-page__sale__price__eth">
                      {loading ? (
                        <Skeleton
                          width="152px"
                          height="16px"
                          borderRadius="4px"
                        />
                      ) : (
                        itemPageData.ethPrice + " ETH"
                      )}
                    </span>
                    <span className="item-page__sale__price__dollars">
                      {loading ? (
                        <Skeleton
                          width="152px"
                          height="16px"
                          borderRadius="4px"
                        />
                      ) : (
                        itemPageData.usdPrice
                      )}
                    </span>
                  </div>
                  <div className="item-page__sale__buttons">
                    {loading ? (
                      <Skeleton
                        width="100%"
                        height="48px"
                        borderRadius="12px"
                      />
                    ) : (
                      <>
                        <div className="item-page__sale__buy">
                          <button className="item-page__sale__buy__button disabled">
                            Buy now
                          </button>
                          <button className="item-page__sale__buy__icon disabled">
                            <FontAwesomeIcon icon={faShoppingBag} />
                          </button>
                        </div>
                        <button className="item-page__sale__offer disabled">
                          <FontAwesomeIcon icon={faTag} />
                          Make offer
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RecommendedItems itemPageData={itemPageData} itemId={itemId} />
    </>
  );
}
