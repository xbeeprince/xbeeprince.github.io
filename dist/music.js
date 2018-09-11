const ap = new APlayer({
    container: document.getElementById('aplayer'),
    autoplay: true,
    preload: 'auto',
    audio: [
      {
        name: '盗将行',
        artist: '花粥,马雨阳',
        url: 'http://www.ytmp3.cn/down/49827.mp3',
        cover: 'http://oeff2vktt.bkt.clouddn.com/image/37.jpg',
        theme: '#ebd0c2',
      },
    ]
});