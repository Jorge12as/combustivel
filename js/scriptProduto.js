class Combustivel{ //Classe principal Combustivel
    
    constructor (){ //Construtor da classe 
        this.id = 1;
        this.arrayCombustivel = [];
        this.editId = null;
        this.td_precoCombustivel;
        this.vlrApagar=0;
        this.cont ='calc';          
    }   
    
    vResultado(){ //botão para ir para a tela de resultado
        this.transicaoTelas();
    }

    btn() { // botao p/ sair da tela de resultado 
        this.cancelar();
        this.transicaoTelas();
    }     

    calcularKm(){ //Metodo para calcular os km 
        if(this.cont != 'calc'){
            this.calculaCombustivel();
            this.transicaoTelas();
            this.cont='calc';
        }else{
            Swal.fire({ //Método resposavel pro exibir um modal personalizado..
                position: 'top-end',
                titleText: "Informe os dodas, para realizar o cálculo",                       
            });
        }
    }

    inserirDados(){ //Metodo para incluir os registro na tabela
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
                this.cancelar();           
            }
        }                
    } 
  
    adicionarNaTabela(){ //Incluir os registro na tabela
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
            td_data.innerText = this.arrayCombustivel[i].td_data          
                        
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

        }
    }
    transicaoTelas() { //realiza a transição das telas
        const resultContainer= document.querySelector("#result-container");
        const card= document.querySelector("#card");
        resultContainer.classList.toggle("hide");
        card.classList.toggle("hide");
    } 

    adicionar(km){ //Adiciona um registro no array
        this.arrayCombustivel.push(km);
        this.id++; 
        this.cont='novo';           
    }

    calculaCombustivel(){//Realiza o calculo do km dos dados da tabela
        let km = []
        let totalKmRodados =0;       
        const kmPorLitro = 30;      
        //Seleciona os elementos span que ira receber o resultado do calculo
        const kmRodados = document.querySelector("#km-rodados span");
        const ltsConsumido = document.querySelector("#lts-consumido span");
        const precoCombust = document.querySelector("#preco-combust span");
        const vlrReceber = document.querySelector("#vlr-receber span");        
        //Limpa os elementos para receberem os resultados do calculo
        km.t_ltsConsumido = "";          
        kmRodados.innerText ="";
        ltsConsumido.innerText = "";
        precoCombust.innerText = "";
        vlrReceber.innerText = ""; 
        this.vlrApagar=0;
        
        for(let i = 0; i < this.arrayCombustivel.length; i++){
            km.push(totalKmRodados +=  //Realiza o calculo do Km rodado
            this.arrayCombustivel[i].td_kmFinal - this.arrayCombustivel[i].td_kmInicial);
        }
        //Realiza os demais calculos e alimenta os elementos span com o resultado..
        km.t_ltsConsumido = totalKmRodados / kmPorLitro;
        this.vlrApagar += km.t_ltsConsumido * this.td_precoCombustivel;  
        kmRodados.innerText = totalKmRodados;
        ltsConsumido.innerText = km.t_ltsConsumido.toFixed(2);
        precoCombust.innerText = this.td_precoCombustivel.toFixed(2);
        vlrReceber.innerText = this.vlrApagar.toFixed(2);      
    }
        
    atualizar(id, km){ //Atualiza o registro no array, com base no seu id          
        for(let i = 0; i < this.arrayCombustivel.length; i++){
            if(this.arrayCombustivel[i].id == id){
                this.arrayCombustivel[i].td_kmInicial = km.td_kmInicial;
                this.arrayCombustivel[i].td_kmFinal = km.td_kmFinal;
                this.arrayCombustivel[i].td_data = km.td_data;
            }            
        }
        document.getElementById('btn1').style='color:white'
    }

    lerDados(){ //Ler os dados vindo da tela
        let km = {}        
        km.id = this.id;
        km.td_kmInicial = document.getElementById('kmInicio').value;
        km.td_kmFinal = document.getElementById('kmFinal').value;
        this.td_precoCombustivel = parseFloat(document.getElementById('precoCombustivel').value);
        km.td_data =document.getElementById('date').value;     
        return km;
    }

    lkmInicialValid(){ //Limpa os elementos label
        document.querySelector('#lkmInicio').innerText=""
    }
    lKmFimValid(){
        document.querySelector('#lKmFim').innerText=""
    }
    lPrecoValid(){ //Limpa os elementos label
        document.querySelector('#lPrecoComb').innerText=""
    }
    lDataValid(){
        document.querySelector('#ldata').innerText=""
    }
  
    validaCampos(km){ //Valida os campos de entrada
        let msg = true;

        if(km.td_kmInicial ==''){
            msg=false;
            document.querySelector('#lkmInicio').innerText="* Campo obrigatorio"             
        }
        if(km.td_kmFinal == ''){
            msg=false;            
            document.querySelector('#lKmFim').innerText="* Campo obrigatorio"
        }
        if(isNaN =!this.td_precoCombustivel){
            msg=false;
           document.querySelector('#lPrecoComb').innerText="* Campo obrigatorio"
        }
        if(km.td_data ==''){
            msg=false;
            document.querySelector('#ldata').innerText="* Campo obrigatorio"             
        }
        if(!msg){           
            return false;
        }
        return true;
    }

    cancelar(){ //cancela operação e limpa os elementos da tela
        document.getElementById('kmInicio').value ='';
        document.getElementById('kmFinal').value =''; 
        document.getElementById('date').value ='';          
        document.getElementById('btn1').innerText='Incluir';
        this.lkmInicialValid();
        this.lKmFimValid();
        this.lPrecoValid();
        this.lDataValid();
        this.editId = null;
    } 

    deletar(id){ //Remove um registro do array.
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

    preparaEdicao(dados){ //Prepara os dados pra ediçao na tela
        this.editId = dados.id;
        document.getElementById('kmInicio').value = dados.td_kmInicial;
        document.getElementById('kmFinal').value = dados.td_kmFinal;
        document.getElementById('date').value =dados.td_data; 
        document.getElementById('btn1').innerText = 'Atualizar';
        document.getElementById('btn1').style='color:#98FB98'
    }    
   
}

var combustivel = new Combustivel(); //instacia um objeto do tipo Combustivel


