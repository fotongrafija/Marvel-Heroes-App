
# Marvel Character Search
A React + TypeScript application for searching Marvel characters using the Marvel API.

## Features
-Search for Marvel characters by name.
-Fetch and display character information directly from the Marvel API.
-Responsive UI for easy navigation and seamless experience.
-Tested with Jest for robust and reliable functionality.

### Prerequisites
To use this application, you must:

1. Register for a Marvel API key at Marvel Developer Portal.
2. Obtain your public key and private key from your Marvel Developer account.

#### Installation
Clone the Repository

bash
  git clone <repository-url>
  cd <project-directory>
  Install Dependencies

bash
  npm install

##### Set Up Environment Variables Create a .env file in the root directory of your project and add the following variables:

plaintext
  VITE_PUBLIC_KEY=<your public key>
  VITE_PRIVATE_KEY=<your private key>
  VITE_API_URL=http://gateway.marvel.com/
Replace <your public key> and <your private key> with the keys from your Marvel Developer account.

###### Run the Application Start the development server:

bash
  npm run dev
The app will be available at http://localhost:3000 (or the port provided by your development server).

# Running Tests
This project is tested with Jest. To run the test suite, execute the following command:

bash
  npm test
The test suite ensures that core features and functionality work as expected.

## Usage
1. Search for a character by entering their name in the search bar.
2. Browse through the list of characters fetched from the Marvel API.
3. Click on a character save icon to bookmark it to your local storge.

### Technologies Used
- React: Frontend library for building the UI.
- TypeScript: For type safety and better development experience.
- Vite: Fast build tool for modern web projects.
- arvel API: Data source for Marvel character information.
- Jest: For testing the application.


This project is licensed under the MIT License.

Thanks to the Marvel API for providing the data.








