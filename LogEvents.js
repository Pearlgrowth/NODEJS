const fsPromise = require("fs").promises;
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");
 
const LogEvents = async (message) => {
  const fs = require("fs").promises;
 
  const Logs = "./Logs";
  fs.stat(Logs).catch(async (err) => {
    if (err.message.includes("no such file or directory")) {
      await fs.mkdir(Logs);
    }
  });
  createFile(message)
};
 
 
const createFile = async (message) => {
  try {
    const id= uuid.v4();
    const date= new Date();
    const logItem = `${id}\t ${date}\t ${message}\n\n`
 
 
    const data = await fsPromise.appendFile(
      path.join(__dirname, "Logs", "eventsLogs.txt"),
        logItem
    );
   
  } catch (err) {
    console.log(err);
  }
};
 
module.exports = LogEvents;
 
 