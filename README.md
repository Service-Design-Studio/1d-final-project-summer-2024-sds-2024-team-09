<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="readme_img/logo.png" alt="Logo" width="200" height="200">
  </a>

<h3 align="center">crybaby</h3>

  <p align="center">
    project_description
    <br />
    <a href="https://sites.google.com/mymail.sutd.edu.sg/teambaymax/home?authuser=4"><strong>Visit our website »</strong></a>
    <br />
    <br />
    <a href="https://youtu.be/L2SNQhx0_Yo">Introduction To Team</a>
    ·
    <a href="https://youtu.be/L2SNQhx0_Yo">Product Video</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<p align="center">
<a href="readme_img/cover_pic.png">
  <img src="readme_img/cover_pic.png" alt="Product Name Screen Shot" width="640" height="360" />
</a>
</p>

This project is a web application built with Ruby on Rails. It includes a PostgreSQL database and Docker for containerization. The application is designed to manage tasks, providing features such as user authentication, task creation, and progress tracking.
<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

Frontend:

[![React][React.js]][React-url]

Backend:

[![Rails][Rails]][Rails-url]
[![Python][Python]][Python-url]
[![Google Cloud][GoogleCloud]][GoogleCloud-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

- **Ruby version**: 3.2.4
- **Rails version**: 7.1.3
- **Docker version**: 20.10.7
- **PostgreSQL version**: 13

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Key Dependencies
The project uses several key dependencies, including:

- Rails 7.1.3
- PostgreSQL
- Docker
- RSpec for testing
- Webpacker for managing JavaScript
- Turbo and Stimulus for modern Rails development
- need to add pythonnnnnnnnnnnnnnnnnn file

<p align="right">(<a href="#readme-top">back to top</a>)</p>

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

    <p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
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

<p align="right">(<a href="#readme-top">back to top</a>)</p>


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

<p align="right">(<a href="#readme-top">back to top</a>)</p>


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

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Guidelines

- **Code Style**: Follow the coding style guidelines of the project.
- **Testing**: Ensure your changes pass all tests. Add new tests for your changes if applicable.
- **Documentation**: Update the documentation to reflect your changes.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
    - [ ] Nested Feature

See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
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

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email@email_client.com

Project Link: [https://github.com/github_username/repo_name](https://github.com/github_username/repo_name)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=for-the-badge
[React-url]: https://reactjs.org/

[Rails]: https://img.shields.io/badge/-Rails-CC0000?logo=ruby-on-rails&logoColor=white&style=for-the-badge
[Rails-url]: https://rubyonrails.org/

[Python]: https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white&style=for-the-badge
[Python-url]: https://www.python.org/

[GoogleCloud]: https://img.shields.io/badge/-Google%20Cloud-4285F4?logo=google-cloud&logoColor=white&style=for-the-badge
[GoogleCloud-url]: https://cloud.google.com/

