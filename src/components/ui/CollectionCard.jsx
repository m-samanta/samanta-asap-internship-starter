import React from "react";
import Skeleton from "../ui/Skeleton";
import { Link } from "react-router-dom";

const CollectionCard = ({ collection, loading }) => {
  return (
    <>
      {loading ? (
        <div className="collection">
          <Skeleton width="100%" height="180px" />
          <div className="collection__info">
            <h3 className="collection__name"></h3>
            <div className="collection__stats">
              <div className="collection__stat">
                <span className="collection__stat__label">
                  <Skeleton width="48px" height="16px" borderRadius="4px" />
                </span>
                <span className="collection__stat__data">
                  <Skeleton width="80%" height="16px" borderRadius="4px" />
                </span>
              </div>
              <div className="collection__stat">
                <span className="collection__stat__label">
                  <Skeleton width="48px" height="16px" borderRadius="4px" />
                </span>
                <span className="collection__stat__data">
                  <Skeleton width="80%" height="16px" borderRadius="4px" />
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Link
          to={`/collection/${collection.collectionId ? collection.collectionId : collection.id}`}
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
                <span className="collection__stat__label">Total Volume</span>
                <span className="collection__stat__data">
                  {collection.totalVolume} ETH
                </span>
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default CollectionCard;
