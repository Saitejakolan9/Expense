class Expenses{

    bal = 0
    Loans_EMIs = 0
    Household_bills = 0
    Food = 0
    Travelling = 0
    Education = 0
    Shopping = 0 
    Others = 0
    chart = null
    chararr = []

    options = ['Loans/EMIs','Household bills','Food','Travelling','Education','Shopping','Others']
    async handle(){
       let select = document.getElementById('category')
       for(let i = 0; i < this.options.length; i++)
       {
           var option = document.createElement("OPTION"),
               txt = document.createTextNode(this.options[i]);
           option.appendChild(txt);
           option.setAttribute("value",this.options[i]);
           select.insertBefore(option,select.lastChild);
       }

       document.getElementById("btn-expense").addEventListener('click',()=>{
        if(document.getElementById("exp").value != "" && Number(document.getElementById("exp").value > 0)){ 
            this.bal = Number(this.bal) + Number(document.getElementById("exp").value)
            let balance = document.getElementById('bal')
            balance.innerHTML = "$"+this.bal 
            if(this.chararr.length == 0){
                this.chararr.push({y: Number(document.getElementById('exp').value), name : document.getElementById('category').value})
            }
            else{
                for(let i =0 ; i < this.chararr.length ; i++){
                    if(this.chararr[i].name == document.getElementById('category').value){
                        this.chararr[i].y = Number(document.getElementById('exp').value) + this.chararr[i].y
                        break;
                    }
                    else if( i == this.chararr.length-1 ){
                        this.chararr.push({y: Number(document.getElementById('exp').value), name : document.getElementById('category').value})
                        break;
                    }
                }
            }
            this.updateChart(this.chararr)
            this.updateTable(this.chararr)

        }
        else{
            alert('Please enter valid amount')
        }
       })

    }


    updateTable(actualdata){
        actualdata.map(item =>{
            if(!document.getElementById(item.name)){
               let  ele = document.createElement("div")
               let  span_bal = document.createElement("span")
               let  span = document.createElement("span")
               let  dollar = document.createElement("span")
               let  hr = document.createElement("hr")
               let  elep = document.getElementById("detail-expesne")
               elep.style.transition = "2s"
               elep.style.display  = 'block'
               hr.style.padding  = "0px"
               hr.style.margin  = '0px'

               ele.id =item.name
               span_bal.id=item.name+"_span_bal"
               span_bal.innerHTML=item.y
               dollar.innerHTML="$"
               span.id=item.name+"_span"

               span.innerHTML=item.name
               ele.appendChild(dollar)
               ele.appendChild(span_bal)
               ele.appendChild(span)
               ele.appendChild(hr)
                elep.appendChild(ele)

            }
            else if(item.name == document.getElementById("category").value){
                let num = Number(document.getElementById(item.name+"_span_bal").innerHTML)
                document.getElementById(item.name+"_span_bal").innerHTML =  num + Number(document.getElementById("exp").value)
            }

            document.getElementById(item.name).classList.add('custom');
        })

        

        
    }

    updateChart(actualdata){
        if(this.bal > 0)
        {
         var chart = new CanvasJS.Chart("chartContainer", {
         theme: "dark1",
         exportFileName: "Doughnut Chart",
         exportEnabled: true,
         animationEnabled: true,
         title:{
             text: "Daily Expense"
         },
         legend:{
             cursor: "pointer"
         },
         data: [{
             type: "doughnut",
             innerRadius: 90,
             showInLegend: true,
             toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
             indexLabel: "{name} ( #percent%)",
             dataPoints : actualdata
         }]
     });
     chart.render();
     }
    }
    async getHtml(){
        return  (`
        <div class="expense">
            <div class="nav">
                <span class="title">Expenditure</span>
                <input type="number" class="exp" id="exp"></input>
                <br/>
                <span class="title">Category</span>
                <select class="category" id="category"></select>
                <br/>
                <button id="btn-expense" class="btn-expense">Add Expense</button>
            </div>
            <div class="w3-animate-zoom" id="balance">
                <h5>Total Exepenses</h5>
                <h1 id="bal">$${this.bal}</h1>
            </div>
            <hr/>
            <div  id="detail-expesne"></div>
            <div  id="test"></div>
        </div>
        <div id="chartContainer">
        </div>
        `)

}
}

export default Expenses