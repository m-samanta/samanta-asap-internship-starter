import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import CollectionCard from "../ui/CollectionCard";
import AOS from "aos";
import "aos/dist/aos.css";

export default function PopularCollections() {
  const [popularCollectionsData, setPopularCollectionsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPopularCollections() {
      const { data } = await axios.get(
        "https://remote-internship-api-production.up.railway.app/popularcollections"
      );
      const popularCollectionsData = data.data;
      setPopularCollectionsData(popularCollectionsData);
      setLoading(false);
    }

    fetchPopularCollections();
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section id="popular-collections">
      <div className="container">
        <div className="row">
          <h2
            className="popular-collections__title"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            Popular Collections
          </h2>
          <div
            className="popular-collections__body"
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="600"
          >
            {loading ? (
              <Swiper
                modules={[Navigation]}
                navigation
                loop
                slidesPerView="auto"
              >
                {new Array(12).fill(0).map((_, index) => (
                  <SwiperSlide className="collection-column" key={index}>
                    <CollectionCard loading={loading} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Swiper
                modules={[Navigation]}
                navigation
                loop
                slidesPerView="auto"
              >
                {popularCollectionsData.map((collection, index) => (
                  <SwiperSlide className="collection-column" key={index}>
                    <CollectionCard collection={collection} loading={loading} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
