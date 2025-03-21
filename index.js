const FILE_PATH = "./data.json";
const simpleGit = require("simple-git");
const jsonfile = require("jsonfile");
const moment = require("moment");

// Change the working directory to where your local repository is located
const git = simpleGit("C:\\Users\\FlycanSoftware\\Downloads\\repo-pragyan");

const MAX_DATE = moment("2025-04-21"); // Set the maximum date to April 21, 2025

const makeCommit = (n) => {
  if (n === 0) {
    // Push changes to the remote repository
    git.push(["-u", "origin", "main"], (err, result) => {  // Correct push command
      if (err) {
        console.error("Error pushing to remote:", err);
      } else {
        console.log("Pushed changes to remote repository");
      }
    });
    return;
  }

  // Generate a random date between today and the maximum date (April 21, 2025)
  const randomDate = moment().add(Math.floor(Math.random() * 55), 'weeks').add(Math.floor(Math.random() * 7), 'days');

  // Ensure the generated date does not exceed the MAX_DATE
  const finalDate = randomDate.isAfter(MAX_DATE) ? MAX_DATE : randomDate;

  const DATE = finalDate.format(); // Format the date

  const data = {
    date: DATE,
  };
  console.log(DATE);

  jsonfile.writeFile(FILE_PATH, data, () => {
    git
      .add([FILE_PATH])
      .commit(DATE, { "--date": DATE })
      .push(["-u", "origin", "main"], (err, result) => {  // Correct push command
        if (err) {
          console.error("Error pushing to remote:", err);
        } else {
          console.log("Pushed changes to remote repository");
          makeCommit(--n);
        }
      });
  });
};

makeCommit(10000);
