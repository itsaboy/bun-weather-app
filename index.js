import express from "express";
import path from "path";

const app = express();
const port = Bun.env.PORT;

app.use(express.static(path.join(import.meta.dir, 'public')));

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});