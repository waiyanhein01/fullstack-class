import { app } from "./app";

const PORT = process.env.PORT;

app.listen(PORT, () =>
  console.log(`Server is running on port: http://localhost:${PORT}`)
);
