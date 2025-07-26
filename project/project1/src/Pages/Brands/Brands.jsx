import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function getBrands() {
    setLoading(true);
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
      setBrands(data.data);
    } catch (err) {
      console.error("Error loading brands:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    AOS.init({ duration: 500 });
    getBrands();
  }, []);

  const displayedBrands = showAll ? brands : brands.slice(0, 30);

  return (
    <main className="container pt-[80px] pb-[320px] max-md:pb-[380px]">
      <h2 className="text-center border-b border-t py-2 text-primary text-lg">Shop by Brand</h2>

      {loading ? (
        <Loader />
      ) : error ? (
        <h3 className="text-center text-2xl text-red-500 mt-10">Error loading brands. Please try again later.</h3>
      ) : (
        <>
          <section className="wrapper grid grid-cols-12 gap-2 px-2 pb-16 mt-4">
            {displayedBrands.map((brand) => (
              <Link
                to={`/brand/${brand._id}`}
                key={brand._id}
                data-aos="zoom-in-up"
                className="col-span-4 md:col-span-3 lg:col-span-2 flex items-center justify-center"
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="size-36 bg-white rounded-full shadow-md p-2 cursor-pointer object-contain hover:scale-[1.2] hover:-translate-y-8 duration-500"
                />
              </Link>
            ))}
          </section>

          {brands.length > 30 && (
            <div className="text-center max-xs:pb-4">
              <button
                type="button"
                className="btn-primary text-sm"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
