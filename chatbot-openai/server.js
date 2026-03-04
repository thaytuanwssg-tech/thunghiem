<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Chatbot AI</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f6f9;
      padding: 30px;
    }

    h1 {
      margin-bottom: 20px;
    }

    #chat-box {
      background: white;
      padding: 15px;
      border-radius: 10px;
      height: 350px;
      overflow-y: auto;
      margin-bottom: 15px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }

    .user {
      color: blue;
      margin-bottom: 8px;
    }

    .ai {
      color: green;
      margin-bottom: 8px;
    }

    .error {
      color: red;
      margin-bottom: 8px;
    }

    input {
      width: 75%;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }

    button {
      padding: 10px 15px;
      border-radius: 5px;
      border: none;
      background: #007bff;
      color: white;
      cursor: pointer;
    }

    button:hover {
      background: #0056b3;
    }
  </style>
</head>
<body>

  <h1>Chatbot AI</h1>

  <div id="chat-box"></div>

  <input type="text" id="message" placeholder="Nhập câu hỏi..." />
  <button onclick="sendMessage()">Gửi</button>

  <script>
    async function sendMessage() {
      const input = document.getElementById("message");
      const chatBox = document.getElementById("chat-box");

      const message = input.value.trim();
      if (!message) return;

      chatBox.innerHTML += `<div class="user"><strong>Bạn:</strong> ${message}</div>`;
      input.value = "";

      try {
        const response = await fetch("/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ message })
        });

        const data = await response.json();

        if (data.reply) {
          chatBox.innerHTML += `<div class="ai"><strong>AI:</strong> ${data.reply}</div>`;
        } 
        else if (data.error) {
          chatBox.innerHTML += `<div class="error"><strong>Lỗi:</strong> ${data.error}</div>`;
        } 
        else {
          chatBox.innerHTML += `<div class="error">Không có phản hồi hợp lệ từ server</div>`;
        }

      } catch (err) {
        chatBox.innerHTML += `<div class="error">Lỗi kết nối server</div>`;
      }

      chatBox.scrollTop = chatBox.scrollHeight;
    }
  </script>

</body>
</html>
