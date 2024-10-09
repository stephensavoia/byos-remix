OVERVIEW:

1. Install DaisyUI
2. Design Build Smoothie form page
   a. Choose fonts
   b. Get svg images
3. Make Build Smoothie submit with a json similar to what would be needed for the prisma db entry
   a. Make max-1,2,3 for each category
   b. Calculate quantity to submit (in action function), based on how many ingredients were used
4. Design the View Smoothie page
   a. DaisyUI stuff
   b. Calculate nutrition facts from quantity and ingredient data

DONE:

- add fonts (cormorant garamont and figtree)
- style smoothie name input
- line up items checkbox on input page
- style submit button
- change theme colors (light gray to new light gray)
- add favicon
- style blender menu "ad" and make it at bottom of drawer
- write copy for "our mindset"
- add footer links (social and non-social)
- add footer info/copyright

TO DO:

- add blender picture
- add meta tag OG tag

- make max checks for each category
- form validation
- make action function create a get link to a recipe page in format "{IngredientID}A{AMOUNT}C{IngredientID}A{AMOUNT}" e.g. "/recipe/1A12C3A4C9A6", where "AMOUNT" is /12 (can be cups or tbsp, depends on ingredient category, but that can be found from database and doesn't need to be encoded)

- get clock and fork/knife icons
