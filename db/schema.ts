import { pgTable, integer, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const shortLinks = pgTable('short_links', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),

  userId: text('user_id').notNull(),

  originalUrl: text('original_url').notNull(),

  shortCode: varchar('short_code', { length: 255 }).notNull().unique(),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),

  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export type ShortLink = typeof shortLinks.$inferSelect;
