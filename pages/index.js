// pages/index.js
import { useEffect, useState } from "react";
import Image from "next/image";
import dbConnect from "@/db/connect";
import Food from "@/db/models/Food";

const Home = ({ data }) => {
  return (
    <div className="main">
      <div className="grid">
        {data.map((food) => (
          <div key={food._id} className="card">
            {/* Provide width and height attributes */}
            <Image src={food.image} alt={food.name} width={300} height={300} />
            <h2>{food.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  await dbConnect(); // Connect to the MongoDB database

  try {
    const foods = await Food.find({});
    const data = JSON.parse(JSON.stringify(foods)); // Convert Mongoose objects to plain JavaScript objects

    return {
      props: { data },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: { data: [] }, // Return an empty array or handle the error as needed
    };
  }
}

export default Home;
