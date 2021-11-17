import http from "../http-common";

class DashboardDataService {
    getAll(){
        return http.get(`/dashboard/getdata/active_trading_pairs`)
    }

    get(id){
        return http.get(`/dashboard/getdata/active_trading_pairs/id/${id}`)
    }

    createPair(data){
        return http.post("/dashboard/addpair", data)
    }

    updatePair(id, data){
        return http.put(`/dashboard/updatepair/${id}`, data)
    }

    deletePair(id){
        return http.delete(`/dashboard/deletepair/${id}`)
    }
}

export default new DashboardDataService();