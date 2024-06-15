import { TemplateBase } from "../template/templateBase";

export interface INote {
  id: number;
  content: string;
}

export const Home = ({ notes }: { notes: INote[] }) => {
  return (
    <TemplateBase>
      <div>Notes : </div>
      <div>
        {notes.map((note) => {
          return <div>{note.content}</div>;
        })}
      </div>
    </TemplateBase>
  );
};
