import Login from '../views/Login.js' 
import Expense from '../views/Expense.js' 

const navigate = url =>{
    history.pushState( null,null,url);
    router(true)
} 

const router = async(allow) =>{
    const routes = [
        {path : '/', view : Login},
        {path : '/Expenses', view : Expense}
    ]

    const routeDetails = routes.map( route =>{

        if(!allow){
            return{
                path : '/', view : Login
            }
        }
        return {
            route : route,
            isMatch : location.pathname === route.path
        }
    })

    let match = routeDetails.find( route => route.isMatch)

    if(!match){
        match = {
            route : routes[0],
            isMatch : true
        }
    }


    const view = new match.route.view() 

    document.querySelector("#app").innerHTML = await view.getHtml()
    if(view.handle){
        view.handle()
    }

}

window.addEventListener("popstate",router)
document.addEventListener('DOMContentLoaded',()=>{
    document.body.addEventListener('click',(e)=>{
        if(e.target.matches("[data-link]")){
        e.preventDefault()
        navigate(e.target.href)
    }
    })
    router(false)
})