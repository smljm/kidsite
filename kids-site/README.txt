우리반 친구들 - 사용 설명서
================================

■ 여는 방법
  1. 압축을 푼 폴더를 통째로 컴퓨터에 저장하세요.
     (index.html, style.css, script.js, images 폴더가 한 곳에 같이 있어야 해요)
  2. index.html 파일을 더블클릭하면 인터넷 없이도 바로 열려요.

■ 사진이 안 보일 때 (중요)
  압축 프로그램에 따라 한글 파일 이름이 깨지는 경우가 있어서,
  사진 파일 이름은 한글이 아니라 영문으로 되어 있어요.
  (그리드에 보이는 이름표 글자는 그대로 한글이니 걱정 마세요)

  혹시 압축을 풀고 나서도 사진이 안 보인다면:
   - index.html / style.css / script.js / images 폴더가
     "같은 폴더" 안에 함께 있는지 확인해주세요.
   - images 폴더 안에 profile 폴더가 있고, 그 안에 jpg 파일들이
     제대로 들어있는지 확인해주세요.

■ 전신 사진(GIF) 넣는 방법
  images 폴더 안에 profile, full 두 개의 폴더가 있어요.

  - images/profile  : 그리드에 보이는 얼굴 사진 (이미 넣어드렸어요)
  - images/full     : 클릭했을 때 크게 보이는 전신 사진을 넣는 곳

  전신 사진은 아래 표에 적힌 "영문 파일이름.gif" 로 저장해서
  images/full 폴더 안에 넣어주시면 자동으로 연결됩니다.

    이름    ->  파일이름
    나근    ->  na-geun.gif
    도근    ->  do-geun.gif
    도윤    ->  do-yun.gif
    동우    ->  dong-woo.gif
    라윤    ->  ra-yun.gif
    민준    ->  min-jun.gif
    서윤    ->  seo-yun.gif
    송하    ->  song-ha.gif
    아중    ->  a-jung.gif
    연우    ->  yeon-woo.gif
    유담    ->  yu-dam.gif
    유준    ->  yu-jun.gif
    주형    ->  ju-hyeong.gif
    지민    ->  ji-min.gif
    지유    ->  ji-yu.gif
    채은    ->  chae-eun.gif
    태율    ->  tae-yul.gif
    하윤    ->  ha-yun.gif

  아직 전신 사진을 넣지 않은 아이는 클릭하면
  "전신 사진을 준비하고 있어요" 라는 안내 문구가 대신 보여요.

■ 아이가 추가되거나 반이 바뀌었을 때
  script.js 파일 맨 위쪽의 KIDS 목록에서
  id(영문, 파일이름용) 와 label(한글, 화면표시용) 을 추가/삭제하고,
  같은 id 이름으로 images/profile, images/full에 사진만 넣어주시면 됩니다.

  예)
  { id: "ha-yun", label: "하윤" },

■ 화면 제목 바꾸기
  index.html 파일에서 "18명의 친구들이 있어요" 부분을 원하는 문구로
  바꾸시면 돼요.
