const express =require("express");

const app =express();

const data =[
    {id:1,taskname:"code",desc:"create a landing page",status:"complete"},
    {id:2,taskname:"debug",desc:"create a landing page and debug",status:"incomplete"},
    {id:3,taskname:"api",desc:"create a backend api",status:"complete"},
    {id:4,taskname:"deploy",desc:"to deploy a page in web",status:"incomplete"},
    {id:5,taskname:"testing",desc:"testing the application",status:"complete"},
]

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Task management")
})
//get all the tasks

app.get("/tasks",(req,res)=>{
    res.json(data)
})


//for getting single task

app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = data.find((item)=>{
        return item.id===taskId
    });
  
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  });
  

  //to add the new tesk collection

app.post("/create",(req,res)=>{
    const newTask =req.body;
    newTask.id=data.length+1;
    data.push(newTask);

    res.json(newTask)
});

//to update a task,desc,status

app.put('/update/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = data.findIndex(t => t.id === taskId);
  
    if (taskIndex !== -1) {
      data[taskIndex] = { ...data[taskIndex], ...req.body };
      return res.json(data[taskIndex]);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  });


  //to delete a task

   app.delete("/delete/:id",(req,res)=>{

    const Id =req.params.id;
    const result = data.filter((item)=>item.id!==Id)
    res.json({message:"tasks deleted succesfully"})

  })
  
app.listen(4000,()=>{
    console.log("server is up and running")
})