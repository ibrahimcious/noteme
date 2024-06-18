import { Context } from "elysia";
import { client } from "../models/client";
import { Home, INote } from "../views/page";
import { TBody } from "../entity/type";

export function getTodo() {
  const allNotes = client.query("SELECT * FROM notes").all() as INote[];
  return <Home notes={allNotes} />;
}

export function createTodo({ body }: Context) {
  const { content } = body as TBody;
  client.query("INSERT INTO notes (content) VALUES (?)").run(content);
  const currentNote = client
    .query("SELECT * FROM notes ORDER BY id DESC LIMIT 1")
    .all() as INote[];
  return <div>{currentNote[0].content}</div>;
}
