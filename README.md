# Everynote


## Welcome to 'Everynote', a clone of Evernote https://everynote.com 
***
If you'd like to see this project, you can visit https://every-note-app.herokuapp.com/


This application was build using React/Redux, and Python. 
***

Below are the feature lists that I chose to primarily focus on for this project. 
***
## 1. User Creation 
 * Logged in Users should be able to sign up, log in, and sign out. 
 * Logged in Users should be able to demo the website without having to create an account. 
 * Logged in Users should be able to visit other pages, refresh the page, and view content dynamically while remaining logged in via authentication. 
 * Logged in Users should be directed to the main content on the website after logging in. 
 
 
## 2. Notes
 * A newly registered user should be able to create notes (either a single note without a notebook, or a note belonging to a notebook).
 * A logged in user should be able to edit a note, given the proper error handling/validation. 
 * A logged in user should be able to delete a note from a notebook, or a standalone note.
 * A logged in user should be able to see all of the notes belonging to them, and they should be available to view by notebook, or by all notes. 
 * A logged in user should be ablt to move a note from one notebook to another if the note belongs to a notebook.

## 3. Notebooks
  * A newly registered user should be able to create a notebook, which will allow the user to store many notes, and organize many notes.
  * A logged in user should be able to edit a notebook, whether it be renaming the notebook, duplicating the notebook, or adding a new note to the notebook.
  * A logged in user should be able to delete a notebook. Deleting the notebook should also delete the notes belonging to the notebook. 
  * A logged in user should be able to see all of the notes belonging to the user, and all of the notes belonging to the notebook.
  
### Backend API Routes 
My backend API routes allow me to effectively handle all CRUD functionality associated with the above mentioned features (notes/notebooks/users).
I handled my backend API Routes using Python (Flask). I decided that using Python would be an interesting way to learn more about how Python and JavaScript 
can work together when implementing a Backend/Frontend relationship between the two languages to create a full stack application. 

The backend routes that I chose to create for the above mentioned functionalites are shown below: 

*** 
 ## Notes API  
The notes API allows a logged in user to receive/update note data
* Getting all notes: A logged in user can view all campsites. 
 * `GET /api/notes`
   * This backend route checks for the current user via an authorization API, allowing the backend to effectively handle relaying the most relevant note-data to the 
 current user.
* Creating a note: This route handles the functionality that allows an authorized user to create a new note. 
 * `POST /api/notes`
* Updating/Deleting a note: A logged in user is able to edit/delete notes. These routes check for the current note ID. User authorization is both handled in the backend, and the frontend.
This is done by checking the current user's session, and associating the note's user_id (owner) with the current authenticated user via session.
 * `PUT /api/notes/:noteId`
 * `DELETE /api/notes/:noteId`
   * A user can move a note from one notebook to another: This route checks for the existence of both notebooks, verifying a note can be moved.
   * `PUT /api/notes/:notebookId/:noteId`
* Creating a note belonging to a notebook: A logged in user can create a note belonging to a notebook. This route takes a notebook ID and form data associated with the contents of the note.
 * `POST /api/notes/:notebookId`

## Notebooks API
* Getting all notebooks: A logged in user should have access to all notebooks. This route makes a query, which checks for the current user in session, and gets all notebooks belonging to said user.
 * `GET /api/notebooks`
* Creating a notebook: This route handles the form data coming in from the frontend, which is the used to make a query for the creation of a new notebook.
 * `POST /api/notebooks`
* Deleting a notebook: This route takes the notebook ID as a parameter, verifies the existence of the notebook, and deletes the notebook.
 * `DELETE /api/bookings/:notebookId`
* Editing a notebook: This route handles renaming a notebook and its contents such as title. takes the notebook ID as parameter, verifying the existence of the notebook. The form data is received and notebook is updated.
 * `PUT /api/bookings/:bookingId`

***
The backend routes shown above were created with a database structure in mind which I show below. 
I centered my Database around the relationship between Notes, Notebooks, and of course Users. Each 'Notebook' can contain many notes, and each user can have many notes/notebooks. 


## Database Schema: 
***
![EvernoteFinalSchema](https://user-images.githubusercontent.com/59547636/179323793-eb718027-f2eb-489d-a010-337b869d159c.JPG)
***
 
# React Component structure
***
![component_structure_everynote](https://user-images.githubusercontent.com/59547636/179325624-3584fb1b-8a10-4c4d-bd5f-fae3064fbf0f.PNG)
***


## React Components Descriptions (General Summary)
*** 
* Landing Page - Contains the contents of the landing page, this component renders three other components which were split up into: Navbar (LandingNav), LandingTitle (Header),
LandingContent (Main content + footer)
* Main - This component houses all of the sub-components which are only visible when the user is logged in. All of the components below are children of this component.
(All of the remaining components below are children of Main)
* HomePage - This component is rendered at `/home`, and this component allows the user to see a general summary of all of the notes which they've made from most recent to oldest. (The notes displayed are not categorized by notebook)
  * HomeNotes - This component is a direct child of HomePage, this component houses the list of notes, allowing for props to be passed down to handle each note individually. 
* GlobalSideBar - This component is always visible upon a successful login. This component is the navbar which allows the user to navigate the applicaiton.
* RightSideBar - This component is the 'right-half' of GlobalSideBar when the user navigates to `/notes`, `/notes/:noteId`, `/notes/notebooks/:notebookId`, `/notes/notebooks/:notebookId/:noteId` and allows the user to see a scrollable-list of all notes, or all notes belonging to a notebook.
  * NotesPreview - This component is a direct child of RightSideBar, which handles getting note data from the Redux store and eventually iterates through all of the notes
  relevant to the current user. For every iteration of a note in the user's note-list (in state), this component is passed the note-data as props to render a scrollable list.
* TextEditor - This component is also rendered for at the `/notes/ - all parameters` routes, and renders the text-editor.
  * MainTextArea - this component is a direct child of TextEditor and is passed down note-data as props. This component's main function is to render the form and always 
    show relevant data for each particular note, as well as handling submitting the form.
* AllNoteBooks - This component is rendered at the `/notebooks` route, which renders a list of all of the notebooks belonging to a user, as well as the notes belonging to
  each specific notebook. Much like RightSideBar, this component iterates through the notebooks-state and passes down props for each iteration.
  * NotebooksPreview - This component is a direct child of AllNotebooks. This component is rich with functionality, handling moving notes to another notebook, deleting notebooks,
  duplicating notebooks, editing notebooks, and displaying all notes belonging to each notebook. 
***

## Difficulties and Challanges:
***
I would say that the most difficult aspect of this application was managing the data flow between each component, as well as rendering each component having multiple routes. 
Making sure that the data being passed down as props to a child component is going to display the most relevant data and mount at the correct time is a design choice that can 
effect the capabilities of your application, and handling this difficulty alone can be a challenge in itself! I would say that the process of making corrections to the overall
structure of my components, as well as fixing minor issues with the data-flow of each component and how each component handles that data taught me a lot about the importance of component structure and 
it's direct relationship to the backend/Redux store.
I also learned a lot about general UI interactions with react and the effectiveness of different use-cases for hooks when a component initially renders, or manipulating how a component renders based on a form pop-up, or 
dynamic design such as animations, css changes, updating data without refreshing, and much more.
***



## Application Layout (screenshots)
* Landing Page 
![everynote_splash](https://user-images.githubusercontent.com/59547636/179326026-a45ce356-9fa9-46fe-a813-c2332b151320.PNG)
***
* Signup Page 
![everynote_signup](https://user-images.githubusercontent.com/59547636/179326182-f23cdb7b-2358-45e6-b6f9-12a38063c1ae.PNG)
***
* Login 
![everynote_login](https://user-images.githubusercontent.com/59547636/179326202-5496889e-76ad-48fa-8fe9-05c285c04c08.PNG)
***
* Home Page 
![everynote_homepage](https://user-images.githubusercontent.com/59547636/179326036-8f720293-ead8-4820-9d45-620bf56de63a.PNG)
***
* Notes Page + Text editor
![everynote_texteditor](https://user-images.githubusercontent.com/59547636/179326060-53fc231d-2690-4a41-bb0b-3fcda5be6610.PNG)
*** 
* Notebooks List Page 
![everynote_notebooks_page](https://user-images.githubusercontent.com/59547636/179326096-3b169a32-5626-4694-8922-f15aa15b2df7.PNG)
***


