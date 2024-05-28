import React, { useEffect, useState } from "react";
import VerifiedIcon from "../../assets/verified.png";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../ui/Skeleton";

export default function SelectedCollection() {
  const [selectedCollectionData, setSelectedCollectionData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSelectedCollection() {
      const { data } = await axios.get(
        "https://remote-internship-api-production.up.railway.app/selectedCollection"
      );
      const collectionData = data.data;
      setSelectedCollectionData(collectionData);
      setLoading(false);
    }

    fetchSelectedCollection();
  }, []);

  return (
    <header>
      {loading ? (
        <div className="selected-collection">
          <Skeleton width="100%" height="100%" />
        </div>
      ) : (
        <div className="selected-collection">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={selectedCollectionData.thumbnail}
            src={selectedCollectionData.videoLink}
            className="selected-collection__bg"
          />
          <div className="selected-collection__description">
            <img
              src={selectedCollectionData.logo}
              alt=""
              className="selected-collection__logo"
            />
            <h1 className="selected-collection__title">
              {selectedCollectionData.title}
            </h1>
            <Link
              to={`/user/${selectedCollectionData.creatorId}`}
              className="selected-collection__author"
            >
              By {selectedCollectionData.creator}
              <img
                src={VerifiedIcon}
                className="selected-collection__author__verified"
              />
            </Link>
            <div className="selected-collection__details">{`${selectedCollectionData.amountOfItems} items · ${selectedCollectionData.floorPrice} ETH`}</div>
            <Link
              to={`/collection/${selectedCollectionData.collectionId}`}
              className="selected-collection__button"
            >
              <div className="green-pulse"></div>
              View Collection
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
