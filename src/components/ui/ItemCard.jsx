import React from "react";
import Skeleton from "../ui/Skeleton";
import { Link } from "react-router-dom";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ItemCard = ({ item, loading, index }) => {
  return (
    <>
      {loading ? (
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
      ) : (
          <Link to={`/item/${item.itemId}`} className="item">
            <figure className="item__img__wrapper">
              <img src={item.imageLink} alt="" className="item__img" />
            </figure>
            <div className="item__details">
              <span className="item__details__name">{item.title}</span>
              <span className="item__details__price">{item.price} ETH</span>
              <span className="item__details__last-sale">
                Last sale: {item.lastSale} ETH
              </span>
            </div>
            <div className="item__see-more">
              <button className="item__see-more__button">See More</button>
              <div className="item__see-more__icon">
                <FontAwesomeIcon icon={faShoppingBag} />
              </div>
            </div>
          </Link>
      )}
    </>
  );
};

export default ItemCard;
