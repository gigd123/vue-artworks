<template>
  <div class="wrap" id="todolist">
      <h1>Todolist</h1>
      <div class="input-group">
          <input class="addtodo" type="text" placeholder="Something you need to do " v-model="newTodo" @keyup.enter="addTodo">
          <button id="addtodo-button" class="btn" @click="addTodo">Add</button>
      </div>
      <div class="active-status">
          <ul>
              <li><a href="#" :class="{'active-li' : visibility == 'all'}" @click="visibility = 'all'">All</a></li>
              <li><a href="#" :class="{'active-li' : visibility == 'active'}" @click="visibility = 'active'" >Active</a></li>
              <li><a href="#" :class="{'active-li' : visibility == 'completed'}" @click="visibility = 'completed'">Completed</a></li>
          </ul>
          <div class="clearfix"></div>
      </div>
      <ul>
          <li v-for="(item, key) in filterTodo" :key="key" @dblclick="editTodo(item)">
              <div class="list-group" v-if="item.id !== catchTodo.id">
                  <input type="checkbox" name="" :id="item.id" v-model="item.completed">
                  <label :class="{completed : item.completed}" :for="item.id"> {{item.title}} </label>
                  <button class="btn" @click="removeTodo(item)">Delete</button>
                  <button class="btn" @click="editTodo(item)">Edit</button>
              </div>
              <div class="edit-group" v-if="item.id === catchTodo.id">
                  <input class="edit-input" type="text" v-model="catchTitle" @keyup.esc="cancelTodo()" @keyup.enter="saveTodo(item)">
                  <button class="btn" @click="saveTodo(item)">Save</button><button class="btn" @click="cancelTodo()">Cancel</button>
              </div>
          </li>   
      </ul>
      <div class="footer">
          <div class="remind">Sill have <span> {{todoCount}} </span> case need to complete</div>
          <div class="delete-all"><button class="btn" @click="removeAll()">Delete all</button></div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      newTodo:'',
      todos:[],
      visibility:'all',
      catchTodo:{},
      catchTitle:'',
    }
  },
  methods:{
        addTodo : function(){
            var value = this.newTodo.trim();
            var newNumber = Math.floor(new Date());
            if(!value){
                return;
            }
            this.todos.push({
                id:newNumber,
                title:value,
                completed:false
            });
            this.newTodo ='';
        },
        removeTodo : function(todo){
            var newIndex = '';
            var vm = this;
            vm.todos.forEach(function(item, key){
                if(todo.id === item.id){
                    newIndex = key;
                }
            })
            this.todos.splice(newIndex,1);
        },
        editTodo : function(item){
            console.log(item);
           this.catchTodo = item;
           this.catchTitle = item.title;
        },
        cancelTodo : function(){
            this.catchTodo = {};
        },
        saveTodo : function(item){
            item.title = this.catchTitle;
            this.catchTitle = '';
            this.catchTodo = {};
        },
        removeAll : function(){
            this.todos = [];
        }
    },
    computed:{
        filterTodo: function () {
          if(this.visibility == 'all') {
            return this.todos;
          }else if(this.visibility == 'active'){
              var newTodos = [];
              this.todos.forEach(function(item){
                  if(!item.completed){
                      newTodos.push(item);
                  }
              })
              return newTodos;
          } else if(this.visibility == 'completed'){
              const newTodos = [];
              this.todos.forEach(function(item){
                  if(item.completed){
                      newTodos.push(item);
                  }
              })
              return newTodos;
          }
          return newTodos;
        },
        todoCount : function(){
            var todoAmount = [];
            this.todos.forEach(function(item){
                if(!item.completed){
                    todoAmount.push(item);
                }
            })
            return todoAmount.length;
        }
    }
}
</script>

<style lang="scss">
@import "../styles/all.scss";
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
    line-height: 1;
    // background-image: url('../img/images.jpeg');
    background-size: cover;
    font-family: Microsoft JhengHei;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a{
    text-decoration: none;
}
*{
    box-sizing: border-box;
}
/* pattern */
.btn{
    border: none;
    cursor: pointer;
    font-size: 20px;
}
.clearfix{
    clear: both;
}
/* start */
.wrap{
    max-width: 800px;
    margin: 100px auto;
    background-color: rgb(255, 255, 255);
    box-shadow: 3px 3px 10px grey;
    border-radius: 15px;
    overflow: hidden;
    padding-bottom: 30px;
}
h1{
    text-align: center;
    letter-spacing: 1px;
    height: 80px;
    font-size: 32px;
    line-height: 80px;
    background-color: rgb(110, 110, 110);
    color: rgb(255, 255, 255);
}
.input-group{
    display: flex;
    flex-wrap: wrap;
}
.addtodo{
    width: calc(100% - 100px);
    padding: 8px 20px;
    font-size: 24px;
}
#addtodo-button{
    width: 100px;
    font-size: 24px;
    background-color: rgb(167, 167, 167);
    color: white;
    transition: all 0.5s;
}
#addtodo-button:hover{
    background-color: rgb(110, 110, 110);
}
.active-status ul li{
    float: left;
    width: 33.3333%;
}
.active-status ul li a{
    display: block;
    color: rgb(102, 102, 102);
    text-align: center;
    font-size: 24px;
    height: 50px;
    line-height: 50px;
    transition: all 0.5s;
}
.active-status ul li a:hover{
    color: white;
    background-color: rgb(110, 110, 110);
}
.active-li{
    display: block;
}
.completed{
    text-decoration: line-through;
}
.list-group{
    color: rgb(102, 102, 102);
    padding: 8px 15px;
    font-size: 24px;
    border-bottom: 2px;
    border-color: grey;
}
.list-group button{
    float: right;
    background-color: #fff;
    color: rgb(161, 0, 0);
    transition: 0.5s;
}
.list-group button:hover{
    color: rgb(228, 28, 28);
    text-shadow: 0px 0px 15px red;
}
.edit-group{
    padding: 0 15px;
}
.edit-input{
    width: calc(100% - 180px);
    padding: 8px 20px;
    font-size: 20px;
    color: rgb(102, 102, 102);
}
.edit-group button{
    width: 80px;
    border: none;
    padding: 5px 8px;
    margin: 0 2px;
    color: white;
    background-color: rgb(167, 167, 167);
    transition:  all 0.5s;
}
.edit-group button:hover{
    background-color: rgb(110, 110, 110);
}
.footer{
    color: rgb(102, 102, 102);
    padding: 8px 15px;
}
.remind{
    float: left;
}
.remind span{
    color: rgb(161, 0, 0);
}
.delete-all{
    float: right;
}
.delete-all button{
    background-color: #fff;
    color: rgb(161, 0, 0);;
    transition: all 0.5s;
}
.delete-all button:hover{
    color: rgb(228, 28, 28);
    text-shadow: 0px 0px 15px red;
}

</style>
