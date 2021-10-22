import axios from 'axios';
export default{
    putBranch: function(branch){
        var ax = axios.create({
            baseURL: "http://localhost:9092",
        });
        let config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        return new Promise((resolve, reject) => {
            ax
                .post("/branch/insert", branch, config)
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    getAllBranchs: function(){
        var ax = axios.create({
            baseURL: "http://localhost:9092",
        }); 
        return new Promise((resolve, reject) => {
            ax({
                method: 'get',
                url: '/branch/getAll',
            }).then((response) => {                 
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });                           
    },
    deleteBranch: function(branchId){
        var ax = axios.create({
            baseURL: "http://localhost:9092",
        }); 
        return new Promise((resolve, reject) => {
            ax({
                method: 'get',
                url: '/branch/delete/' + branchId,
            }).then((response) => {                     
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });             
    },
    getBranch: function(branchId){
        var ax = axios.create({
            baseURL: "http://localhost:9092",
        }); 
        return new Promise((resolve, reject) => {
            ax({
                method: 'get',
                url: '/branch/get/' + branchId,
            }).then((response) => {                     
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });             
    },
    updateBranch: function(branch){
        var ax = axios.create({
            baseURL: "http://localhost:9092",
        });
        let config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        return new Promise((resolve, reject) => {
            ax
                .post("/branch/update", branch, config)
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
        }); 
    } 


}