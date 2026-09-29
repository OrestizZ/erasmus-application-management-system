# Erasmus Application Management System

This web application was developed as part of the "Network Applications & Services Design" course for the University of the Peloponnese. It is a comprehensive Erasmus application management system.

## Core Features
* **User Management:** Provides the ability to register (Signup), log in, and edit student profile details.
* **Application Submission & Validation:** Includes a form for automatic eligibility checking and an application submission system that supports file uploads.
* **Admin Panel:** The administrator can set the application submission period, as well as view, filter (based on GPA, pass rate, etc.), and accept applications. Additionally, they can manage partner universities (add, delete, rename) through an integrated REST API.
* **Bonus Features:** The application includes page protection based on login status (preventing unauthorized access to specific pages), a toggle password visibility option, and a dropdown menu for mobile devices.

## Technologies Used
* **Environment:** Runs on a XAMPP environment using Apache and MySQL (via phpMyAdmin) for the database.
* **Backend:** PHP is used for database communication, session variable management, and server-side validation.
* **Frontend:** JavaScript is used for immediate form checks (client-side validation) and asynchronous operations.

## Authors

This project was created by:

* **Orestis Zappas** - @OrestizZ (https://github.com/OrestizZ)
* **Georgios Dilioridis** - @GeorgiosDilio (https://github.com/GeorgiosDilio)

as a university assignment for the **Department of Informatics and Telecommunications (University of Peloponnese)**.
