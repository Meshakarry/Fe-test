<template>
       <div>
         <div :class="[ rad.isSelected ? 'red' : 'gray']"   @click="select(rad,index)" v-for="(rad,index) in lista" :key="index">  
         
         <div class="naziv"> {{rad.naziv}}</div>
         <div class="autor"> {{rad.autor}} </div>
         <div class="starost"> {{izracunajStarost(rad)}} </div>
         <br/>
          <!-- <div> {{sortZanrove()}} </div>  -->
         

          <div class="zanrovi" v-for="zanra in zanr" :key="zanra.id"> {{zanra}}</div>

          <br/>
         <button id="delete" class="btn btn-danger" @click="obrisi(rad.id)"> Obrisi  </button>

        
         
      
    </div>
      
         <div id="pomjeri">
        <button :disabled="more" @click="pomjeri(lista,selectedIndex,selectedIndex-1)"  class="btn btn-danger"> - </button>
        <button :disabled="more" @click="pomjeri(lista,selectedIndex,selectedIndex+1)" class="btn btn-success"> + </button>

     </div>
            
              
              
        </div>
</template>


<script> 
import _ from "lodash"
  
 
  export default {
     props:["lista","zanr"],
     
    data(){
    return{
          
         more:false,
         brojac:0,
         selectedIndex:null,

    }},
    mounted(){
        this.more=true;
    },
    methods:{

        izracunajStarost(rad){
                    var starost= new Date(new Date()  - new Date(rad.datum.datumIzdanja)).getFullYear() -1970;
                    return starost;
                    
            

            },
            
        obrisi(index){
                
                var filt=this.lista.filter(el=>el.id === index);
                
                this.lista=_.pullAll(this.lista,filt);
                console.log("Redak uspjesno izbrisan");
          },
          select(rad,index){
            
                 this.selectedIndex=index;
             rad.isSelected=!rad.isSelected;
             if(rad.isSelected){
                 this.brojac++;

             }
             else{
                 this.brojac--;
             }

                if(this.brojac>1 || this.brojac==0){
                    this.more=true;
                }
                else if(this.brojac== 1){
                    this.more=false;
                }
                     
              console.log(this.selectedIndex);


            
        },
        pomjeri(arr,old_index,new_index){

          while (old_index < 0) {
            old_index += arr.length;
        }
        while (new_index < 0) {
            new_index += arr.length;
        }
        while(new_index >=arr.length){
            new_index=0;

        }
        
        if (new_index >= arr.length) {
            var k = new_index - arr.length;
            while ((k--) + 1) {
                arr.push(undefined);
            }
            
        }
        
        
            arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);  
            return arr; 


        },
         brojPonavljanjaZanra(){
            
         }

    }
    
    

  }

</script>

<style scoped>
  
 #radovi{
  display:flex;
   flex-flow: row;
    flex-wrap: wrap;
     justify-content: space-between;
      margin:15px;
      padding:10px;
      align-items: baseline;
      border-bottom: 1px solid grey ;
      
 }
 

 .naziv{
     margin-right: 5px;
     font-size: 15px;
     /* border:1px solid black; */
 }
 .autor{
     margin-right: 5px;

 }

 .gray{
      border-bottom: 1px solid grey ;
      display:flex;
   flex-flow: row;
    flex-wrap: wrap;
     justify-content: space-between;
      margin:4px;
      align-items: baseline;
 }
 .red{
    
      border-bottom: 1px solid red ;
      display:flex;
   flex-flow: row;
    flex-wrap: wrap;
     justify-content: space-between;
      margin:4px;
      align-items: baseline;

 }
 
 
.zanrovi{
     display:flex;
   flex-flow: row;
    flex-wrap: wrap;
      /* justify-content: center; */
     font-size: 15px;
     /* width: 120px; */
     /* overflow: hidden; */
 }
 #pomjeri{
    width:30%;
    margin-left:340px;
    margin-top: 10px;
  }
  

</style>