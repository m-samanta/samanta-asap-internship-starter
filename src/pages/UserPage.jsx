import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ItemCard from "../components/ui/ItemCard";
import Skeleton from "../components/ui/Skeleton";

export default function UserPage() {
  const [userPageData, setUserPageData] = useState(null);
  const [renderCount, setRenderCount] = useState(12);
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);

  const { ownerId } = useParams();

  useEffect(() => {
    async function fetchUserPage() {
      const { data } = await axios.get(
        `https://remote-internship-api-production.up.railway.app/user/${ownerId}`
      );
      const userPageFetchedData = data.data;
      setUserPageData(userPageFetchedData);
      setLoading(false);
    }

    fetchUserPage();
    window.scrollTo(0, 0);
  }, []);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const sortItemsByPrice = (a, b) => {
    const priceA = parseFloat(a.price);
    const priceB = parseFloat(b.price);

    if (sortBy === "highToLow") {
      return priceB - priceA;
    } else if (sortBy === "lowToHigh") {
      return priceA - priceB;
    } else {
      return 0;
    }
  };

  const loadMoreItemsButton = () => {
    setRenderCount((prevCount) => prevCount + 6);
  };

  const hideLoadMoreItemsButton = () => {
    if (
      loading ||
      userPageData?.items?.length <= renderCount ||
      renderCount % 6 !== 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      {loading ? (
        <header id="user-header">
          <Skeleton width="100%" height="100%" />
        </header>
      ) : (
        <header
          style={{
            backgroundImage: `url('${userPageData?.imageLink}')`,
          }}
          id="user-header"
        ></header>
      )}

      <section id="user-info">
        <div className="row">
          <div className="user-info__wrapper">
            <figure className="user-info__img__wrapper">
              {loading ? (
                <Skeleton width="100%" height="100%" />
              ) : (
                <img
                  src={userPageData?.profilePicture}
                  alt=""
                  className="user-info__img"
                />
              )}
            </figure>
            <h1 className="user-info__name">
              {loading ? (
                <Skeleton width="240px" height="16px" borderRadius="4px" />
              ) : (
                userPageData?.name
              )}
            </h1>
            <div className="user-info__details">
              <span className="user-info__wallet">
                {loading ? (
                  <Skeleton width="300px" height="16px" borderRadius="4px" />
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faEthereum}
                      className="user-info__wallet__icon"
                    />
                    <span className="user-info__wallet__data">
                      {userPageData?.walletCode}
                    </span>
                  </>
                )}
              </span>
              <span className="user-info__year">
                {loading ? (
                  <Skeleton width="120px" height="16px" borderRadius="4px" />
                ) : (
                  <span className="user-info__year__data">
                    {`Joined ${userPageData?.creationDate}`}
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="user-items">
        <div className="row user-items__row">
          <div className="user-items__header">
            <div className="user-items__header__left">
              <span className="user-items__header__text">
                {loading ? (
                  <Skeleton width="120px" height="16px" borderRadius="4px" />
                ) : (
                  userPageData?.items.length + " items"
                )}
              </span>
            </div>
            {loading ? (
              <Skeleton width="240px" height="48px" borderRadius="8px" />
            ) : (
              <>
                <select
                  className="user-items__header__sort"
                  onChange={handleSortChange}
                >
                  <option value="" disabled={sortBy !== ""}>
                    Default
                  </option>
                  <option value="highToLow">Price high to low</option>
                  <option value="lowToHigh">Price low to high</option>
                </select>
              </>
            )}
          </div>
          <div className="user-items__body">
            {loading ? (
              <>
                {new Array(10).fill(0).map((_, index) => (
                  <div className="item-column" key={index}>
                    <ItemCard loading={loading} />
                  </div>
                ))}
              </>
            ) : (
              <>
                {userPageData?.items
                  .sort(sortItemsByPrice)
                  .slice(0, renderCount)
                  .map((item) => (
                    <div className="item-column" key={item.itemId}>
                      <ItemCard loading={loading} item={item} />
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
        {!hideLoadMoreItemsButton() && (
          <button
            className="collection-page__button"
            onClick={loadMoreItemsButton}
          >
            Load more
          </button>
        )}
      </section>
    </>
  );
}
