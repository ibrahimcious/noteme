import { client } from "../models/client";
import { Home, INote } from "../views/page";

export function getTodo() {
  const allNotes = client.query("SELECT * FROM notes").all() as INote[];
  return <Home notes={allNotes} />;
}
