// Lưu thông tin đăng nhập
let loggedInUser = null;

function DangNhap() {
    const username = document.getElementById("usernameInput").value;
    const password = document.getElementById("passwordInput").value;
  
    // Simple authentication logic (update as per your actual logic)
    if (
      (username === "anhp03994@gmail.com" && password === "123") ||
      (username === "vietanh24004@gmail.com" && password === "123")
    ) {
      alert("Đăng nhập thành công!");
      
      if (username === "anhp03994@gmail.com") {
        window.location.href = "Trangchu.html";
      } else if (username === "vietanh24004@gmail.com") {
        window.location.href = "Quantri.html";
      }
    } else {
      alert("Tên tài khoản hoặc mật khẩu không đúng!");
    }
}



