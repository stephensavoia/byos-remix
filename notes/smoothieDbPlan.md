# Build Your Own Smoothie App Database

## Diagram

```mermaid
erDiagram
    Users {
        int UserID PK "Primary Key"
        varchar UserName
        varchar Email
        varchar PasswordHash
        timestamp CreatedAt
    }

    Sessions {
        int SessionID PK "Primary Key"
        int UserID FK "Foreign Key"
        varchar SessionToken
        timestamp CreatedAt
        timestamp ExpiresAt
    }

    Recipes {
        int RecipeID PK "Primary Key"
        int UserID FK "Foreign Key"
        varchar RecipeName
        text Instructions
        timestamp CreatedAt
    }

    Ingredients {
        int IngredientID PK "Primary Key"
        varchar IngredientName
        enum Category
        float Quantity
        float VitaminA
        float VitaminC
        float Calcium
        float Iron
        float Potassium
        varchar Benefits
    }

    RecipeIngredients {
        int RecipeID PK,FK "Primary Key, Foreign Key"
        int IngredientID PK,FK "Primary Key, Foreign Key"
        varchar Quantity
    }

    Users ||--o{ Sessions : "Has many"
    Users ||--o{ Recipes : "Has many"
    Recipes ||--o{ RecipeIngredients : "Has many"
    Ingredients ||--o{ RecipeIngredients : "Has many"

```

## SQL Setup

To set up a SQL database with the following tables:

- **Users**: To store user data.
- **Sessions**: To track user sessions.
- **Recipes**: To store recipe data, each belonging to one user.
- **Ingredients**: To store individual ingredients.
- **RecipeIngredients**: To store the relationship between recipes and ingredients (many-to-many relationship).

Here is a SQL schema for these tables:

### 1. **Users Table**

This table will store basic user information.

```sql
CREATE TABLE Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    UserName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. **Sessions Table**

This table tracks user sessions.

```sql
CREATE TABLE Sessions (
    SessionID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    SessionToken VARCHAR(255) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ExpiresAt TIMESTAMP NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);
```

### 3. **Recipes Table**

Each recipe is associated with a user.

```sql
CREATE TABLE Recipes (
    RecipeID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    RecipeName VARCHAR(255) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);
```

### 4. **Ingredients Table**

This table stores individual ingredients. (All recipes have the same amount of each ingredient, so "Quantity" is here instead of in the RecipeIngredients table.)

```sql
CREATE TABLE Ingredients (
    IngredientID INT PRIMARY KEY AUTO_INCREMENT,
    IngredientName VARCHAR(255) NOT NULL,
    Category ENUM('LIQUID', 'FRUITS', 'VEGETABLES', 'GRAINS', 'NUTS', 'SUPERFOODS') NOT NULL,
    VitaminA       FLOAT NOT NULL,
    VitaminC       FLOAT NOT NULL,
    Calcium        FLOAT NOT NULL,
    Iron           FLOAT NOT NULL,
    Potassium      FLOAT NOT NULL,
    Benefits       VARCHAR(255)
);
```

### 5. **RecipeIngredients Table**

This table establishes a many-to-many relationship between recipes and ingredients, with an optional quantity.

```sql
CREATE TABLE RecipeIngredients (
    RecipeID INT,
    IngredientID INT,
    Quantity FLOAT NOT NULL,
    PRIMARY KEY (RecipeID, IngredientID),
    FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID) ON DELETE CASCADE,
    FOREIGN KEY (IngredientID) REFERENCES Ingredients(IngredientID) ON DELETE CASCADE
);
```

### Explanation:

1. **Users**: Stores user data such as username, email, and password hash.
2. **Sessions**: Tracks user sessions with token expiry.
3. **Recipes**: Each recipe is linked to one user and contains instructions.
4. **Ingredients**: Contains individual ingredient names.
5. **RecipeIngredients**: Links recipes to ingredients in a many-to-many relationship with an optional quantity field.

This schema establishes the relationships between users, recipes, ingredients, and user sessions. Each recipe belongs to one user, and many recipes can use the same ingredients through the `RecipeIngredients` table.

## Prisma Setup

To set up Prisma with the provided SQL database schema, we can define the models that correspond to each table. Prisma translates your schema into database tables and manages the relationships between them.

Here’s how you can create your `schema.prisma` file based on your SQL schema:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"  // Change this according to your database (postgresql, sqlite, etc.)
  url      = env("DATABASE_URL")
}

model User {
  UserID      Int       @id @default(autoincrement())
  UserName    String
  Email       String    @unique
  PasswordHash String
  CreatedAt   DateTime  @default(now())
  Sessions    Session[]
  Recipes     Recipe[]
}

model Session {
  SessionID   Int       @id @default(autoincrement())
  UserID      Int
  SessionToken String
  CreatedAt   DateTime  @default(now())
  ExpiresAt   DateTime
  User        User      @relation(fields: [UserID], references: [UserID], onDelete: Cascade)
}

model Recipe {
  RecipeID    Int       @id @default(autoincrement())
  UserID      Int
  RecipeName  String
  CreatedAt   DateTime  @default(now())
  User        User      @relation(fields: [UserID], references: [UserID], onDelete: Cascade)
  Ingredients RecipeIngredient[]
}

model Ingredient {
  IngredientID   Int       @id @default(autoincrement())
  IngredientName String
  Category       IngredientCategory
  VitaminA       Float
  VitaminC       Float
  Calcium        Float
  Iron           Float
  Potassium      Float
  Benefits       String?
  Recipes        RecipeIngredient[]
}

model RecipeIngredient {
  RecipeID      Int
  IngredientID  Int
  Quantity      Float
  Recipe        Recipe     @relation(fields: [RecipeID], references: [RecipeID], onDelete: Cascade)
  Ingredient    Ingredient @relation(fields: [IngredientID], references: [IngredientID], onDelete: Cascade)
  @@id([RecipeID, IngredientID]) // Composite primary key
}

enum IngredientCategory {
  LIQUID
  FRUIT
  VEGETABLES
  GRAINS
  NUTS
  SUPERFOODS
}
```

### Key Points:

1. **`@id` and `@default(autoincrement())`**: These are used to define the primary key and auto-increment behavior in Prisma.
2. **Relations**:
   - The `@relation` fields define relationships between models.
   - The `onDelete: Cascade` ensures that when a related record is deleted, associated records are also deleted (similar to `ON DELETE CASCADE` in SQL).
3. **Composite Primary Key**: The `RecipeIngredient` table uses a composite primary key (`@@id([RecipeID, IngredientID])`) to establish the many-to-many relationship.

### Environment Setup:

Make sure to set up the `DATABASE_URL` in your `.env` file:

```env
DATABASE_URL="mysql://username:password@localhost:3306/mydatabase"
```

Finally, run these commands to generate the Prisma client and apply the migration:

1. `npx prisma migrate dev --name init`
2. `npx prisma generate`

This will create your database schema based on the models and set up the Prisma client for use in your project.

## JSON Fake Data for Front-End Development

```JSON
{
  "users": [
    {
      "UserID": 1,
      "UserName": "john_doe",
      "Email": "john@example.com",
      "PasswordHash": "hashed_password_1",
      "CreatedAt": "2024-09-01T10:00:00Z"
    },
    {
      "UserID": 2,
      "UserName": "jane_smith",
      "Email": "jane@example.com",
      "PasswordHash": "hashed_password_2",
      "CreatedAt": "2024-09-02T12:30:00Z"
    }
  ],
  "sessions": [
    {
      "SessionID": 1,
      "UserID": 1,
      "SessionToken": "token_abc123",
      "CreatedAt": "2024-09-01T10:00:00Z",
      "ExpiresAt": "2024-09-02T10:00:00Z"
    },
    {
      "SessionID": 2,
      "UserID": 2,
      "SessionToken": "token_xyz789",
      "CreatedAt": "2024-09-02T12:30:00Z",
      "ExpiresAt": "2024-09-03T12:30:00Z"
    }
  ],
  "recipes": [
    {
      "RecipeID": 1,
      "UserID": 1,
      "RecipeName": "Green Mojito Smoothie",
      "CreatedAt": "2024-09-01T15:00:00Z"
    },
    {
      "RecipeID": 2,
      "UserID": 2,
      "RecipeName": "Tropical Orange Creamsicle Smoothie",
      "CreatedAt": "2024-09-02T18:00:00Z"
    }
  ],
  "ingredients": [
    {
      "IngredientID": 1,
      "IngredientName": "Almond milk",
      "Category": "LIQUID",
      "VitaminA": 0,
      "VitaminC": 0,
      "Calcium": 0,
      "Iron": 0,
      "Potassium": 0,
      "Benefits": "gut health, vibrant skin, strong bones"
    },
    {
      "IngredientID": 2,
      "IngredientName": "Oat milk",
      "Category": "LIQUID",
      "VitaminA": 0,
      "VitaminC": 0,
      "Calcium": 0,
      "Iron": 0,
      "Potassium": 0,
      "Benefits": "gut health, vibrant skin, strong bones"
    },
    {
      "IngredientID": 3,
      "IngredientName": "Coconut water",
      "Category": "LIQUID",
      "VitaminA": 0,
      "VitaminC": 0,
      "Calcium": 0,
      "Iron": 0,
      "Potassium": 0,
      "Benefits": "gut health, vibrant skin, strong bones"
    },
    {
      "IngredientID": 4,
      "IngredientName": "Filtered water",
      "Category": "LIQUID",
      "VitaminA": 0,
      "VitaminC": 0,
      "Calcium": 0,
      "Iron": 0,
      "Potassium": 0,
      "Benefits": "gut health, vibrant skin, strong bones"
    }
  ],
  "recipeIngredients": [
    {
      "RecipeID": 1,
      "IngredientID": 1,
      "Quantity": 8.5,
    },
    {
      "RecipeID": 1,
      "IngredientID": 3,
      "Quantity": 0.5
    },
    {
      "RecipeID": 2,
      "IngredientID": 2,
      "Quantity": 0.75
    },
    {
      "RecipeID": 2,
      "IngredientID": 4,
      "Quantity": 3
    }
  ]
}

```
