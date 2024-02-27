# Project Technical Overview Doc

---

# Partner Management

## Why this project?

- This project has been setup to solve the issues that Anvayaa is facing with its service providers, two of the major problems are noted below:
  - Contracts: No system to handle and organize contracts and agreements with the partners.
  - Staff Management: Need to track every staff member the partner provides Anvayaa with and track their reviews from the customer.

## How to get started?

### Resources

- [https://nextjs.org/docs](https://nextjs.org/docs) (We are using Pages Router)
- [https://mantine.dev/](https://mantine.dev/) (UI Library)
- [https://github.com/CSFrequency/react-firebase-hooks](https://github.com/CSFrequency/react-firebase-hooks) (Hooks to ease the firebase read and some write operations)
- [https://firebase.google.com/docs](https://firebase.google.com/docs) (Write operations)

---

### Instructions

1. The repo is vendor-web ([https://bitbucket.org/xrg_health/vendor-web/src/master/](https://bitbucket.org/xrg_health/vendor-web/src/master/))
2. Clone it and run `npm install` inside the project.
3. Firebase Instructions

   1. First, you need to create a new project on Firebase:
      1. Visit the Firebase console at [https://console.firebase.google.com/](https://console.firebase.google.com/)
      2. Click on "Add project"
      3. Provide a project name and optionally change other project settings
      4. Accept the Firebase terms and click "Continue"
      5. Select NO for Choose whether to enable Google Analytics for your project and follow the instructions (optional)
      6. Click on "Create project"

   b. Next, you need to add a new web app to your Firebase project:

   1. In the Firebase console, click on the "Project Overview"
   2. Click the web icon (</>) to create a new web app
   3. Provide an app nickname and optionally enable Firebase Hosting
   4. Register the app

   c. After registering the app, Firebase will provide you with a Firebase SDK setup snippet that you'll need to add to your web project copy it and paste the respective values following the below steps.

   1. Create a file `.env.local` in the root of the project.
   2. Paste the following configuration

      ```bash
      NEXT_PUBLIC_FIREBASE_API_KEY=
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
      NEXT_PUBLIC_FIREBASE_PROJECT_ID=
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
      NEXT_PUBLIC_FIREBASE_APP_ID=
      ```

   d. Finally, you need to enable Firestore, Storage, and Authentication services in your Firebase project

   1. Firestore:
      - Go to the Firebase console, select your project, then select "Firestore Database" from the left menu
      - Click "Create database", choose "Start in production mode" or "Start in test mode", then click "Next"
      - Choose a location for your Firestore data, then click "Enable"
   2. Storage:
      - Go to the Firebase console, select your project, then select "Storage" from the left menu
      - Click "Get Started", follow the instructions, then click "Done"
   3. Authentication:
      - Go to the Firebase console, select your project, then select "Authentication" from the left menu
      - Click "Get Started"
      - Click "Sign-in method" and enable "Email/Password" and "Phone"
      - Create a dummy admin user for email/password.

4. Run the command `npm run dev` to start the dev server.

---

### Recommended VSCode Extensions

- Prettier - esbenp.prettier-vscode
- GitLens - eamodio.gitlens
- ESLint - dbaeumer.vscode-eslint
- DotENV - mikestead.dotenv
- Path Intellisense - christian-kohler.path-intellisense
- vscode-icons - vscode-icons-team.vscode-icons
- npm intellisense - christian-kohler.npm-intellisense

---

### Suggested Workflow

- Use Excalidraw ([https://excalidraw.com/](https://excalidraw.com/)) for creating skeletons before coding the actual UI.
- Use Notion ([https://www.notion.so/](https://www.notion.so/)) for creating any docs (such as this!).

---

# Firebase

> The only way to protect the data on Firebase is by having rules and designing your collections with care.

### Configuration

- Production Project - Set up Firestore, Auth (Phone and Email) and Storage.
- Staging Project - Set up Firestore, Auth (Phone and Email) and Storage.

### How to make someone an ADMIN?

<aside>
⛔ The only way to make someone ***admin*** in the project is to create their identity with email and password on the firebase console and creating a document with that **UID** in the ***admins*** collection.

</aside>

## Rules (Production and Staging)

- These are must for production and staging, and should be updated when any of the collection is impacted through new code changes!

### Firestore Rules

```tsx
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Function to check if the user is an admin
    function isAdmin() {
      return exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }

    // Rule for admins collection
    match /admins/{id} {
      allow read, write: if request.auth != null && isAdmin();
      allow delete: if false;
    }

    // Rule for vendors collection
    match /vendors/{id} {
      allow read: if request.auth != null && (request.auth.uid == id || isAdmin());
      allow create: if request.auth != null && request.auth.uid == id
                    && request.resource.data.approval == 'PENDING';
      allow update: if request.auth != null
                    && ((request.auth.uid == id && request.resource.data.approval == resource.data.approval)
                    || isAdmin());
      allow delete: if false;
    }

    // Rule for staff collection
    match /staff/{staffId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null && staffId in get(/databases/$(database)/documents/vendors/$(request.auth.uid)).data.staffIds;
      allow delete: if false;
    }

    // Rule for contracts collection
    match /contracts/{contractId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null
                  && (contractId in get(/databases/$(database)/documents/vendors/$(request.auth.uid)).data.contractIds) || isAdmin();
      allow update: if isAdmin()
                    && request.resource.data.keys().hasOnly(['comments', 'status'])
                    && request.resource.data.status in ['APPROVED', 'REJECTED'];
      allow delete: if false;
    }
  }
}
```

\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***Explanation:\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***

1. `function isAdmin()`: This function checks if the currently authenticated user is an admin. This is done by checking if a document exists in the `admins` collection where the document ID matches the user's unique ID. If such a document exists, the function returns `true`, indicating that the user is an admin.
2. `match /admins/{id}`: These rules apply to the `admins` collection.
   - `allow read, write`: Admin users are allowed to read and write documents in the `admins` collection. The condition checks if the user is authenticated and if they are an admin.
   - `allow delete: if false;`: This prevents anyone from deleting documents in the `admins` collection.
3. `match /vendors/{id}`: These rules apply to the `vendors` collection.
   - `allow read`: Vendors can read their own documents, and admins can read any vendor's document.
   - `allow create`: Vendors can create a new document, but they must set the `approval` status to 'PENDING' when they create it.
   - `allow update`: There are two conditions under which a vendor document can be updated. Either the vendor themselves is updating the document and they're not changing the `approval` status, or an admin user is performing the update. This prevents vendors from changing their own approval status.
   - `allow delete: if false;`: This rule prevents anyone from deleting documents in the `vendors` collection.
4. `match /staff/{staffId}`: These rules apply to the `staff` collection.
   - `allow create`: Any authenticated user can create a staff document.
   - `allow read`: A user can read a staff document if they are authenticated and if the staff ID is listed in the `staffIds` of their vendor document.
   - `allow delete: if false;`: This prevents anyone from deleting documents in the `staff` collection.
5. `match /contracts/{contractId}`: These rules apply to the `contracts` collection.
   - `allow create`: Any authenticated user can create a contract document.
   - `allow read`: A user can read a contract if they are authenticated and if the contract ID is in the `contractIds` of their vendor document, or if they are an admin.
   - `allow update`: Only admins can update contracts, and they can only update the 'comments' and 'status' fields. Additionally, the 'status' field must be set to either 'APPROVED' or 'REJECTED' in the update.
   - `allow delete: if false;`: This rule prevents anyone from deleting documents in the `contracts` collection.

### FireStorage Rules

```tsx
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    function isSpecificAdmin() {
      return request.auth.token.email == 'partner.admin@xrgsolutions.com';
    }

    // Rule for vendor collection
    match /vendor/{vendorId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == vendorId || isSpecificAdmin();
    }
  }
}
```

---
