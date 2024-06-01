import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../ui/Skeleton";

export default function CollectionItems({ collectionPageData, loading }) {
  const [renderCount, setRenderCount] = useState(12);
  const [sortBy, setSortBy] = useState("");

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

  const loadMoreCollectionsButton = () => {
    setRenderCount((prevCount) => prevCount + 6);
  };

  const hideLoadMoreCollectionsButton = () => {
    if (
      loading ||
      collectionPageData?.items?.length <= renderCount ||
      renderCount % 6 !== 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <section id="collection-items">
      <div className="row collection-items__row">
        <div className="collection-items__header">
          <div className="collection-items__header__left">
            <span className="collection-items__header__live">
              {loading ? (
                <Skeleton width="52px" height="16px" borderRadius="4px" />
              ) : (
                <>
                  <div className="green-pulse"></div>
                  Live
                </>
              )}
            </span>
            <span className="collection-items__header__results">
              {loading ? (
                <Skeleton width="72px" height="16px" borderRadius="4px" />
              ) : (
                <>{renderCount} results</>
              )}
            </span>
          </div>
          {loading ? (
            <Skeleton width="240px" height="48px" borderRadius="8px" />
          ) : (
            <>
              <select
                className="collection-items__header__sort"
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
        <div className="collection-items__body">
          {loading ? (
            <>
             {new Array(12).fill(0).map((_, index) => (
            <div className="item-column" key={index}>
              <div className="item">
                <figure className="item__img__wrapper">
                  <Skeleton width="100%" height="100%" />
                </figure>
                <div className="item__details">
                  <span className="item__details__name">
                    <Skeleton width="80px" height="16px" borderRadius="4px" />
                  </span>
                  <span className="item__details__price">
                  <Skeleton width="48px" height="16px" borderRadius="4px" />
                  </span>
                  <span className="item__details__last-sale">
                  <Skeleton width="120px" height="16px" borderRadius="4px" />
                  </span>
                </div>
              </div>
            </div>
          ))}
            </>
          ) : (
            <>
              {collectionPageData?.items
                .sort(sortItemsByPrice)
                .slice(0, renderCount)
                .map((item, index) => (
                  <div className="item-column" key={index}>
                    <Link to={`/item/${item.itemId}`} className="item">
                      <figure className="item__img__wrapper">
                        <img
                          src={item.imageLink}
                          alt=""
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
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
      {!hideLoadMoreCollectionsButton() && (
        <button
          className="collection-page__button"
          onClick={loadMoreCollectionsButton}
        >
          Load more
        </button>
      )}
    </section>
  );
}
