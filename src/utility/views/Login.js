class Login {
    async handle(){
        document.getElementById("do-login").addEventListener('click',()=>{
            let allow = true
            if(document.forms["login_form"]["username"].value == "" && document.forms["login_form"]["password"].value == ""){
                alert('Please enter username and password')
                allow = false
            }

            if(allow){
            let name = localStorage.getItem(document.forms["login_form"]["username"].value)

             if(!name){
                localStorage.setItem(document.forms["login_form"]["username"].value,document.forms["login_form"]["username"].value);
                localStorage.setItem(document.forms["login_form"]["username"].value+"-pwd",document.forms["login_form"]["password"].value);
                document.getElementById("do-login").href = "/Expenses"
             }
             else{
                if(document.forms["login_form"]["password"].value == localStorage.getItem(document.forms["login_form"]["username"].value+"-pwd")){
                  document.getElementById("do-login").href = "/Expenses"
                }
                else{
                  alert('Wrong password')
                }
              }

             }
        })
    }
  async getHtml(){
    return  (`
    <div class="login_app">
      <section class='login' id='login'>
      <div class='head'>
          <h1 class='company'>Expense Caluclator</h1>
      </div>
          <div class='form'>
        <form name="login_form">
          <input type="text" placeholder='Username' name="username" class='text' id='username' required><br>
          <input type="password" placeholder='Enter password' class='password' id='password'><br>
          <a  class='btn-login' id='do-login' data-link>Login</a>
          <a  class='forgot'>Forgot?</a>
        </form>
      </div>
    </section>
  </div>
    `)
    
  }
}

export default Login
