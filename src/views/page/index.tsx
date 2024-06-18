import { TemplateBase } from "../template/templateBase";

export interface INote {
  id: number;
  content: string;
}

export const Home = ({ notes }: { notes: INote[] }) => {
  return (
    <TemplateBase>
      <div>Notes : </div>
      <form hx-post="/notes" hx-target="#notes" hx-swap="beforeend">
        <textarea name="content"></textarea>
        <button>Create note</button>
      </form>
      <div id="notes">
        {notes.map((note) => {
          return <div>{note.content}</div>;
        })}
      </div>
    </TemplateBase>
  );
};
