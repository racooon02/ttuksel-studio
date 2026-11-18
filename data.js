window.STUDIO = {
  formEndpoint: "https://formspree.io/f/mgakkpwr",
  assets: {
    ttuksel: "assets/ttuksel.png", // reference/ttuksel-base-B-64.png, logical 64×64
    dalkong: "assets/dalkong.png", // existing draft, logical 64×64, source ×8
    room: "assets/room.png", // backgrounds/room_night.png, 270×480
    workshop: "assets/workshop.png" // output/scenes/scene_room_craft.png, logical 270×480
  },
  neighbors: [
    {name:"뚝셀", role:"만드는 친구", text:"작은 불편을 알아채고, 쓸모 있는 도구를 만들어요.", asset:"ttuksel"},
    {name:"달콩", role:"밤을 지키는 이웃", text:"말은 짧아도, 은근히 웃기고 싶은 야간 알바생.", asset:"dalkong", note:"첫 번째 시안"},
  ],
  board: {working:[{name:"무신사 체험단 신청 도우미", text:"반복되는 신청 과정을 조금 더 편하게."}], completed:[]},
  credits:[]
};
