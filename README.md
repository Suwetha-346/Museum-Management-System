# Museum-Management-System

A desktop-based application developed using **Java (Apache NetBeans)** and **MySQL** to manage museum operations efficiently.  
The system provides a digital solution for storing and managing information about museums, exhibitions, artifacts, and employees with full CRUD functionality.

---

##  Overview

This project replaces manual record-keeping with a structured database system.  
It enables users to easily maintain museum data through a simple Java interface connected to a MySQL database.

---

##Features

-  Insert new records  
-  View stored data  
-  Update existing records  
-  Delete records  
-  Relational database design  
-  Multiple entity management  
-  User-friendly interface  

---

##  System Modules

###  Museum
- Museum ID  
- Name  
- Location  
- Established Year  

### Exhibitions
- Exhibition ID  
- Museum ID (Foreign Key)  
- Exhibition Name  
- Start Date  
- End Date  

###  Artifacts
- Artifact ID  
- Exhibition ID (Foreign Key)  
- Artifact Name  
- Origin  
- Age  

###  Employees
- Employee ID  
- Museum ID (Foreign Key)  
- Name  
- Position  
- Salary  

---

## 🛠️ Technologies Used

### Front End
- Java  
- Java Swing  
- JDBC  

###  Back End
- MySQL Database  
- MySQL Workbench  

###  Tools
- Apache NetBeans IDE  
- MySQL Connector/J  

---

##  Installation & Setup

###  Prerequisites

Install the following:

- Java JDK  
- Apache NetBeans  
- MySQL Server  
- MySQL Workbench  

---

###  Database Setup

1. Create database using SQL commands
2. Run the provided SQL script to create tables.

---
### Add MySQL Connector

- Download MySQL Connector/J  
- Add the JAR file to project libraries in NetBeans  

---

### Configure Connection

Update database credentials in Java code:
