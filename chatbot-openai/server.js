const data = await response.json();

console.log(data); // xem lỗi trong log

if(data.error){
  return res.json({
    reply: "Lỗi: " + data.error.message
  });
}

const reply = data.choices[0].message.content;

res.json({
  reply: reply
});
