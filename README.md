<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** github_username, repo_name, twitter_handle, email, project_title, project_description
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<p align="center">

  <h3 align="center">LINE Cryptocurrency Bot</h3>

  <p align="center">
    Chatbot that can get you Cryptocurrency Price
    <br />
    <br />
    <br />
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
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
        <li><a href="#starting-the-webhook-server">Starting the webhook server</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This is a LINE Chatbot that can get the latest Cryptocurrency Price and Charts from Binance API.

### Built With

-   NGINX
-   Node.js
-   Docker-Compose
-   Express.js
-   Puppeteer

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

-   Docker and Docker compose
-   Line Official Account Channel Access Token
-   SSL Certification and Domain Name

### Starting the webhook server

1. Clone the repo
    ```sh
    git clone https://github.com/pholawat-tle/crypto-line-bot
    ```
2. Go inside the project directory

    ```sh
    cd crypto-line-bot
    ```

3. Set up SSL certificate and Domain name
    1. Put the certificates and private key inside nginx/certificates folder
    2. Change the certificate name and Domain name nginx/default.conf
4. Create a .env file in server/src
    ```sh
    nano ./server/src/.env
    ```
5. Set the Channel Access Token Variable
    ```
    ChannelAccessToken=YOUR_ACCESS_TOKEN
    ```
6. Run Docker Compose
    ```sh
    docker-compose up --build
    ```
7. Change the webhook url on LINE Developer Console to `https://yourdomain/api/webhook`

<!-- USAGE EXAMPLES -->

## Usage

| Command          | Description                                    |
| ---------------- | ---------------------------------------------- |
| !price \<symbol> | Get the latest price from Binance API          |
| !graph \<symbol> | Get a screenshot of the chart from Binance API |

_The screenshots of the chart are saved inside the server folder and each screenshot will be deleted after 24 hours_

## License

Distributed under the MIT License. See `LICENSE` for more information.


