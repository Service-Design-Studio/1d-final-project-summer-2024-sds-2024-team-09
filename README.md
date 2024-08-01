# My Rails Project

## Description
This project is a web application built with Ruby on Rails. It includes a PostgreSQL database and Docker for containerization. The application is designed to manage tasks, providing features such as user authentication, task creation, and progress tracking.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
  - [User Usage](#user-usage)
  - [Developer Usage](#developer-usage)
- [Architecture](#architecture)
  - [Controllers](#controllers)
  - [Views](#views)
  - [Database Schema](#database-schema)
- [Running Tests](#running-tests)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact Information](#contact-information)

## Prerequisites
- **Ruby version**: 3.2.4
- **Rails version**: 7.1.3
- **Docker version**: 20.10.7
- **PostgreSQL version**: 13

## Key Dependencies
The project uses several key dependencies, including:

- Rails 7.1.3
- PostgreSQL
- Docker
- RSpec for testing
- Webpacker for managing JavaScript
- Turbo and Stimulus for modern Rails development
- need to add pythonnnnnnnnnnnnnnnnnn file

For a complete list of dependencies, please refer to the `Gemfile` in the project repository.

## Installation
1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/yourproject.git
    cd yourproject
    ```

2. **Install dependencies:**

    ```bash
    bundle install
    ```

3. **Set up the database:**

    ```bash
    rails db:create
    rails db:migrate
    rails db:seed
    ```

4. **Build and run the Docker container:**

    ```bash
    docker-compose up --build
    ```

## Configuration
Copy the example environment file and edit as needed:

cp .env.example .env
Open .env in your editor and set the variables

## Usage

### User Usage
1. **Register**: Users can register to create an account.
2. **Get the settings from Agora API**: Configure the streaming settings using the Agora API.
3. **Stream**: Start a live stream.
4. **Watch**: View live streams.
5. **Record Stream**: Record streams and save them to history.
6. **Join Telegram Channel**: Get notified when a baby crying is detected.
7. **View History**: Access manually recorded videos or automatically recorded videos when a baby cries, arranged by dates.

### Developer Usage

#### Main Backend
1. **Install dependencies**:
    ```bash
    bundle install
    ```
2. **Run the Rails server**:
    ```bash
    rails server
    ```
   or deploy the program onto a cloud platform.

#### Front-end
The front-end details are still to be confirmed (TBC).!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

#### AI-end
1. **Set up `baby_cry_AI`**:
    - Install the AI model on a Linux system that can run 24/7.
    - Run the recorder for AI detection:
        ```bash
        cd baby_cry_AI
        ./run_recorder.sh
        ```
2. **Ensure Connectivity**:
    - Verify that all components (backend, AI system, front-end) are properly connected and communicating.

## Architecture

### Controllers
The application includes several controllers that handle different aspects of the application:

- **ApplicationController**: Base controller that includes common functionalities like session management and login requirements.
  
- **UsersController**: Manages user registration and profile management.
  - **index**: Lists all users.
  - **new**: Initializes a new user object for registration.
  - **create**: Creates a new user and saves it to the database.
  - **show**: Displays a specific user's profile.

- **UserSettingsController**: Manages user-specific settings.
  - **new**: Initializes a new user setting object.
  - **create**: Creates and saves user settings.
  - **edit**: Edits existing user settings.
  - **update**: Updates and saves user settings.

- **SessionsController**: Manages user login and logout.
  - **new**: Renders the login form.
  - **create**: Authenticates a user and creates a session.
  - **destroy**: Logs out the user and destroys the session.

- **PagesController**: Manages static pages and custom user interactions.
  - **camera**: Renders the camera view for the user.
  - **video_history**: Displays the history of videos.

- **HomeController**: Manages actions related to the home page.
  - **set_post**: Finds and sets a post by its ID.

- **CamerasController**: Manages camera-related functionalities for users.
  - **new**: Initializes a new camera object for the user.
  - **create**: Creates and saves a new camera for the user.

- **VideosController**: Manages video uploads, streaming, and history.
  - **user**: Fetches user settings and videos belonging to the current user.
  - **index**: Lists all videos with sorting options by title, duration, or creation date.
  - **show**: Displays a specific video. If the video file path is blank, renders an unavailable page.
  - **new**: Initializes a new video object for creation.
  - **edit**: Edits an existing video.
  - **create**: Creates a new video and uploads it to Google Cloud Storage (GCS).
  - **update**: Updates an existing video, preserving the original file path unless explicitly changed.
  - **destroy**: Deletes a video and removes it from GCS.
  - **history**: Lists all videos of the current user in descending order of creation date.
  - **list**: Lists all videos and their headers.
  - **api_index**: Provides an API endpoint to fetch videos for the current user, sorted by specified columns and order.

### Views

The application includes several views that correspond to actions in various controllers, ensuring a seamless user interface for managing different aspects of the application. Here are the key views categorized by their respective controllers:

#### User Views

The application includes several views to manage user registration, profile management, and settings.

1. **Index View (`index.html.erb`)**
    - Lists all users in the system.
    - Provides options to view individual user profiles.

2. **New View (`new.html.erb`)**
    - Provides a form for user registration.
    - Includes fields for username, email, and password.

3. **Show View (`show.html.erb`)**
    - Displays a specific user's profile details.
    - Includes options to edit or delete the user.

4. **Create View (`create.html.erb`)**
    - Handles the creation of a new user.
    - Displays success or error messages based on the registration outcome.

#### Sessions Views

The application includes several views to manage user sessions (login/logout).

1. **New View (`new.html.erb`)**
    - Provides a form for user login.
    - Includes fields for email and password.

2. **Create View (`create.html.erb`)**
    - Handles the logic for creating a new session (logging in a user).
    - Provides feedback to the user upon successful or failed login.

3. **Destroy View (`destroy.html.erb`)**
    - Handles the logic for destroying a session (logging out a user).
    - Redirects the user to the home page or login page after logout.

#### Pages Views

The application includes several views for various user interactions.

1. **User View (`user.html.erb`)**
    - Displays user-specific settings and information.
    - Allows users to update their settings or view their profile details.

2. **Video History View (`video_history.html.erb`)**
    - Displays the history of videos for the current user.
    - Lists videos in descending order of creation date.
    - Provides options to view, edit, and delete videos.

3. **Camera View (`camera.html.erb`)**
    - Provides a form for configuring camera settings.
    - Includes fields for camera name, app ID, token, and channel.

4. **Camera Broadcast View (`camera_broadcast.html.erb`)**
    - Displays the live camera broadcast.
    - Allows users to start or stop the camera stream.

5. **Index View (`index.html.erb`)**
    - Serves as a general index or landing page.
    - May include links to other key parts of the application or a summary of user activity.

#### Videos Views

The application includes several views to manage video uploads, streaming, and history.

1. **History View (`history.html.erb`)**
    - Displays the history of videos for the current user.
    - Lists videos in descending order of creation date.
    - Provides options to view, edit, and delete videos.

2. **Home View (`home.html.erb`)**
    - Serves as the landing page for users.
    - May include a summary or dashboard of recent videos and user activity.

3. **Index View (`index.html.erb`)**
    - Lists all videos in the system.
    - Provides sorting options by title, duration, or creation date.
    - Includes links to view individual video details, edit, and delete videos.

4. **List View (`list.html.erb`)**
    - Displays a comprehensive list of all videos along with their headers.
    - Useful for administrative purposes or detailed video management.

#### Home Views

The application includes views related to the home page and general navigation.

1. **Home View (`home.html.erb`)**
    - Serves as the landing page for the application.
    - Provides links to other parts of the application and displays a summary of user activities.

#### User_setting Views

The application includes several views to manage user registration, profile management, and settings.

1. **Index View (`index.html.erb`)**
    - Lists all users in the system.
    - Provides options to view individual user profiles.

2. **New View (`new.html.erb`)**
    - Provides a form for user registration.
    - Includes fields for username, email, and password.

3. **Show View (`show.html.erb`)**
    - Displays a specific user's profile details.
    - Includes options to edit or delete the user.

4. **Create View (`create.html.erb`)**
    - Handles the creation of a new user.
    - Displays success or error messages based on the registration outcome.

#### Cameras Views
1. **Index View (`new.html.erb`)**
    - Provides a form to enter camera settings.


## Running Tests
details are still to be confirmed (TBC).!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
for sprint 1 and 2
sprint 3 is python 

sprint 1 we using jest for web testing on the livestreaming

sprint 2 we checking the database for the videos based on login session id and login feature

for sprint 3 we have the baby cry detection from the AI, we have a python for AI detection, but it is not really standard way (sample videos with baby crying in test folder, which will be uploaded to the AI detection folder, the test case works until the alerted parted but not sure how to do testcase for uploading to gcloud bucket. ) or is it able to do unit testing for each component, will it counts as BDD tests?

sprint 4 we are not so sure what else to do since is telegram notification from the crybaby alert. unittest, maybe pytest, maybe cucumber possible since is acceptance testing if the message got sent through, feature testing using behave



## Deployment
details are still to be confirmed (TBC).!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

## Contributing
We welcome contributions to our project! To contribute, please follow these steps:

1. **Fork the Repository**
   - Navigate to the repository you want to contribute to.
   - Click the "Fork" button at the top right of the page to create a copy of the repository under your GitHub account.

2. **Clone Your Fork**
   - Clone the forked repository to your local machine:
     ```bash
     git clone https://github.com/yourusername/yourproject.git
     cd yourproject
     ```

3. **Create a Branch**
   - Create a new branch for your feature or bugfix:
     ```bash
     git checkout -b feature/your-feature-name
     ```

4. **Make Changes**
   - Make your changes to the codebase.
   - Ensure your code follows the project's coding standards and passes all tests.

5. **Commit Your Changes**
   - Commit your changes with a descriptive commit message:
     ```bash
     git add .
     git commit -m "Add feature: your feature description"
     ```

6. **Push Your Changes**
   - Push your changes to your forked repository:
     ```bash
     git push origin feature/your-feature-name
     ```

7. **Create a Pull Request**
   - Go to the original repository on GitHub.
   - Click the "Compare & pull request" button.
   - Provide a clear and descriptive title and description for your pull request.
   - Submit the pull request.

8. **Review Process**
   - Your pull request will be reviewed by the repository maintainers.
   - You may be asked to make additional changes or provide more information.
   - Once your pull request is approved, it will be merged into the main branch.

### Guidelines

- **Code Style**: Follow the coding style guidelines of the project.
- **Testing**: Ensure your changes pass all tests. Add new tests for your changes if applicable.
- **Documentation**: Update the documentation to reflect your changes.

### Getting Help

If you need help or have questions, please open an issue on GitHub. We are happy to help you get started!

## License

This project is licensed under the CryBaby License. 

### CryBaby License

CryBaby License

Copyright (c) [2024] [CryBaby]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Contact Information

For any inquiries, questions, or issues, please feel free to contact our team:

- [Tan Jing Kai]
  - Email: [jingkai_tan@mymail.sutd.edu.sg]
  - GitHub: [https://github.com/jingkai27]
- [Lee Jya Yin]
  - Email: [jyajin_lee@mymail.sutd.edu.sg]
  - GitHub: [https://github.com/jyayin]
- [Xiong Qian Long Mike]
  - Email: [mike_xiong@mymail.sutd.edu.sg]
  - GitHub: [https://github.com/mikexql]
- [Sofeanna Binte Yusof]
  - Email: [sofeanna_yusof@mymail.sutd.edu.sg]
  - GitHub: [https://github.com/Sofeanna17]
- [Lim Sophie]
  - Email: [sophie_lim@mymail.sutd.edu.sg]
  - GitHub: [https://github.com/shmoope]
- [Lim Sing Thai Tiger]
  - Email: [Tiger_Lim@mymail.sutd.edu.sg]
  - GitHub: [https://github.com/Regitiger]

You can also reach out to us via our project's GitHub repository by opening an issue.

[GitHub Repository](https://github.com/Service-Design-Studio)



<!-- **Video History Page Compilation -**

 • app/views/pages/video_history.html.erb: HTML, CSS and Javascript template for the video history page
 
 • controller/api/videos_controller.rb: controller that handles API requests related to video resources

 • public/videos: video files stored here

 • db/seeds.rb: Seed the database with sample videos
- To add/delete video: Run rails console -> Video.destroy_all -> Run rails db:seed after quitting rails console
   -->


