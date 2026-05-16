# BookCart - Online Book Store 📚

A beautiful, fully functional online book store website where users can browse, search, filter, and purchase books with ease.

## Features

✨ **Core Features:**
- 📖 Browse 12+ featured books across multiple categories (Fiction, Non-Fiction, Science, Mystery)
- 🔍 Real-time search by book title or author
- 🏷️ Filter books by category
- 🛒 Dynamic shopping cart with persistent storage
- ➕➖ Adjust quantities before checkout
- 💾 Local storage keeps cart data between sessions
- 📱 Fully responsive design (mobile, tablet, desktop)

🎨 **User Experience:**
- Modern gradient UI with smooth animations
- Hover effects and visual feedback
- Toast notifications for user actions
- Empty state messages
- Intuitive modal-based shopping cart

📧 **Additional Sections:**
- About section with store information
- Contact form for customer inquiries
- Sticky navigation bar with quick cart access
- Professional footer

## Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with Flexbox and Grid layouts
- **Vanilla JavaScript** - No external dependencies
- **LocalStorage API** - Persistent cart data

## How to Use

1. **Clone or download this repository**
2. **Open `index.html` in your web browser**
3. **Browse and shop!**

### Shopping Steps:
1. Use the search bar to find books by title or author
2. Filter by category using the dropdown
3. Select quantity and click "Add to Cart"
4. Click the cart icon to view your shopping cart
5. Adjust quantities or remove items as needed
6. Click "Proceed to Checkout" to complete your purchase
7. Your cart data is automatically saved in your browser

## File Structure

```
bookcart/
├── index.html      # Main HTML file with page structure
├── styles.css      # Complete CSS styling
├── script.js       # JavaScript functionality
└── README.md       # Documentation
```

## Sample Books Database

The store includes 12 sample books:

**Fiction:**
- The Great Gatsby - F. Scott Fitzgerald ($12.99)
- To Kill a Mockingbird - Harper Lee ($14.99)
- 1984 - George Orwell ($13.99)
- Pride and Prejudice - Jane Austen ($11.99)

**Non-Fiction:**
- Sapiens - Yuval Noah Harari ($18.99)
- Educated - Tara Westover ($17.99)
- Thinking, Fast and Slow - Daniel Kahneman ($16.99)
- Atomic Habits - James Clear ($15.99)

**Science:**
- A Brief History of Time - Stephen Hawking ($15.99)
- Cosmos - Carl Sagan ($18.99)

**Mystery:**
- The Murder of Roger Ackroyd - Agatha Christie ($12.99)
- The Girl with the Dragon Tattoo - Stieg Larsson ($14.99)

## Key Functions

- **filterBooks()** - Search and filter books in real-time
- **addToCart()** - Add books with selected quantity to cart
- **openCart() / closeCart()** - Manage cart modal
- **updateCartQuantity()** - Adjust item quantities
- **removeFromCart()** - Delete items from cart
- **checkout()** - Process purchase and clear cart
- **saveCart() / loadCart()** - Persist cart data using localStorage

## Customization

You can easily customize:
- **Add more books** - Edit the `books` array in `script.js`
- **Change colors** - Modify gradient values in `styles.css`
- **Adjust prices** - Update book prices in `script.js`
- **Add categories** - Extend the category filter options in `index.html`

## Browser Compatibility

✅ Works on all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is open source and available for personal and commercial use.

## Future Enhancements

Potential features to add:
- 🔐 User authentication and accounts
- 💳 Real payment gateway integration
- ⭐ Book ratings and reviews
- 📦 Order tracking
- 🎁 Wishlist functionality
- 📧 Email notifications
- 🌙 Dark mode theme
- 🌍 Multiple language support

## Credits

Created with ❤️ for book lovers everywhere!

---

Enjoy shopping at **BookCart** - Your favorite online bookstore! 📚✨
