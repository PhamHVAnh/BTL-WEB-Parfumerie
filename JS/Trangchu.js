// ảnh banner
var slideIndex = 1;
showSlides(slideIndex);

function ChuyenSlide(n) {
  showSlides((slideIndex += n));
}

function ChamTron(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("anhSlide");
  var dots = document.getElementsByClassName("cham");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// Tự động chuyển slide sau mỗi 3 giây
var slideInterval = setInterval(function () {
  ChuyenSlide(1);
}, 4000);

// Hàm LoadImage() để gán ảnh "1.jpg" vào khung ảnh khi trang web được hiển thị
function LoadImage() {
  ChamTron(1);
}

// Gọi hàm LoadImage() khi trang web được tải
window.onload = LoadImage;

