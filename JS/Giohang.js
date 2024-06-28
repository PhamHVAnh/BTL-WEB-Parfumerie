document.addEventListener('DOMContentLoaded', function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemContainer = document.querySelector('.cart-items-container');
    const cartHeader = document.querySelector('.cart-header p');
    const cartSummary = document.querySelector('.cart-summary');
    const buyNowButton = document.querySelector('.buy-now');
    const continueShoppingButton = document.querySelector('.continue-shopping');
    const shopAgainButton = document.querySelector('.shop-again');

    function renderCart() {
        cartItemContainer.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="Product Image">
                <div class="cart-item-details">
                    <a href="#"><p>${item.name} - ${item.gender} / ${item.origin} / ${item.volume}</p></a>
                    <p class="money">${(item.price * item.quantity).toLocaleString('vi-VN')} <u>đ</u></p>
                    <div class="cart-item-quantity">
                        <div class="quantity-control">
                            <button class="quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
                        </div>
                        <a href="#" class="remove" data-id="${item.id}">Xóa</a>
                    </div>
                </div>
            `;
            cartItemContainer.appendChild(cartItem);
        });
        updateCartSummary();
        cartHeader.textContent = `(${cart.length} sản phẩm)`;
        // Nếu 0 có sp hiện nút mua hàng
        if (cart.length === 0) {
            buyNowButton.style.display = 'none';
            continueShoppingButton.style.display = 'none';
            cartSummary.style.display='none';
            shopAgainButton.style.display = 'block';
        } else {
            buyNowButton.style.display = 'block';
            continueShoppingButton.style.display = 'block';
            cartSummary.style.display='block';
            shopAgainButton.style.display = 'none';
        }
    }

    function updateCartSummary() {
        const provisional = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const total = provisional;
        document.querySelector('.provisional').textContent = `${provisional.toLocaleString('vi-VN')} đ`;
        document.querySelector('.amount').textContent = `${total.toLocaleString('vi-VN')} đ`;
    }

    function handlePurchase() {
        alert('Thanh toán thành công!');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        buyNowButton.style.display = 'none';
        continueShoppingButton.style.display = 'none';
        cartSummary.style.display='none';
        shopAgainButton.style.display = 'block';
    }

    cartItemContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('quantity-btn')) {
            const id = e.target.getAttribute('data-id');
            const action = e.target.getAttribute('data-action');
            cart = cart.map(item => {
                if (item.id == id) {
                    if (action === 'increase') item.quantity++;
                    if (action === 'decrease' && item.quantity > 1) item.quantity--;
                }
                return item;
            });
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }

        if (e.target.classList.contains('remove')) {
            const id = e.target.getAttribute('data-id');
            cart = cart.filter(item => item.id != id);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            
        }
    });

    buyNowButton.addEventListener('click', function() {
        handlePurchase();
    });

    continueShoppingButton.addEventListener('click', function() {
        window.location.href = 'nuochoa.html';
    });

    shopAgainButton.addEventListener('click', function() {
        window.location.href = 'Trangchu.html';
    });

    renderCart();
});
