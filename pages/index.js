// pages/index.js
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/NavBar";

const Home = ({ data }) => {
  console.log("Data:", data);

  if (!Array.isArray(data.data)) {
    console.error("Data is not an array:", data);
    return <div>Error loading data</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="main">
        <div className="grid">
          {data.data.map((item) => (
            <Link
              key={item._id}
              href={`/category/${encodeURIComponent(item.name)}`}
            >
              <div className="card">
                <Image
                  src={item.mainImage}
                  alt={item.name}
                  width={300}
                  height={200}
                />
                <h2>{item.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/food`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }

    const data = await res.json();

    return {
      props: { data },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: { data: [] },
    };
  }
}

export default Home;
