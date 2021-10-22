<template>
  <div>
    <!-- Branch details table start--> 
    <b-container>
      <b-table-simple responsive>
        <b-thead head-variant="dark">
          <b-tr>
            <!-- <b-th>ID</b-th> -->
            <b-th>Name</b-th>
            <b-th>Code</b-th>
            <!-- <b-th>Address</b-th>
            <b-th>Contact Number</b-th>
            <b-th>Mail Id</b-th> -->
            <b-th>Action</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="b in branchs" v-bind:key="b.branchId">
            <!-- <b-td>{{b.branchId}}</b-td> -->
            <b-td>{{b.name}}</b-td>
            <b-td>{{b.code}}</b-td>
            <!-- <b-td>{{b.address}}</b-td>
            <b-td>{{b.number}}</b-td>
            <b-td>{{b.email}}</b-td> -->
            <b-td>              
              <span>
                <b-icon icon="eye-fill" aria-hidden="true" @click="getBranch(b.branchId)" v-b-modal.viewbranch></b-icon>
              </span> 
              <span> / </span>
              <span>
                <b-icon icon="pencil-fill" aria-hidden="true" @click="getBranch(b.branchId)" v-b-modal.editbranch>
                </b-icon>
              </span>
              <span> / </span>
              <span>
                <b-icon icon="trash-fill" aria-hidden="true" @click="deleteBranch(b.branchId)"></b-icon>
              </span>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </b-container>
    <!-- Branch details table end-->  

    <!--popup start for View Branch details--> 
    <div>
        <b-modal id="viewbranch" title="View Branch" hide-footer>
            <div class="control">
               <b-table-simple responsive>          
                <b-tr>
                    <b-th>Name:</b-th> 
                    <b-td>{{branch.name}}</b-td>                    
                </b-tr>
                <b-tr>  
                    <b-th>Code:</b-th> 
                    <b-td>{{branch.code}}</b-td>               
                </b-tr>
                <b-tr>
                    <b-th>Address:</b-th>  
                    <b-td>{{branch.address}}</b-td>
                </b-tr>
                <b-tr>
                    <b-th>Contact Number :</b-th> 
                    <b-td>{{branch.number}}</b-td>
                </b-tr>
                <b-tr>
                    <b-th>E-mail:</b-th>
                    <b-td>{{branch.email}}</b-td>
                </b-tr>                
                                         
              </b-table-simple>
           </div>
        </b-modal>
    </div>
          

    <!--popup end for View Branch details-->

    <!--popup start for Branch details Update--> 
       <div >
       <b-modal id="editbranch" title="Edit Branch" hide-footer>
          <b-form ref="form">
          
            <b-form-group  label="Name:" >
                  <b-form-input   type="text"  v-model="branch.name">
                  </b-form-input>   
            </b-form-group><br>
            
            <b-form-group label="Code:" >
                 <b-form-input  type="text"  v-model="branch.code">
                 </b-form-input> 
            </b-form-group><br>
             
            <b-form-group label="Address:"> 
               <b-form-textarea cols="35" rows="4" v-model="branch.address" >
               </b-form-textarea>
            </b-form-group><br>

         
            <b-form-group label="Contact Number:">
               <b-form-input type="number" v-model="branch.number">
               </b-form-input> 
            </b-form-group><br>

            <b-form-group label="E-mail:">
               <b-form-input type="text" v-model="branch.email" >
               </b-form-input>
            </b-form-group><br>
     
            
            <div class="text-center">
              <b-button variant="outline-success"  @click="updateBranch()" type="submit">Update</b-button>
            </div>
              
          
         </b-form>
       </b-modal>
    </div>
    <!--popup end for Branch details update--> 
           
  </div>
</template>


<script>
import BranchService from '../service/BranchService'
export default {
  name: 'BranchTable',
  components:{
  },
  data(){
        return{
            branch: {            
              name: "",
              code: "",
              address: "",
              number: "",
              email: ""
            },
            branchs: '',
        }
    },
    mounted(){
        this.getAllBranchs(); 
    },
    methods:{
        getAllBranchs: function(){
            return new Promise((resolve, reject) => {
                BranchService.getAllBranchs()
                .then((response) => {                   
                    this.branchs = response.data;             
                    resolve(response);
                }).catch((err) => {
                    reject(err);
                });
            });                     
        },
        deleteBranch: function(branchId){
            return new Promise((resolve, reject) => {
                BranchService.deleteBranch(branchId)
                .then((response) => { 
                    alert ("Branch details deleted successfully!!!!!");   
                    this.branchs = response.data; 
                    this.getAllBranchs();            
                    resolve(response);
                }).catch((err) => {
                    reject(err);
                });
            });              
        },
        getBranch: function(branchId){
            return new Promise((resolve, reject) => {
                BranchService.getBranch(branchId)
                .then((response) => {       
                    this.branch = response.data;                 
                    resolve(response);
                }).catch((err) => {
                    reject(err);
                });
            });              
        },
        updateBranch: function(){           
            return new Promise((resolve, reject) => {
                BranchService.updateBranch(this.branch)
                .then(response => {
                alert ("Branch details updated successfully!!!!!");
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
            });        
        }
    
        
    }
  }
</script>