export const TemplateBase = ({ children }: Html.PropsWithChildren) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=, initial-scale=1.0" />
        <script src="https://unpkg.com/htmx.org@2.0.0"></script>
        <title>Document</title>
      </head>
      <body>{children}</body>
    </html>
  );
};
