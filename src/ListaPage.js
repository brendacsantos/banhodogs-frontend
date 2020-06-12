import React, {useEffect, useState} from 'react';
import Header from './Header';
import api from './api';

/*
const banhos = [{
      id: 1,
      nomedog: "Amora",
      peso: 14,
      valor: "R$ 20.00",
      status: "aguardando"
    },
    {
      id: 2,
      nomedog: "Max",
      peso: 10,
      valor: "R$ 20.00",
      status: "ok"
    },
]*/

function ListaPage() {

 const [ banhos, setBanhos] = useState([]);

     function loadData(){

         //banhos.push({id: 1, nomedog: 'A', peso: 10});
        setBanhos([{id: 1, nomedog: 'A', peso: 10}]);
    }
     useEffect(loadData, []);
     
    return <div>
        <Header/>
        <table> 
            {
               banhos.map(banhos => (
                <tr>
                    <td> {banhos.id} </td>
                    <td> {banhos.nomedog} </td>
                    <td> {banhos.peso} </td>
                    <td> {banhos.valor} </td>
                    <td> {banhos.status} </td>
                </tr>           
                ))
            }
        </table>
    </div>
}

export default ListaPage;