// pages/api/food.js
import dbConnect from "../../db/connect";
import Food from "../../db/models/Food";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const foods = await Food.find({});
        const formattedData = foods.map((food) => ({
          name: food.name,
          mainImage: food.mainImage,
          images: food.images,
        }));
        res.status(200).json({ success: true, data: formattedData });
      } catch (error) {
        res.status(500).json({ success: false, error });
      }
      break;
    default:
      res.status(405).json({ success: false, message: "Method Not Allowed" });
      break;
  }
}
