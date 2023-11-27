<!-- PROJECT LOGO -->
<div align="center">
  <a href="https://p-to-p-video-client.onrender.com/">
    <img src="https://github.com/KishorBalgi/Peer-to-Peer-Video-Communication/assets/75678927/4867b00c-4dc6-4a52-ae05-6d994a875528" alt="Logo" width="200" height="200">
  </a>

  <h3 align="center">Peer To Peer Video Communication</h3>

  <p align="center">
    A real-time video calling application built using WebRTC for peer-to-peer communication.
    <br />
    <a href="https://p-to-p-video-client.onrender.com/">View Demo</a>
    ·
    <a href="https://github.com/KishorBalgi/Peer-to-Peer-Video-Communication/issues">Report Bug</a>
    ·
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<a name="readme-top"></a>
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#demonstration">Demonstration</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>

  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

A peer-to-peer video calling application built using webRTC. The project supports multi-user video calling with in-call real-time messaging.

**Home Page**
<img src="https://github.com/KishorBalgi/Peer-to-Peer-Video-Communication/assets/75678927/c807f5ba-4ee1-4b36-b21e-80ecc2466b31" alt="Home Page">

**Signup Page**
<img src="https://github.com/KishorBalgi/Peer-to-Peer-Video-Communication/assets/75678927/66548df0-6693-4777-8610-0260d78fd5be" alt="Signup Page">

**Login Page**
<img src="https://github.com/KishorBalgi/Peer-to-Peer-Video-Communication/assets/75678927/a3e41581-da73-4ef7-8b48-0cdc7048d485" alt="Login Page">

**Video Call**
<img src="https://github.com/KishorBalgi/Peer-to-Peer-Video-Communication/assets/75678927/da03fd6d-dda1-4208-a23f-2ac553d60dc4" alt="Video Call">

<img src="https://github.com/KishorBalgi/Peer-to-Peer-Video-Communication/assets/75678927/75f1af97-2296-4881-ac5f-ed0cde897b17" alt="Chats">

<img src="https://github.com/KishorBalgi/Peer-to-Peer-Video-Communication/assets/75678927/2cfaeec4-001c-4cf9-9192-a83e547da10f" alt="Participants">

#### Key Features

- **Multi-User Video Calling:** Engage in video calls with multiple participants simultaneously.

- **Real-Time Messaging:** Stay connected during calls with in-call real-time messaging, enhancing the overall user experience.

#### Architecture

- **Signalling Server:** The client utilizes a Socket.io-powered signalling server to facilitate call initiation and in-call messaging.

- **Data Persistence:** All user and call records are securely stored in PostgreSQL, managed by the Prisma ORM.

#### Project Goal

This project serves as an exploration of WebRTC technology, pushing the boundaries of real-time communication. While it's an experiment, the application provides a functional environment for multi-user video calling with added real-time messaging.

### Built With

#### Front-End:

[![Next][Next.js]][Next-url]
[![Redux][Redux]][Redux-url]
[![WebRTC][webrtc]][webrtc-url]
[![Tailwind][tailwind]][tailwind-url]

#### Back-End:

[![TypeScript][TS]][TS-url]
[![Express][Express]][Express-url]
[![Socket.io][Socket]][Socket-url]
[![PostgreSQL][Postgre]][Postgre-url]
[![Prisma ORM][prisma]][prisma-url]

<!-- GETTING STARTED -->

## Installation

1. - Fork the [repo](https://github.com/KishorBalgi/Peer-to-Peer-Video-Communication)
   - Clone the repo to your local system

   ```git
   git clone https://github.com/KishorBalgi/Peer-to-Peer-Video-Communication peer-to-peer-video-communication
   cd peer-to-peer-video-communication
   ```

2. - Front End:
     Install all the dependencies

   ```bash
   cd client/
   npm install # This will install all the required dependencies for the front-end
   ```

   - Front End Enivronment Configurations:
     create a .env file in the root directory and add the following env variables

   ```text
    NEXT_PUBLIC_API_URL = "Server URL"
    NEXT_PUBLIC_SOCKET_URL = "Server URL"
   ```

   - Run Front End:

   ```bash
    npm run dev # For Development purposes
    npm start
   ```

3. - Back End:
     Install all the dependencies

   ```bash
   cd backend/
   npm install # This will install all the required dependencies for the back-end
   ```

   - Backend End Enivronment Configurations:
     create a .env file in the backend directory and add the following env variables

   ```text
    PORT=8080
    NODE_ENV=development
    DATABASE_URL="Create a postgreSQL DB and add the DB URL"
    JWT_SECRET="Random 32 char string"
   ```

   - Run Back End:

   ```bash
   npm run dev # For Development with nodemon
   npm start # Without nodemon
   ```

    <!-- Demonstration -->

## Demonstration

https://github.com/KishorBalgi/Peer-to-Peer-Video-Communication/assets/75678927/4fcf54da-0bb0-4dbf-b5b0-bbc7552f25fc

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

<!-- LICENSE -->

## License

Distributed under the GNU License. See [`LICENSE`](https://github.com/KishorBalgi/Peer-to-Peer-Video-Communication/blob/main/LICENSE) for more information.

<!-- CONTACT -->

## Contact

[![Linkedin][lnk]][lnk-url]
[![Twitter][twitter]][twitter-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Redux]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[Redux-url]: https://redux.js.org/
[TS]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TS-url]: https://www.typescriptlang.org/
[webrtc]: https://img.shields.io/badge/webRTC-000000?style=for-the-badge&logo=webrtc&logoColor=white
[webrtc-url]: https://webrtc.org/
[Express]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[Socket]: https://img.shields.io/badge/socket.io-000000?style=for-the-badge&logo=socketdotio&logoColor=white
[Socket-url]: https://socket.io/
[Postgre]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[Postgre-url]: https://www.postgresql.org/
[prisma]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[prisma-url]: https://www.prisma.io/
[tailwind]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[tailwind-url]: https://tailwindcss.com/
[lnk]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
[lnk-url]: https://www.linkedin.com/in/kishorbalgi/
[twitter]: https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white
[twitter-url]: https://twitter.com/KishorBalgi
