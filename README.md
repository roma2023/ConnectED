# ConnectED: Connecting Minds. Transforming Lives. 

## Overview
Our innovation is a mobile app designed to leverage existing smartphones and infrastructure to deliver educational content via radio broadcasts. By accessing local radio frequencies through phone hardware, the app ensures users can receive lessons without requiring an internet connection. This innovative approach encodes educational data (e.g., images, basic videos, and other custom content) over FM radio streams, enabling students to engage in literacy, numeracy, and essential skills in real-time. The backend system, which powers content conversion, scheduling, and broadcasting, can be found in its own repository: [ConnectED Backend Repository](<https://github.com/roma2023/connected-backend>).

### Key Features
- **Radio Broadcasts for Education**: Content is delivered via FM radio, ensuring accessibility in areas with limited infrastructure.
- **Offline and Online Modes**: Includes preloaded offline content and the option to fetch additional content when internet access is available.
- **Community Engagement**: Collaborates with local NGOs and community leaders to manage radio stations and ensure relevant content.
- **Low-Power Device Support**: Compatible with basic hardware such as solar-powered or low-powered devices.
- **Open Source**: Encourages contributions and improvements to sustain and scale the system.

### Benefits
- Provides quality education to children in remote or underserved areas.
- Reduces barriers such as travel distances and household responsibilities, particularly supporting girls' education.
- Promotes local relevance and community-driven content development.
- Breaks cycles of poverty by building foundational skills for career opportunities.

---

## Installation and Usage

### Prerequisites for Frontend
- **Node.js** (version 14+ recommended) installed on your system.
- A compatible smartphone or device capable of accessing FM radio frequencies.

### Steps to Run the Frontend

1. **Clone the Repository**  
   - Run the following command in your terminal:  
     ```bash
     git clone <repository-url>
     ```

2. **Navigate to the Project Directory**  
   - Change your working directory to the project folder:  
     ```bash
     cd <project-folder-name>
     ```

3. **Install Dependencies**  
   - Install the required packages:  
     ```bash
     npm install --force
     ```

4. **Start the App**  
   - Start the development server:  
     ```bash
     npm start
     ```

5. **Access the App**  
   - Open a web browser and navigate to:  
     ```
     http://localhost:5173
     ```
   - Follow on-screen instructions to tune into FM radio frequencies and access educational content.

---

### Testing

1. **Run Unit Tests**  
   - Run the following command in your terminal:  
     ```bash
     npm test
     ```
---

### Prerequisites for Mock radio station
- **Node.js** (version 14+ recommended) installed on your system.
- A compatible smartphone or device capable of accessing FM radio frequencies.

### Steps to Run the Mock radio station

1. **Clone the Repository**  
   - Run the following command in your terminal:  
     ```bash
     git clone <repository-url>
     ```
2. **Navigate to the Project Directory**  
   - Change your working directory to the project folder:  
     ```bash
     cd <project-folder-name>/mockstation
     ```

3. **Install Dependencies**  
   - Install the required packages:  
     ```bash
     pip install -r requirements.txt
     ```

4. **Start the App**  
   - Start the development server:  
     ```bash
     python3 streamer.py
     ```

## Contribution

This project is open source, and contributions are welcome! To contribute:

1. **Fork the Repository**  
   - Fork the repository to your GitHub account.

2. **Create a Feature Branch**  
   - Create a new branch for your changes:  
     ```bash
     git checkout -b feature-name
     ```

3. **Make Your Changes**  
   - Edit the code and commit your changes:  
     ```bash
     git commit -m "Description of changes"
     ```

4. **Push to Your Fork**  
   - Push your changes to your forked repository:  
     ```bash
     git push origin feature-name
     ```

5. **Submit a Pull Request**  
   - Open a pull request to the original repository and describe your changes.

---

## Acknowledgements  

OpenAI's ChatGPT was utilized for providing assistance with documentation, project guidance, and programming assistance. 

---

## MART Innovation - ED7 (Team Members)
- **Talhah Peerbhai** ([talhah@cmu.edu](mailto:talhah@cmu.edu))  
- **Abdallah Abdaljalil** ([aabdalja@andrew.cmu.edu](mailto:aabdalja@andrew.cmu.edu))  
- **Maria Mina** ([mmina@andrew.cmu.edu](mailto:mmina@andrew.cmu.edu))  
- **Raman Saparkhan** ([rsaparkh@andrew.cmu.edu](mailto:rsaparkh@andrew.cmu.edu))

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

