let messages = []; // Menyimpan pesan dalam sebuah array

app.use(express.static(__dirname)); // Menyajikan file statis

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('seorang pengguna terhubung');

  // Kirim semua pesan yang ada kepada pengguna baru
  socket.emit('all messages', messages);

  socket.on('chat message', (msg) => {
    messages.push(msg); // Menyimpan pesan di server
    io.emit('chat message', msg); // Menyiarkan pesan ke semua klien
  });

  /*socket.on('delete message', (data) => {
    // Menghapus pesan dari penyimpanan di sisi server
    messages = messages.filter(msg => msg.id !== data.messageId);

    if (data.forAll) {
      io.emit('delete message', { messageId: data.messageId, forAll: true });
    } else {
      io.to(socket.id).emit('delete message', { messageId: data.messageId, forAll: false });
    }
  });*/
  

  socket.on('disconnect', () => {
    console.log('pengguna terputus');
  });
});

server.listen(3000, () => {
  console.log('server berjalan di http://localhost:3000');
});
