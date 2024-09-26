import {pgTable, serial, text, timestamp, varchar, PgColumnBuilder, integer, pgEnum} from "drizzle-orm/pg-core";


export const userSystemEnum = pgEnum("user_system_enum",["system","user"])
export const chats = pgTable(
    "chats",
    <Record<string,PgColumnBuilder>><unknown>{
        id: serial('id').primaryKey(),
        pdfName: text("pdf_name").notNull(),
        pdfUrl: text("pdf_url").notNull(),
        createdAt: timestamp("created_at").notNull().defaultNow(),
        userId: varchar("user_if").notNull(),
        fileKey: text("file_key").notNull(),
});

export type DrizzleChat = typeof chats.$inferSelect;

export const messages = pgTable(
    "messages",
    <Record<string,PgColumnBuilder>><unknown>{
            id:serial("id").primaryKey(),
            chatId: integer("chat_id").references(()=>chats.id).notNull(),
            content: text("content").notNull(),
            createdAt: timestamp("created_at").notNull().defaultNow(),
            role:userSystemEnum("role").notNull(),
    }
)
