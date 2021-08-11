<template>
 <div class="container"> 

      <h1> Odobreni Znanstveni Radovi </h1>
     <p v-if="loading"> Loading.... </p>
    <ZnanstveniRadoviPrikaz :lista="znanstveniRadovi" :zanr="zanrovi"> </ZnanstveniRadoviPrikaz>
      <button class="btn btn-danger" id="obrisi" @click="obrisiSve()"> Obrisi Sve  </button>
          

    <div class="prosjek">
        <h4 class="text"> Prosjecna starost radova :  </h4>
        <h4 id="proracun">{{prosjecnaStarost}}</h4>
    </div>
     
     <!-- <div id="pomjeri">
        <button :disabled="more" class="btn btn-danger"> - </button>
        <button :disabled="more" class="btn btn-success"> + </button>

     </div> -->

 </div>


</template>



<script>
import axios from "axios"
import _ from "lodash"
 import ZnanstveniRadoviPrikaz from './ZnanstveniRadoviPrikaz.vue'


export default {
  data(){
      return {
          loading: false,
          znanstveniRadovi : [],
          znanstveniRadoviProvjera: [],
          prosjecnaStarost: 0,
          starost:0,
          selected:false,
          selectedIndex:null,
          zanrovi: [],
          more: false,

      }
  },
  props:{
      lista:Array,
      zanr:Array
  },
   components: {ZnanstveniRadoviPrikaz},
  mounted(){
        this.loading=true;

        axios.all([
            axios.get('https://mocki.io/v1/53083792-ee35-4ec5-bebb-44e802bd62a0'),
            axios.get('https://mocki.io/v1/45d27447-2b84-4355-bc89-7758b6498d78')
])
.then(axios.spread((user1, user2) => {
               user1.data.forEach(x=>x.isSelected=false);
          this.znanstveniRadovi=user1.data;
            this.znanstveniRadoviProvjera=user2.data;
             var result = this.znanstveniRadovi.filter(o1 => this.znanstveniRadoviProvjera.some(o2 => o1.id === o2.id));
                
            this.znanstveniRadovi=_.pullAll(this.znanstveniRadovi,result);
            this.prosjecnaStarostRadova();
             this.sortZanrove();
             this.sortPoStarosti();
             
    
          
})).finally(()=>this.loading=false)
        
  },
  
  methods: {
        prosjecnaStarostRadova(){
                   var sum=0;
                   this.znanstveniRadovi.forEach(el => {
                    this.starost= new Date(new Date()  - new Date(el.datum.datumIzdanja)).getFullYear() -1970;
                        sum+=this.starost;
                                     
                   });
                   this.prosjecnaStarost=(sum/this.znanstveniRadovi.length).toFixed(2);
            
                         
        },
            
        sortPoStarosti(){
            this.znanstveniRadovi.sort((a,b)=> new Date(b.datum.datumIzdanja) - new Date(a.datum.datumIzdanja ));
        },
        
        
    
          obrisiSve(){
              this.znanstveniRadovi.splice(0,this.znanstveniRadovi.length);
          },

          sortZanrove(){
            //    console.log(this.znanstveniRadovi);
                 this.znanstveniRadovi.forEach(el => {
                          
                           
                           for(var i=0; i<el.zanr.length;i++){
                               this.zanrovi.push(el.zanr[i]);
                               this.zanrovi.sort();
                           }
                               
                          
                         console.log(this.zanrovi);
                 }
                 )
                 
                 
        },



        
        

  }
        

  }

        

  
  


</script>

<style scoped>
 /* .container{
     text-align: center;
     margin-top: 50px;
 } */
 h1{
     text-align: left;
     margin-bottom: 5px;
 }
 .prosjek{
     float:left;
     margin-top: 10px;
 }
 .text{
     display:inline-block;
     margin-right: 10px;
 }
 #proracun{
     display:inline-block;

 }
 #obrisi{
      float:right;
     margin-top: 10px;

      
  }
  #pomjeri{
      margin-top:10px;
      margin-left: 100px;
  }
 
</style>