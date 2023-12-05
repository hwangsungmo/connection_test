
// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";


const firebaseConfig = {

  // https://firebase.google.com/?hl=ko
  // 파이어베이스에 접속한 후 프로젝트 설정에 들어갑니다.
  // 본인 firebaseConfig 내용으로 설정해 줍니다.
  apiKey: "AIzaSyAsorC7NDKqK7fjcxozM4r1uhMWUvCJPB4",
  authDomain: "sparta-d7f05.firebaseapp.com",
  projectId: "sparta-d7f05",
  storageBucket: "sparta-d7f05.appspot.com",
  messagingSenderId: "67665509093",
  appId: "1:67665509093:web:869d1aa3aece76dcad720c"
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//---------------------------------------------------------------------------------------

// 데이터 추가
$("#addBtn").click(async function () {

  // image_input, title_input, star_input, comment_input id를 가진 HTML 요소에서 값을 가져와서 image, title, star, comment 변수에 저장해 주세요.
  let image = $('#image_input').val();
  let title = $('#title_input').val();
  let star = $('#star_input').val();
  let comment = $('#comment_input').val();

  try {
    const docRef = await addDoc(collection(db, "foods"), {

      // 각각 담은 변수를 컬렉션 필드에 image, title, star, comment에 각각 넣어주세요.

      'image': image,
      'title': title,
      'star': star,
      'comment': comment

    });

    alert("음식이 추가 되었습니다!");
    window.location.reload();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});


// 데이터 읽기 및 카드 생성
$(".row-cols-3").empty();
const querySnapshot = await getDocs(collection(db, "foods"));

querySnapshot.forEach((doc) => {

  let image = doc.data().image;
  let title = doc.data().title;
  let star = doc.data().star;
  let comment = doc.data().comment;


  // 문서의 image, title, star, commente 필드에서 데이터를 추출한 변수명을 갖고,
  // tempHtml 문자열에 각 데이터를 포함한 카드의 HTML 코드를 생성하세요.

  let tempHtml = `

            <div class="col">
                <div class="card h-100">
                    <img src="${image}"
                        class="card-img-top" alt="...">
                    <div class="card-body">
                        <h4 class="card-title">${title}</h4>
                        <p class="card-text">${comment}</p>
                        <p class="card-text">${star}</p>
                    </div>
                </div>`;

  $(".row-cols-3").append(tempHtml);
});

