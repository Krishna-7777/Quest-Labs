const express = require("express");
const cors = require("cors")

const app = express();

app.use(cors());
app.use(express.json())

app.post("/", async (ask, give) => {
    try {
        const response = await fetch("https://gpt-api.richexplorer.com/api/general", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ask.body)
        });
        const data = await response.text();
        give.send(data);
    } catch (error) {
        console.log(error);
        give.status(500).send({ error: "Internal Server Error" });
    }
});

app.listen(4000)
