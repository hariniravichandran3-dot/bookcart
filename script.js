// Sample Books Database
const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', price: 12.99 },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', price: 14.99 },
    { id: 3, title: '1984', author: 'George Orwell', category: 'Fiction', price: 13.99 },
    { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', category: 'Fiction', price: 11.99 },
    { id: 5, title: 'Sapiens', author: 'Yuval Noah Harari', category: 'Non-Fiction', price: 18.99 },
    { id: 6, title: 'Educated', author: 'Tara Westover', category: 'Non-Fiction', price: 17.99 },
    { id: 7, title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', category: 'Non-Fiction', price: 16.99 },
    { id: 8, title: 'Atomic Habits', author: 'James Clear', category: 'Non-Fiction', price: 15.99 },
    { id: 9, title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', price: 15.99 },
    { id: 10, title: 'Cosmos', author: 'Carl Sagan', category: 'Science', price: 18.99 },
    { id: 11, title: 'The Murder of Roger Ackroyd', author: 'Agatha Christie', category: 'Mystery', price: 12.99 },
    { id: 12, title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson', category: 'Mystery', price: 14.99 }
];

// Shopping Cart Array
let cart = [];

// Initialize App
document.addEventListener('DOMContentLoaded', function () {
    loadCart();
    displayBooks(books);
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    document.getElementById('search-input').addEventListener('input', filterBooks);
    document.getElementById('category-filter').addEventListener('change', filterBooks);
    document.querySelector('.cart-icon').addEventListener('click', openCart);
}

// Display Books
function displayBooks(booksToDisplay) {
    const booksGrid = document.getElementById('books-grid');
    booksGrid.innerHTML = '';

    if (booksToDisplay.length === 0) {
        booksGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No books found. Try a different search.</p>';
        return;
    }

    booksToDisplay.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <div class="book-cover">${book.title.charAt(0)}</div>
            <div class="book-info">
                <div class="book-title">${book.title}</div>
                <div class="book-author">by ${book.author}</div>
                <div class="book-category">${book.category}</div>
                <div class="book-price">$${book.price.toFixed(2)}</div>
                <div class="quantity-selector">
                    <button onclick="decreaseQty(this)">−</button>
                    <input type="number" value="1" min="1" max="10" class="qty-input">
                    <button onclick="increaseQty(this)">+</button>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${book.id})">Add to Cart</button>
            </div>
        `;
        booksGrid.appendChild(bookCard);
    });
}

// Filter Books
function filterBooks() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const selectedCategory = document.getElementById('category-filter').value;

    const filtered = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === '' || book.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    displayBooks(filtered);
}

// Quantity Controls
function decreaseQty(button) {
    const input = button.nextElementSibling;
    if (input.value > 1) {
        input.value--;
    }
}

function increaseQty(button) {
    const input = button.previousElementSibling;
    if (input.value < 10) {
        input.value++;
    }
}

// Add to Cart
function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    const qtyInput = event.target.parentElement.querySelector('.qty-input');
    const quantity = parseInt(qtyInput.value);

    const existingItem = cart.find(item => item.id === bookId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: book.id,
            title: book.title,
            author: book.author,
            price: book.price,
            quantity: quantity
        });
    }

    saveCart();
    updateCartCount();
    showToast(`${book.title} added to cart!`);
    qtyInput.value = 1;
}

// Open Cart Modal
function openCart() {
    document.getElementById('cart-modal').style.display = 'block';
    displayCartItems();
}

// Close Cart Modal
function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

// Display Cart Items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty. Start shopping!</div>';
        document.getElementById('total-items').textContent = '0';
        document.getElementById('total-price').textContent = '0.00';
        return;
    }

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)} × ${item.quantity}</div>
            </div>
            <div class="cart-item-controls">
                <input type="number" value="${item.quantity}" min="1" max="10" 
                    onchange="updateCartQuantity(${item.id}, this.value)">
                <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    document.getElementById('total-items').textContent = totalItems;
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

// Update Cart Quantity
function updateCartQuantity(bookId, newQuantity) {
    const item = cart.find(item => item.id === bookId);
    if (item) {
        item.quantity = parseInt(newQuantity);
        if (item.quantity <= 0) {
            removeFromCart(bookId);
        } else {
            saveCart();
            displayCartItems();
            updateCartCount();
        }
    }
}

// Remove from Cart
function removeFromCart(bookId) {
    cart = cart.filter(item => item.id !== bookId);
    saveCart();
    displayCartItems();
    updateCartCount();
    showToast('Item removed from cart');
}

// Update Cart Count Badge
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    showToast(`Order placed! Total: $${totalPrice.toFixed(2)}`);
    cart = [];
    saveCart();
    updateCartCount();
    displayCartItems();
    setTimeout(() => {
        closeCart();
    }, 1500);
}

// Local Storage Functions
function saveCart() {
    localStorage.setItem('bookcart_cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('bookcart_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Toast Notifications
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Contact Form Handler
function handleContactForm(event) {
    event.preventDefault();
    showToast('Thank you for your message! We will get back to you soon.');
    event.target.reset();
}

// Close modal when clicking outside of it
window.onclick = function (event) {
    const modal = document.getElementById('cart-modal');
    if (event.target === modal) {
        closeCart();
    }
}
