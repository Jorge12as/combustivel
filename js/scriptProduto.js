class Combustivel{
    
    constructor (){
        this.id = 1;
        this.arrayCombustivel = [];
        this.editId = null;
        this.td_precoCombustivel;
        this.vlrApagar=0;
        this.cont ='calc';
    }   
    
    vResultado(){
        this.transicaoTelas();
    }
    btn() {    
        this.cancelar();
        this.transicaoTelas();
    }     

    calcularKm(){
        if(this.cont != 'calc'){
            this.calculaCombustivel();
            this.transicaoTelas();
            this.cont='calc';
        } else{           
        alert('Insira os dados novamente para um novo calculo.');}
    }

    inserirDados(){
        let km = this.lerDados();

        if(this.validaCampos(km)){
            if(this.editId == null){
                this.adicionar(km);
                this.adicionarNaTabela();  
                this.cancelar();                                  
            }else{
                this.cont='atualizar';
                this.atualizar(this.editId,km);
                this.adicionarNaTabela();
                this.calculaCombustivel();               
            }
        }                
    } 
  
    adicionarNaTabela(){
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';
        
        for(let i = 0; i < this.arrayCombustivel.length; i++){
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_kmInicial = tr.insertCell();
            let td_kmFinal = tr.insertCell();
            let td_data = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayCombustivel[i].id
            td_kmInicial.innerText = this.arrayCombustivel[i].td_kmInicial
            td_kmFinal.innerText = this.arrayCombustivel[i].td_kmFinal
            td_data.innerText = this.arrayCombustivel[i].data          
                        
            td_id.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.src='img/edit.svg';
            td_acoes.appendChild(imgEdit);
            imgEdit.setAttribute("onclick","combustivel.preparaEdicao("
            +JSON.stringify(this.arrayCombustivel[i])+")");

            let imgDelete = document.createElement('img');
            imgDelete.src='img/delete.svg';
            imgDelete.setAttribute("onclick","combustivel.deletar("
            +this.arrayCombustivel[i].id+")");

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);

            // console.log(this.arrayCombustivel);

        }
    }
    transicaoTelas() {
        const resultContainer= document.querySelector("#result-container");
        const card= document.querySelector("#card");
        resultContainer.classList.toggle("hide");
        card.classList.toggle("hide");
    } 
    adicionar(km){
        this.arrayCombustivel.push(km);
        this.id++; 
        this.cont='novo';           
    }

    
    calculaCombustivel(){//Realiza o calculo do km dos dados da tabela
        let km = []
        let totalKmRodados =0;       
        const kmPorLitro = 30;      
        
        const kmRodados = document.querySelector("#km-rodados span");
        const ltsConsumido = document.querySelector("#lts-consumido span");
        const precoCombust = document.querySelector("#preco-combust span");
        const vlrReceber = document.querySelector("#vlr-receber span");        

        km.t_ltsConsumido = "";          
        kmRodados.innerText ="";
        ltsConsumido.innerText = "";
        precoCombust.innerText = "";
        vlrReceber.innerText = ""; 
        this.vlrApagar=0;
        for(let i = 0; i < this.arrayCombustivel.length; i++){
            km.push(totalKmRodados += 
            this.arrayCombustivel[i].td_kmFinal - this.arrayCombustivel[i].td_kmInicial);
        }
        km.t_ltsConsumido = totalKmRodados / kmPorLitro;
        this.vlrApagar += km.t_ltsConsumido * this.td_precoCombustivel;  
        kmRodados.innerText = totalKmRodados;
        ltsConsumido.innerText = km.t_ltsConsumido.toFixed(2);
        precoCombust.innerText = this.td_precoCombustivel.toFixed(2);
        vlrReceber.innerText = this.vlrApagar.toFixed(2);      
    }
        
    atualizar(id, km){                
        for(let i = 0; i < this.arrayCombustivel.length; i++){
            if(this.arrayCombustivel[i].id == id){
                this.arrayCombustivel[i].td_kmInicial = km.td_kmInicial;
                this.arrayCombustivel[i].td_kmFinal = km.td_kmFinal;
                this.arrayCombustivel[i].data = km.data;
            }            
        }
        document.getElementById('btn1').style='color:white'
    }

    lerDados(){
        let km = {}
        km.id = this.id;
        km.td_kmInicial = document.getElementById('kmInicio').value;
        km.td_kmFinal = document.getElementById('kmFinal').value;
        this.td_precoCombustivel = parseFloat(document.getElementById('precoCombustivel').value);
        km.data = document.getElementById('date').value;     
        return km;
    }

    lkmInicialValid(){
        document.querySelector('#lkmInicio').innerText=""
    }
    lKmFimValid(){
        document.querySelector('#lKmFim').innerText=""
    }
    lPrecoValid(){
        document.querySelector('#lPrecoComb').innerText=""
    }
    lDataValid(){
        document.querySelector('#ldata').innerText=""
    }
    validaCampos(km){
         let msg = '';

        if(km.td_kmInicial ==''){
            const t =document.querySelector('#lkmInicio').innerText="* Campo obrigatorio"
            msg += 'Informe a quilometragem inicial \n';              
        }
        if(km.td_kmFinal == ''){
            msg += 'Informe a quilometragem final \n';
            const t = document.querySelector('#lKmFim').innerText="* Campo obrigatorio"
        }
        if(isNaN =!this.td_precoCombustivel){
            // msg += 'Informe o preço do combustivel \n';
           const t= document.querySelector('#lPrecoComb').innerText="* Campo obrigatorio"
        }
        if(km.td_data ==''){
            // msg += 'Informe a data \n';
            const t= document.querySelector('#ldata').innerText="* Campo obrigatorio"
                 
        }
        if(msg != ''){
            // alert(msg);
            return false;
        }
        return true;
    }
    cancelar(){
        document.getElementById('kmInicio').value ='';
        document.getElementById('kmFinal').value =''; 
        document.getElementById('date').value ='';          
        document.getElementById('btn1').innerText='Incluir';
        
        document.querySelector('#lkmInicio').value='';
        document.querySelector('#lKmFim').value='';
        document.querySelector('#lPrecoComb').value='';
        document.querySelector('#ldata').value='';
        
        this.editId = null;
    } 

    deletar(id){
        if(confirm(`Deseja realmente deletar o km do ID ${id} ?`)){
            let tbody = document.getElementById('tbody');

            for(let i = 0; i < this.arrayCombustivel.length; i++){
                if(this.arrayCombustivel[i].id == id){
                    this.arrayCombustivel.splice(i, 1);
                    tbody.deleteRow(i);   
                
                }
            }
            this.calculaCombustivel();
        }   
    }

    preparaEdicao(dados){
        this.editId = dados.id;
        document.getElementById('kmInicio').value = dados.td_kmInicial;
        document.getElementById('kmFinal').value = dados.td_kmFinal;
        document.getElementById('date').value =dados.data; 
        document.getElementById('btn1').innerText = 'Atualizar';
        document.getElementById('btn1').style='color:#98FB98'
    }    
   
}

var combustivel = new Combustivel();


