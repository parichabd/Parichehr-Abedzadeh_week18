# Contact Manager Project

A simple and practical contact management application built with React.  
Features adding, editing, deleting, searching, and bulk managing contacts with a modern user interface.

---

## Features

- Add new contacts with form validation
- Edit existing contacts
- Delete individual contacts
- Delete all contacts
- Delete selected contacts
- Search contacts by name
- View contact details in a modal
- Avatar selection from predefined images with preview before upload
- Data persistence using localStorage
- State management with Context API
- Toast notifications with react-toastify

---

## Form Validation

- Uses `react-hook-form` for form state management.
- Validation schema defined with `Yup` to enforce:
  - Username (min 7 chars, must include number or symbol)
  - Valid email format
  - Required job field
  - Phone number format (10–15 digits)

---

## Avatar Selection

- Custom `AvatarModal` component displays selectable avatars.
- Users can preview selected avatar on the form before submission.
- Images imported as ES modules for proper bundling.

---

## Project Structure



## Project Structure

```
.
├── src
│   ├── Components       # UI components
│   ├── Context          # Context API for state management
│   ├── assets           # Images and static files
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Project entry point
└── README.md            # Project documentation

```

---


## Technologies Used

- React  
- React Router DOM  
- Context API  
- react-hook-form & Yup (form handling & validation)  
- react-toastify (for toast notifications)  
- Vite  
- CSS Modules  

---

## Styling and UX

- Scoped styles via CSS Modules to avoid conflicts.
- Responsive layout with flexbox for form and avatar preview.
- Modal overlays with backdrop click to close.
- Button and avatar hover effects for better UX.
- User-friendly error messages and form feedback.

---

### Morer Info
-Contacts data is saved in localStorage to persist between page reloads.

-Context API simplifies and centralizes state management.

-Toast notifications improve user experience by showing success/error messages.

-Components are modular and reusable for easy maintenance and scalabilit



![App Screenshot](./readPng/Screenshot%20(153).png)
![App Screenshot](./readPng/Screenshot%20(162).png)
![App Screenshot](./readPng/Screenshot%20(163).png)
![App Screenshot](./readPng/Screenshot%20(164).png)
![App Screenshot](./readPng/Screenshot%20(165).png)
![App Screenshot](./readPng/Screenshot%20(157).png)
![App Screenshot](./readPng/Screenshot%20(158).png)
![App Screenshot](./readPng/Screenshot%20(159).png)
![App Screenshot](./readPng/Screenshot%20(153).png)
![App Screenshot](./readPng/Screenshot%20(153).png)
![App Screenshot](./readPng/Screenshot%20(160).png)
![App Screenshot](./readPng/Screenshot%20(161).png)


---


## Contact

If you have any questions, feel free to reach out:
Email: parichehrabedzadeh@gmail.com

GitHub: github.com/parichabd