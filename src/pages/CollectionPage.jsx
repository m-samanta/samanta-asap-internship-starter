import React, { useEffect, useState } from "react";
import CollectionHeader from "../components/collection/CollectionHeader";
import CollectionInfo from "../components/collection/CollectionInfo";
import CollectionItems from "../components/collection/CollectionItems";
import axios from "axios";
import { useParams } from 'react-router-dom';

export default function CollectionPage() {
  const [collectionPageData, setCollectionPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { id } = useParams();

  useEffect(() => {
    async function fetchCollectionPage() {
      const { data } = await axios.get(
        `https://remote-internship-api-production.up.railway.app/collection/${id}`
      );
      const collectionPageData = data.data;
      setCollectionPageData(collectionPageData);
      setLoading(false);
    }

    fetchCollectionPage();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CollectionHeader collectionPageData={collectionPageData} loading={loading} />
      <CollectionInfo collectionPageData={collectionPageData} loading={loading} />
      <CollectionItems collectionPageData={collectionPageData} loading={loading}/>
    </>
  );
}
