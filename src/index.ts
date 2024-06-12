import { Elysia, t } from "elysia";
import { client } from "./models/client";

const app = new Elysia()
  .get("/notes", () => {
    const allNotes = client.query("SELECT * FROM notes").all();
    return { data: allNotes };
  })
  .post(
    "/notes",
    ({ body }) => {
      const { content } = body;
      client.query("INSERT INTO notes (content) VALUES (?)").run(content);
      return { message: "Note has been created" };
    },
    {
      body: t.Object({
        content: t.String(),
      }),
    },
  )
  .delete("/notes/:id", ({ params }) => {
    client.query("DELETE FROM notes WHERE id = ?").run(params.id);
    return { message: "Note has been deleted" };
  })
  .patch(
    "/notes/:id",
    ({ params, body }) => {
      const { id } = params;
      const { content } = body;
      client
        .query("UPDATE notes SET content = ? WHERE id = ?")
        .run(content, id);
      const updatedNote = client
        .query("SELECT * FROM notes WHERE id = ?")
        .all(id);
      return { data: updatedNote };
    },
    {
      body: t.Object({
        content: t.String(),
      }),
    },
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
