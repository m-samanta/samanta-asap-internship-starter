import React, { useEffect, useState } from "react";
import axios from "axios";
import CollectionCard from "../components/ui/CollectionCard";

export default function CollectionsPage() {
  const [collectionsPageData, setCollectionsPageData] = useState([]);
  const [renderCount, setRenderCount] = useState(12);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCollectionsPage() {
      const { data } = await axios.get(
        "https://remote-internship-api-production.up.railway.app/collections"
      );
      const collectionsPageData = data.data;
      setCollectionsPageData(collectionsPageData);
      setLoading(false);
    }

    fetchCollectionsPage();
    window.scrollTo(0, 0);
  }, []);

  const loadMoreButton = () => {
    if (loading) return;
    else setRenderCount((prevCount) => prevCount + 6);
  };

  const hideLoadMoreButton = () => {
    if (collectionsPageData.length <= renderCount || renderCount % 6 !== 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="collections-page__title">Collections</h1>
        <div className="collections__body">
          {collectionsPageData
            .slice(0, renderCount)
            .map((collection, index) => (
              <div className="collection-column" key={index}>
                <CollectionCard collection={collection} loading={loading} />
              </div>
            ))}
        </div>
        {!hideLoadMoreButton() && (
          <button className="collections-page__button" onClick={loadMoreButton}>
            Load more
          </button>
        )}
      </div>
    </div>
  );
}
