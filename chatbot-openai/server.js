import express from "express";
import fetch from "node-fetch";
import cors from "cors";
console.log("API KEY:", process.env.OPENAI_API_KEY)
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: message
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
console.log("OpenAI RAW:", JSON.stringify(data, null, 2));
    const reply =
      data.output?.[0]?.content?.[0]?.text ||
      data.output_text ||
      "Không có phản hồi từ AI";

    res.json({ reply });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});
