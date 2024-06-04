import React, { useState } from "react";
import Skeleton from "../ui/Skeleton";
import ItemCard from "../ui/ItemCard";

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
                  <ItemCard loading={loading} />
                </div>
              ))}
            </>
          ) : (
            <>
              {collectionPageData?.items
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
