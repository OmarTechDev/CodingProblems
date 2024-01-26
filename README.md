# Mars Rovers Challenge

## Problem Description

A squad of robotic rovers is set to explore the Martian plateau, capturing the terrain with their on-board cameras. The plateau is represented as a rectangular grid to simplify navigation, and each rover is assigned a unique position and location.

A rover's position is described by its x and y coordinates, along with a letter indicating one of the four cardinal compass points (N for North, S for South, E for East, and W for West). For example, a rover's position might be denoted as 0, 0, N, indicating it's at the bottom-left corner facing North.

NASA controls the rovers by sending a series of simple commands in the form of a string of letters. The commands include 'L' (spin 90 degrees left), 'R' (spin 90 degrees right), and 'M' (move forward one grid point in the current direction).

**Assumptions:**
- The grid wraps around, so moving North from (x, y) results in the position (x, y+1).
- The plateau's grid is defined by its width and height.
- The rover's initial position and the plateau's dimensions are provided.

## Implementation

The solution includes a graphical user interface (GUI) developed using Vite, React, and TypeScript (Tsx). The GUI allows users to visualize the movement and exploration of rovers on the Martian plateau. Each rover's path and final position are displayed on the grid, providing an interactive and informative experience.

**Technologies Used:**
- Vite: A fast development server and build tool for modern web development.
- React: A JavaScript library for building user interfaces.
- TypeScript (Tsx): A typed superset of JavaScript that adds static types.

## How to Run

1. Ensure you have Node.js installed on your machine.
2. Clone the repository: `git clone <repository_url>`
3. Navigate to the project directory: `cd roversGame`
4. Install dependencies: `npm install`
5. Run the development server: `npm run dev`
6. Open your browser and visit [http://localhost:5173](http://localhost:5173) to interact with the Mars Rovers GUI.

Feel free to explore the plateau, send commands to the rovers, and witness their exploration journey on the Red Planet!

![Home](https://github.com/OmarTechDev/CodingProblems/blob/main/Pictures/Screenshot%202024-01-05%20121701.png)
![Command Line](https://github.com/OmarTechDev/CodingProblems/blob/main/Pictures/Screenshot%202024-01-05%20121711.png)

It's not enougth see the direct command page in 'Many'. Remember press enter or introduce another line to see the result

![Many](https://github.com/OmarTechDev/CodingProblems/blob/main/Pictures/Screenshot%202024-01-05%20121609.png)

<h3 align="left">Connect with me:</h3>

<p align="left">
    <a href="https://www.linkedin.com/in/omar-oporto-bernal-a1b000269/" target="blank">
        <img
            align="center"
            src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg"
            alt="omar oporto bernal"
            height="30"
            width="40"
        />
    </a>
</p>
