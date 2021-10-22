<template>
  <div>
    <button href="#" v-b-modal.branchdetail>Branch</button> 

    <!--popup start for Branch details-->
     <b-modal id="branchdetail" title="Branch" hide-footer> 
      <div class="form-row">
       
        <div class="form-group">
          <label>Name:</label>
          <b-form-input
            type="text"
            class="form-control"
            v-model.trim="$v.branch.name.$model"
            :class="{'is-invalid':$v.branch.name.$error, 'is-valid':!$v.branch.name.$invalid}"
            placeholder="Enter your Name"
          ></b-form-input>
          <div class="valid-feedback">Your Name is valid!</div>
          <div class="invalid-feedback">
            <span v-if="!$v.branch.name.required">Name is required</span>
          </div>
        </div>
        <br />

        <div class="form-group">
          <label>Code:</label>
          <b-form-input
            type="text"
            class="form-control"
            v-model.trim="$v.branch.code.$model"
            :class="{'is-invalid':$v.branch.code.$error, 'is-valid':!$v.branch.code.$invalid}"
            placeholder="Enter your code"
          ></b-form-input>
          <div class="valid-feedback">Your code is valid!</div>
          <div class="invalid-feedback">
            <span v-if="!$v.branch.code.required">code is required</span>
          </div>
        </div>
        <br />

        <div class="form-group">
          <label>Address:</label>
          <b-form-textarea
            cols="35"
            rows="4"
            class="form-control"
            v-model="$v.branch.address.$model"
            :class="{'is-invalid':$v.branch.address.$error, 'is-valid':!$v.branch.address.$invalid}"
            placeholder="Enter your  Address"
          ></b-form-textarea>
          <div class="valid-feedback">Your Address is valid!</div>
          <div class="invalid-feedback">
            <span v-if="!$v.branch.address.required">Address is required</span>
          </div>
        </div>
        <br />

        <div class="form-group">
          <label>Contact Number</label>
          <b-form-input
            type="number"
            class="form-control"
            v-model.number.lazy="$v.branch.number.$model"
            :class="{'is-invalid':$v.branch.number.$error, 'is-valid':!$v.branch.number.$invalid}"
            placeholder="Enter your Contact Number"
          ></b-form-input>
          <div class="valid-feedback">Your number is valid!</div>
          <div class="invalid-feedback">
            <span
              v-if="!$v.branch.number.required"
            >Contact number is required and it must be 10 numbers</span>
          </div>
        </div>
        <br />

        <div class="form-group">
          <label>Mail Id:</label>
          <b-form-input
            type="email"
            class="form-control"
            v-model.trim="$v.branch.email.$model"
            :class="{'is-invalid':$v.branch.email.$error, 'is-valid':!$v.branch.email.$invalid}"
            placeholder="Enter your email"
          ></b-form-input>
          <div class="valid-feedback">Your email is valid!</div>
          <div class="invalid-feedback">
            <span v-if="!$v.branch.email.required">Email is required</span>
            <span v-if="!$v.branch.email.isUnique">Enter your proper email</span>
          </div>
        </div>
        <br />

        <div class="text-center">
          <b-button variant="outline-success"  @click="putBranch()" type="submit">Submit</b-button>
          <b-button variant="outline-danger" class="mx-3" @click="resetForm()">Reset</b-button>
        </div>
      </div>
     </b-modal> 
    <!--popup end for Branch details-->
  </div>
</template>


<script>
import { required, minLength, maxLength, email } from "vuelidate/lib/validators";
import BranchService from '../service/BranchService'
export default {
 name: "Branch",
     components: {
     
       },
    data(){
        return{
             branch: {
              name: "",
              code: "",
              address: "",
              number: "",
              email: "",
            },
            submitstatus: "" 
        }
    },
    validations: {
    branch: { 
      name: {
        required,
        minLength: minLength(3)
      },
      code: {
        required,
        minLength: minLength(1)
      },
      address: {
        required,
        minLength: minLength(5)
      },
      number: {
       required,
        minLength: minLength(10),
        maxLength: maxLength(10),
      },
      email: {
            required,
            email,
            isUnique (value) {
                if(value === '') return true
                var email_regex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return new Promise((resolve) => {
                    setTimeout(() => {
                            resolve(email_regex.test(value))
                    }, 350 + Math.random() * 300)
                })
            }
        },  
    }
  },
   
   methods:{
        putBranch: function(){  
        this.$v.$touch()
          if(this.$v.$invalid){
           this.submitstatus = "FAIL"
          }
          else {    
              this.submitstatus = "SUCCESS"  
             return new Promise((resolve, reject) => {
                BranchService.putBranch(this.branch)
                .then(response => {
                alert ("Branch Details registered successfully!!!!!"); 
                    this.branch.branchId ="";
                    this.branch.name ="";
                    this.branch.code ="";
                    this.branch.address ="";
                    this.branch.number ="";
                    this.branch.email ="";  
                    window.location.reload();        
                    resolve(response);
                })
                 .catch(err => {
                     reject(err);
                });
        });       
      }        
    },    


    resetForm() {
      this.branch = {
      name: null,
      code: null,
      address: null,
      number: null,
      email: null      
     };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }      
    }   
 }                  
   

</script>