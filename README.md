[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/7PNkbV4c)
# React JS - Final Project

**Goal:** Create a shopping website with your category of choice (electronics, food, clothes, toys, etc.)

## Installation ⚙

Create a NextJS project with `npx create-next-app final-project`.

## Requirements ✅

- You must use a database (MongoDB or Postgres) for data storage.
- There should be two roles, one for user and one for admin. Admin can add new products while the user can only view and checkout.
- Implement checkout using Stripe or PayPal API.
- Your website should have these pages:

  - Home
  - Login/Signup page
  - Products List with images and Add to Cart button
  - Add Product page
  - Edit Product page
  - View Product Detail page
  - View Cart page
  - Checkout page
  - About page
  - Contact page with a working contact form

- The website should have CRUD functionality (Create, Retrieve, Update, Delete). Use **Server Actions** or **Route Handlers**.
- For the product images, use Cloudinary API to store your images and save the image url into your database [https://cloudinary.com/].
- You must have a Shopping Cart sidebar showing the products you added to cart. The same products will appear on the View Cart page.
- Clicking on the product image on the Product List page should open a modal showing the product image. Use parallel and intercepting routes to achieve this. On the modal, you can display details like Product Name, Product Price, Product Image, Add to Cart button.

## Tips 💡

- Please check out Behance [https://www.behance.net/] for some inspiration for your design.
- You can reuse your past projects' design and functionality.
- If you are going to use a Google Font, NextJS can support it [https://nextjs.org/docs/app/building-your-application/optimizing/fonts#google-fonts].
