import React, {useState, useMemo} from 'react';
import Header from './Header';
import api from './api';
import {interval} from 'rxjs';
import {Table, TableRow, TableCell, Checkbox, Button} from '@material-ui/core/';
import DeleteIcon  from '@material-ui/core/Delete';

function ListaPage() {

 const [banho, setBanho] = useState([]);
 const [loading, setLoading] = useState(true);

    async function loadData(){
        const response = await api.get('/');
        setBanho(response.data);
        setLoading(false);
}

useMemo(loadData, []);
     
    return <>
        <Header/>
        <Table style={{marginTop: '80ox'}}> 
            {
               banho.map(banho => (
                <TableRow>
                    <TableCell> {banho.id} </TableCell>
                    <TableCell> {banho.nomedog} </TableCell>
                    <TableCell> {banho.peso} </TableCell>
                    <TableCell> {banho.valor} </TableCell>
                    <TableCell> {banho.status} </TableCell>
                    <TableCell>
                        <Checkbox checked={banho.ok} color="primary"/>
                     <Button variant="contained" color="secondary" size="small"> Apagar </Button>
                     </TableCell>
                </TableRow>           
                ))
            }
        </Table>
       }
    </>
}

export default ListaPage;