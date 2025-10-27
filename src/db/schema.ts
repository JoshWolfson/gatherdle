import { create } from "domain";
import { sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  jsonb,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

const cards = pgTable("cards", {
  id: text("id").primaryKey(),
  created_at: timestamp("created_at", { mode: "date" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  object: text("object").notNull(),
  oracle_id: text("oracle_id").notNull(),
  multiverse_ids: jsonb("multiverse_ids").default([]).notNull(),
  tcgplayer_id: integer("tcgplayer_id"),
  cardmarket_id: integer("cardmarket_id"),
  name: text("name").notNull(),
  printed_name: text("printed_name"),
  lang: text("lang").notNull(),
  released_at: text("released_at"),
  uri: text("uri"),
  scryfall_uri: text("scryfall_uri"),
  layout: text("layout"),
  highres_image: boolean().notNull(),
  image_status: text("image_status"),
  image_uris: jsonb("image_uris").notNull(),
  mana_cost: text("mana_cost"),
  cmc: integer("cmc"),
  type_line: text("type_line"),
  oracle_text: text("oracle_text"),
  colors: jsonb("colors").default([]).notNull(),
  color_identity: jsonb("color_identity").default([]).notNull(),
  keywords: jsonb("keywords").default([]).notNull(),
  legalities: jsonb("legalities").notNull(),
  games: jsonb("games").default([]).notNull(),
  reserved: boolean().notNull(),
  game_changer: boolean().notNull(),
  foil: boolean().notNull(),
  nonfoil: boolean().notNull(),
  finishes: jsonb("finishes").default([]).notNull(),
  oversized: boolean().notNull(),
  promo: boolean().notNull(),
  reprint: boolean().notNull(),
  variation: boolean().notNull(),
  set_id: text("set_id"),
  set: text("set"),
  set_name: text("set_name"),
  set_type: text("set_type"),
  set_uri: text("set_uri"),
  set_search_uri: text("set_search_uri"),
  scryfall_set_uri: text("scryfall_set_uri"),
  rulings_uri: text("rulings_uri"),
  prints_search_uri: text("prints_search_uri"),
  collector_number: text("collector_number"),
  digital: boolean().notNull(),
  rarity: text("rarity"),
  card_back_id: text("card_back_id"),
  artist: text("artist"),
  artist_ids: jsonb("artist_ids").default([]).notNull(),
  illustration_id: text("illustration_id"),
  border_color: text("border_color"),
  frame: text("frame"),
  full_art: boolean().notNull(),
  textless: boolean().notNull(),
  booster: boolean().notNull(),
  story_spotlight: boolean().notNull(),
  edhrec_rank: integer("edhrec_rank"),
  prices: jsonb("prices").notNull(),
  related_uris: jsonb("related_uris").notNull(),
  purchase_uris: jsonb("purchase_uris").notNull(),
});

const card_names = pgTable("card_names", {
  name: text("name").notNull(),
  created_at: timestamp("created_at", { mode: "date" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

const set_names = pgTable("set_names", {
  name: text("name").notNull(),
  created_at: timestamp("created_at", { mode: "date" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export { cards, card_names, set_names };
