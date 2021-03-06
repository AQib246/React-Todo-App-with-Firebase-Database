import React from 'react';
import fire from "../Config/Fire";
import "./Style.css"

class TodoApp extends React.Component
{
    constructor(){
        super()
        
        this.state = {
            items : "",
            todoitems : [],
            isEditing: false
        }
      
    }


    handleChange = (val) => {
        this.setState({
            items: val
        }, console.log(val))

    }
    handleAdd = () => {
        var itemList = this.state.items.slice()
        if(this.state.items == "")
        {
            alert("Please enter some items.")
        }
        else
        {
            var iteminstance = this.state.todoitems;
            iteminstance.push(itemList)
            this.setState({
                todoitems : iteminstance,
                items: ""
            }, () => {
                this.writeinfirebase()
            })

        }
    }

         
    HandleDelete =(index) => {
        fire.database().ref("data").child(index).remove()
        var iteminstance = this.state.todoitems.slice();
        iteminstance.splice(index , 1)
        this.setState({
            todoitems: iteminstance,
            items:""
        })

    }

  
    writeinfirebase = () =>{
        fire.database().ref("data").set(this.state.todoitems)
    }

    readFromFirebase = () => { 
        fire.database().ref("data").on("value" , (snapshot) =>{
            this.setState({
                todoitems: snapshot.val()
            })
        })
    }
    componentDidMount(){
        this.readFromFirebase()
    }
        


    render(){
        return(
            <div className = "maindiv">
                <h1>Todo App</h1>
               
            <input type = "text" className = "textfleid" placeholder = "Enter Items..." value = {this.state.items} onChange = {(e) => {this.handleChange(e.target.value)} } />
            <input type = "button"  className = "btn" value = "Add" onClick = {() => {this.handleAdd()} } /> 
            <br/><br/>
        
     
           {this.state.todoitems.map((mapitem , index) => {
               return(
                   <div className = "List">
                   <p key = {index}>{mapitem}  <span>
                   
                       <input type = "button" className = "delbtn" id = {index} value = "Delete" onClick = {() => this.HandleDelete(index)}/>
                       </span> 
                       </p>
                       </div>
               )
           })}
           <br/>


          
            </div>
        )
    }
}
export default TodoApp