// import Navbar from './component/Navbar'
// import Button from './component/Button'
// function App(){
//   return (
//   <>
//     <div>
//     <h1>My Task List</h1>
//     </div>
//   <Navbar></Navbar>
//   <Button></Button>w
  
//   </>
//   )
// }



// export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './Pages/About';
import Hooks from './component/Hooks';
import GetHelloWorld from './component/GetHelloWorld';
import GetByeWorld from './component/GetByeWorld';
import GetAllTasks from './component/GetAllTasks';
import CreateTask from './component/CreateTask' ;
import EditTask from './component/EditTask' 


function App() {
  return (
       <div>
    <BrowserRouter>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/edit/:id" element={<EditTask />} />
        </Routes>
<h1>My Hook Demo</h1>
<Hooks />


<h1>Get Hello World</h1>
<GetHelloWorld/>


<h1>Get Bye World</h1>
<GetByeWorld/>


<h1>Get All Tasks</h1>
<GetAllTasks/> 

<h1>Create Tasks</h1>
<CreateTask/>
    </BrowserRouter>
 


</div>
  
  
  );
}

export default App;