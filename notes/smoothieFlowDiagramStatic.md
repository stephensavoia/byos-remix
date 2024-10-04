# Build Your Own Smoothie App (Remix Version w/ Accounts)

_Build Your Own Smoothie_ will have 7 pages:

1. [Create Smoothie (Homepage)](#1-create-smoothie)
2. [View Smoothie](#2-view-smoothie)
3. [About](#3-about)
4. [Buy Blender](#4-buy-blender)

## 1. Create Smoothie (Homepage)

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

## 2. View Smoothie

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

## 3. About

<div style="text-align: center;">

```mermaid

graph TD
A[Load About page]

```

</div>

## 4. Buy Blender

<div style="text-align: center;">

```mermaid

graph TD
A[Load Buy Blender page]

```

</div>
