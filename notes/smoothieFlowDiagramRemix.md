# Build Your Own Smoothie App (Remix Version w/ Accounts)

_Build Your Own Smoothie_ will have 7 pages:

1. [Dashboard (Homepage)](#1-dashboard-homepage)
2. [Login](#2-login)
3. [Create Account](#3-create-account)
4. [Create Smoothie](#4-create-smoothie)
5. [View Smoothie](#5-view-smoothie)
6. [About](#6-about)
7. [Buy Blender](#7-buy-blender)

## 1. Dashboard (Homepage) - /index

<div style="text-align: center;">

```mermaid

graph TD
A{Is there a session cookie in<br />the browser's memory?}
A -- No --> B[Redirect to Login]
A -- Yes --> C[<ol><li>Load user's smoothies</li><li>Show 'Log out' and <br />'My Smoothies' links</li></ol>]

```

</div>

## 2. Login - /login

<div style="text-align: center;">

```mermaid

graph TD
A{Is there a session cookie in<br />the browser's memory?}
A -- Yes --> B[Redirect to Dashboard]
A -- No --> C[Load login form]
C --> D[/User submits login form/]
D --> E{Is the form<br/>data valid?}
E -- No --> G[Show form validation<br/>error messages]
G --> D
E -- Yes --> B

```

</div>

## 3. Create Account - /create-account

<div style="text-align: center;">

```mermaid

graph TD
A{Is there a session cookie in<br />the browser's memory?}
A -- Yes --> B[Redirect to Dashboard]
A -- No --> C[Load Create Account form]
C --> D[/User submits Create<br />Account form/]
D --> E{Is the form<br/>data valid?}
E -- No --> G[Show form validation<br/>error messages]
G --> D
E -- Yes --> B

```

</div>

## 4. Create Smoothie - /create

<div style="text-align: center;">

```mermaid

graph TD
A{Is there a session cookie in<br />the browser's memory?}
A -- No --> B[Redirect to Login]
A -- Yes --> C[Load Create<br />Smoothie form]
C --> D[/User submits Create<br />Smoothie form/]
D --> E{Is the form<br/>data valid?}
E -- No --> G[Show form validation<br/>error messages]
G --> D
E -- Yes --> H[Redirect to View Smoothie]

```

</div>

## 5. View Smoothie - /smoothies/$recipeId

<div style="text-align: center;">

```mermaid

graph TD
A{Is there a session cookie in<br />the browser's memory?}
A -- Yes --> B{Does the<br />smoothie belong to<br />the user?}
A -- No --> C[Load smoothie]
B -- Yes --> F[Show 'Edit' button]
F --> C
B -- No --> C

```

</div>

## 6. About - /about

<div style="text-align: center;">

```mermaid

graph TD
A[Load About page]

```

</div>

## 7. Buy Blender - /blenders

<div style="text-align: center;">

```mermaid

graph TD
A[Load Buy Blender page]

```

</div>
