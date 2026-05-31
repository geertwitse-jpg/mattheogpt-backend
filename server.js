const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const { OpenAI } = require("openai");

const client = new OpenAI({
apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
try {
const message = req.body.message;

const response = await client.chat.completions.create({
model: "gpt-4o-mini",
messages: [
{
role: "system",
content: "Je bent MatteoGPT, een behulpzame AI."
},
{
role: "user",
content: message
}
]
});

res.json({
reply: response.choices[0].message.content
});

} catch (err) {
res.json({ reply: "Error met AI" });
}
});

app.listen(3000, () => console.log("Server running"));
