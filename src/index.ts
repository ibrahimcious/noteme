import { Elysia, t } from "elysia";
import { client } from "./models/client";
import { html } from "@elysiajs/html";
import { getTodo } from "./controller/noteController";

const app = new Elysia()
  .use(html())
  .get("/notes", getTodo)
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
