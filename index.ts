import readline from "node:readline";
import fs from "fs";

const filePath = "tasks.json";
const currentDate: Date = new Date();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
type Task = {
  id: number;
  description: string;
  status: "Progress" | "Done";
  createdAt: Date;
  updatedAt: Date;
};

function add(arg: string[]): number {
  try {
    let len = 1;
    if (fs.existsSync(filePath)) {
      const temp = fs.readFileSync(filePath, "utf-8");
      const task = JSON.parse(temp) as Task[];
      task.push({
        id: task.length + 1,
        description: arg.join(" "),
        status: "Progress",
        createdAt: currentDate,
        updatedAt: currentDate,
      });
      const tasks = JSON.stringify(task, null, 2);
      fs.writeFileSync(filePath, tasks);
      len = task.length;
    } else {
      const task: Task = {
        id: 1,
        description: arg.join(" "),
        status: "Progress",
        createdAt: currentDate,
        updatedAt: currentDate,
      };
      const tasks = JSON.stringify([task], null, 2);
      fs.writeFileSync(filePath, tasks);
    }
    return len;
  } catch (e) {
    console.error(e);

    return 0;
  }
}

function update(arg: string[]): void {
  if (arg.length < 2) {
    console.error("Some parameteres missing");
    return;
  }
  try {
    if (fs.existsSync(filePath)) {
      const temp = fs.readFileSync(filePath, "utf-8");
      const task: Task[] = JSON.parse(temp) as Task[];

      if (
        parseInt(arg[0]) > task.length ||
        isNaN(parseInt(arg[0])) ||
        parseInt(arg[0]) === 0 
      ) {
        console.error("incorrect ID passed");
        return;
      }
      const id = parseInt(arg[0]) - 1;
      const changeDesc = arg.slice(1);
      task[id].description = changeDesc.join(" ");
      
      const tasks = JSON.stringify(task, null, 2);
      fs.writeFileSync(filePath, tasks);
    } else {
      console.log("Task file don't exist");
      return;
    }
  } catch (e) {
    console.error(e);
  }
  return;
}
function deleteTask(arg: string[]): void {

  if (arg.length > 1) {
    console.error("Please only provide ID");
    return;
  }
  try {
    if (fs.existsSync(filePath)) {
      const temp = fs.readFileSync(filePath, "utf-8");
      const task: Task[] = JSON.parse(temp) as Task[];

      if (
        typeof parseInt(arg[0]) !== "number" ||
        isNaN(parseInt(arg[0])) ||
        parseInt(arg[0]) === 0
      ) {
        console.error("incorrect ID passed");
        return;
      }
      const id = parseInt(arg[0]) ;
      const changeDesc = task.filter((t)=> t.id !== id)
      
      const tasks = JSON.stringify(changeDesc, null, 2);
      
      fs.writeFileSync(filePath, tasks);
    } else {
      console.log("Task file don't exist");
      return;
    }
  } catch (e) {
    console.error(e);
  }
  return;
}


function cmdline() {
  rl.question("task-cli ", (cmds) => {
    const [cmd, ...arg] = cmds.split(" ");
    switch (cmd) {
      case "add":
        let id = add(arg);
        if (id !== 0) {
          console.log(`Task added successfully (ID: ${id})`);
        }
        cmdline();
        break;
      case "update":
        update(arg);
        cmdline();
        break;
    case "delete":
        deleteTask(arg);
        cmdline();
        break;
      case "mark-in-progress":
        break;
      case "mark-done":
        break;
      case "list":
        break;
      case "exit":
        rl.close();
        break;
      case "close":
        rl.close();

        break;

      default:
        console.error(`${cmd} not found`);
        cmdline();
        break;
    }
  });
}
cmdline();
