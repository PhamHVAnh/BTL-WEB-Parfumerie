
document.addEventListener('DOMContentLoaded', function() {
    const priceElement = document.querySelector('.price');
    const quantityElement = document.querySelector('.quantity');
    const productNameElement = document.querySelector('.product-details h3');
    const productOriginElement = document.querySelector('.product-options p.text1:nth-child(4)');
    const productVolumeElements = document.querySelectorAll('.volume-option');
    const productGenderElement = document.querySelector('.product-options p.text1:nth-child(2)');
    const productImageElement = document.querySelector('.product-image img');

    let currentPrice = 375000;  // Default price for 10ml
    let currentQuantity = 1;

    productVolumeElements.forEach(button => {
        button.addEventListener('click', function() {
            productVolumeElements.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentPrice = parseInt(button.getAttribute('data-price'));
            currentQuantity = 1;
            updateQuantity();
        });
    });

    document.getElementById('increase-quantity').addEventListener('click', function() {
        currentQuantity++;
        updateQuantity();
    });

    document.getElementById('decrease-quantity').addEventListener('click', function() {
        if (currentQuantity > 1) {
            currentQuantity--;
            updateQuantity();
        }
    });

    document.querySelectorAll('.buy-now, .add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productData = {
                id: Date.now(), // Unique ID for each product
                name: productNameElement.textContent,
                price: currentPrice,
                quantity: currentQuantity,
                origin: productOriginElement.textContent,
                gender: productGenderElement.textContent,
                volume: document.querySelector('.volume-option.active').textContent,
                image: productImageElement.src
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(productData);
            localStorage.setItem('cart', JSON.stringify(cart));

            if (button.classList.contains('buy-now')) {
                window.location.href = 'Giohang.html'; // Replace with your cart page URL
            } else {
                alert('Đã thêm sản phẩm vào giỏ hàng');
            }
        });
    });

    function updatePrice() {
        const totalPrice = currentPrice * currentQuantity;
        priceElement.textContent = totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }

    function updateQuantity() {
        quantityElement.textContent = currentQuantity;
        updatePrice();
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    document.querySelector('.volume-option[data-volume="10"]').classList.add('active');
});


