import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../ui/Skeleton";

export default function CollectionHeader({ collectionPageData, loading }) {
  return (
    <header
      style={{
        backgroundImage: loading
          ? `linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.2)), url("undefined")`
          : `linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.2)), url(${collectionPageData?.imageLink})`,
      }}
      id="collection-header"
    >
      {loading ? (
        <Skeleton width="100%" height="100%" />
      ) : (
        <div className="row collection-header__row">
          <div className="collection-header__content">
            <div className="collection-header__left">
              <img
                src={collectionPageData?.logo}
                alt=""
                className="collection-header__img"
              />
              <div className="collection-header__name">
                {collectionPageData?.title}
              </div>
              <Link
                to={`/user/${collectionPageData?.creatorId}`}
                className="collection-header__author"
              >
                {collectionPageData?.creator}
              </Link>
            </div>
            <div className="collection-header__right">
              <div className="collection-header__columns">
                <div className="collection-header__column">
                  <span className="collection-header__column__data">
                    <span className="semibold">
                      {collectionPageData?.totalVolume}
                    </span>{" "}
                    ETH
                  </span>
                  <span className="collection-header__column__label">
                    Total volume
                  </span>
                </div>
                <div className="collection-header__column">
                  <span className="collection-header__column__data">
                    <span className="semibold">
                      {collectionPageData?.floor}
                    </span>{" "}
                    ETH
                  </span>
                  <span className="collection-header__column__label">
                    Floor price
                  </span>
                </div>
                <div className="collection-header__column">
                  <span className="collection-header__column__data">
                    <span className="semibold">
                      {collectionPageData?.bestOffer}
                    </span>{" "}
                    ETH
                  </span>
                  <span className="collection-header__column__label">
                    Best offer
                  </span>
                </div>
                <div className="collection-header__column">
                  <span className="collection-header__column__data">
                    <span className="semibold">
                      {collectionPageData?.listed}%
                    </span>
                  </span>
                  <span className="collection-header__column__label">
                    Listed
                  </span>
                </div>
                <div className="collection-header__column">
                  <span className="collection-header__column__data">
                    <span className="semibold">
                      {collectionPageData?.owners}
                    </span>
                  </span>
                  <span className="collection-header__column__label">
                    Owners (Unique)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
