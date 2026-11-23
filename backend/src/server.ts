import "dotenv/config";
import express from "express";
import { db } from "./db/client";
import { favouritesTable, recipesTable } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { json } from "node:stream/consumers";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/api/health", (req, res) => {
  return res.status(200).json({ success: true });
});

app.get("/api/all-recipes", async (req, res) => {
  try {
    const allRecipes = await db.select().from(recipesTable);

    return res.status(200).json({ all_recipes: allRecipes });
  } catch (error) {
    console.log("Error while fetching recipes", error);
    res.status(500).json({ error: "something went wrong" });
  }
});

//add to favourites
app.post("/api/add-to-fav", async (req, res) => {
  try {
    const { userId, recipeId, title, image, cookTime, servings, description } =
      req.body || {};

    if (!userId || !recipeId || !title) {
      return res.send(400).json({ error: "Missing required fields" });
    }
    const newFavourites = await db
      .insert(favouritesTable)
      .values({
        userId,
        recipeId,
        title,
        image,
        cookTime,
        servings,
        description,
      })
      .returning();

    return res.status(200).json(newFavourites[0]);
  } catch (error) {
    console.log("Error while adding recipes to favourites", error);
    res.status(500).json({ error: "something went wrong" });
  }
});

//get fav recipes
app.get("/api/favourites/:userId", async (req, res) => {
  try {
    const { userId } = req.params || {};

    const userFav = await db
      .select()
      .from(favouritesTable)
      .where(eq(favouritesTable.userId, userId));

    return res.status(200).json(userFav);
  } catch (error) {
    console.log("Error while fetching recipes from favourites", error);
    res.status(500).json({ error: "something went wrong" });
  }
});

// /api/detail/: recipeId GET
app.get("/api/detail/:recipeId", async (req, res) => {
  try {
    const { recipeId } = req.params || {};
    const recipe = await db
      .select()
      .from(recipesTable)
      .where(eq(recipesTable.id, Number(recipeId)));

    return res.status(200).json({ recipe_detail: recipe });
  } catch (error) {
    console.log("Error while fetching recipes details", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

//delete user fav recipe
app.delete("api/delete-favourites/:userId/:recipeId", async (req, res) => {
  try {
    const { userId, recipeId } = req.params || {};
    await db
      .delete(favouritesTable)
      .where(
        and(
          eq(favouritesTable.userId, userId),
          eq(favouritesTable.recipeId, Number(recipeId)),
        ),
      );

      return res.status(200).json({success: true, message: "Favourites deleted successfully"})
  } catch (error) {
    console.log("Error while deleting favourites recipes", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log("Server is running at PORT: ", PORT);
});
