// pages/category/[category].js
import Image from "next/image";
import Link from "next/link";

const CategoryPage = ({ category, mainImage, images }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div className="category-page">
      <h1>{category} Images</h1>
      <div className="main-image" onClick={() => window.history.back()}>
        {mainImage && (
          <Image
            src={mainImage}
            alt={`${category}-main`}
            width={600}
            height={400}
          />
        )}
      </div>
      {images && images.length > 0 && (
        <div className="image-grid">
          {images.map((image, index) => (
            <div key={index} className="image-card">
              <Image
                src={image}
                alt={`${category}-${index}`}
                width={300}
                height={200}
              />
            </div>
          ))}
        </div>
      )}
      <Link href="/">Go back to Home</Link>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const category = params.category;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/food`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }

    const data = await res.json();

    const categoryData = data.data.find((item) => item.name === category);

    return {
      props: {
        category,
        mainImage: categoryData?.mainImage || "",
        images: categoryData?.images || [],
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: { category, mainImage: "", images: [] },
    };
  }
}

export default CategoryPage;
