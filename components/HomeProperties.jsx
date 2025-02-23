'use client';
import React, { useState, useEffect } from 'react';
import PropertyCard from '@/components/PropertyCard';
import Link from 'next/link';
import { fetchProperties } from '@/utils/request';



const HomeProperties = () => {
  const [recentProperties, setRecentProperties] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const properties = await fetchProperties();
      setRecentProperties(properties);
    }
    fetchData();
  }, []);

  // Display only three random properties
  const randomProperties = recentProperties.sort(() => Math.random() - 0.5).slice(0, 3);

  return (
    <> 
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {randomProperties.length === 0 ? (
              <p>No Properties Found</p>
            ) : (
              randomProperties.map(property => (
                <PropertyCard key={property._id} property={property} />
              ))
            )}
          </div>
        </div>
      </section>
      <section className="m-auto max-w-lg my-10 px-6">
        <Link href="/properties" passHref className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700">
            View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
