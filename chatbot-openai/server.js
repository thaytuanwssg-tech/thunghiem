import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/chat", async (req, res) => {

  try {

    const userMessage = req.body.message;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Bạn là chatbot AI thân thiện." },
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.json({
        reply: "Lỗi API: " + data.error.message
      });
    }

    const reply = data.choices[0].message.content;

    res.json({
      reply: reply
    });

  } catch (error) {

    console.log(error);

    res.json({
      reply: "Lỗi kết nối AI"
    });

  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
