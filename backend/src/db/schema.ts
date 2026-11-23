import {
  decimal,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const favouritesTable = pgTable("favourites", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  recipeId: integer("recipe_id").notNull(),
  title: text("title").notNull(),
  image: text("image"),
  cookTime: text("cook_time"),
  servings: text("servings"),
  description: text("description"),
  created_at: timestamp("created_at").defaultNow(),
});

export const recipesTable = pgTable("recipes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  ingredients: jsonb("ingredients").$type<string[]>().notNull(),
  tags: jsonb("tags").$type<string[]>().notNull(),
  description: text("description").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }),
  prep_time_minutes: integer("prep_time_minutes"),
  servings: integer("servings"),
  calorie: integer("calorie"),
  protein: integer("protein"),
  carbs: integer("carbs"),
  fats: integer("fats"),
  thumbnail: text("thumbnail"),
  instructions: jsonb("instructions").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});
