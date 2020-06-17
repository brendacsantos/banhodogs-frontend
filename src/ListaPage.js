import React, { useEffect, useState } from 'react';
import Header from './Header';
import TableBody from '@material-ui/core/TableBody';
import api from './api';
import {Table, TableRow, TableCell, Button} from '@material-ui/core/';
import DeleteIcon  from '@material-ui/icons/Delete';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import CreateIcon from '@material-ui/icons/Create';
import {Dialog,DialogActions,TextField,DialogContentText,DialogContent,DialogTitle} from '@material-ui/core';

function ListaPage() {

    const [ banhoSistema , setBanhoSistema ] = useState([]);
    const [ open , setOpen ] = useState(false);
    const [ openUpdate , setOpenUpdate ] = useState(false);

 const [id, setId] = useState();
 const [nomedog, setNomedog] = useState('');
 const [peso, setPeso] = useState();
 const [valor, setValor] = useState();
 const [status, setStatus] = useState('');

  function loadData()
  {
        api.get('/').then(response=> {

        const banhoSistema= response.data;
        setBanhoSistema(banhoSistema);
});
}

useEffect(loadData, []);

    function openDialog()
    {
        setOpen(true);
    }

    function closeDialog()
    {
        setOpen(false);
    }

     function openDialogUpdate(id,nomedog,peso, valor,status)
    {

        setId(id);
        setNomedog(nomedog);
        setPeso(peso);
        setValor(valor);
        setStatus(status);

        setOpenUpdate(true);
    }

    function closeDialogUpdate()
    {
        setOpenUpdate(false);
    }

     async function salvar() { 


          await api.post('/', {nomedog, peso, valor, status}); 
        loadData();
        console.log(nomedog, peso, valor, status);
        closeDialog();

        setNomedog('');
        setPeso();
        setValor();
        setStatus('');
    }

    async function salvarUpdate() { 


         await api.put(`/${id}`, {id, nomedog, peso, valor, status});
        loadData();
        closeDialogUpdate();

        setId();
        setNomedog('');
        setPeso();
        setValor();
        setStatus('');
    }


     async function apagar(id) { 
        console.log(id)
        await api.delete(`/${id}`);
        loadData();

     }

   return <div style={{marginTop: '70px'}}>
        <Header/>
        <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="center">Nome Caes</TableCell>
            <TableCell align="center">Peso</TableCell>
            <TableCell align="center">Valor</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            
          {banhoSistema.map(item => (
            <TableRow key={item.id}>
                
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell align="center">{item.nomedog}</TableCell>
              <TableCell align="center">{item.peso}</TableCell>
              <TableCell align="center">{item.valor}</TableCell>
              <TableCell align="center">{item.status}</TableCell>
              <TableCell align="center" style={{width: '15px'}}>  <Button variant="outlined" color="primary" onClick={() => openDialogUpdate(item.id,item.nomedog,item.peso,item.valor,item.status)}>  <CreateIcon /> &nbsp;Editar </Button> </TableCell>
              <TableCell align="center" style={{width: '15px'}}>  <Button variant="outlined" color="secondary" onClick={() => apagar(item.id)}> <DeleteIcon /> &nbsp;Apagar </Button> </TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>

    <Button  style={{marginTop: '20px'}}
        onClick={openDialog}
        variant="contained" 
        color="primary">
            Adicionar
    </Button>

    <Dialog open ={open}>
         <DialogTitle>Novo Cãozinho</DialogTitle>
            <DialogContent>
                <DialogContentText>Preencha os dados para um novo amiguinho.</DialogContentText>
                
                <TextField
                    margin="dense"
                    id="nomedog"
                    label="Nome Cãozinho"
                    type="text"
                    fullWidth
                    onChange={e => setNomedog(e.target.value)}
                />

                <TextField
                    margin="dense"
                    id="peso"
                    label="Peso"
                    type="number"
                    fullWidth
                    onChange={e => setPeso(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="valor"
                    label="Valor do banho"
                    type="text"
                    fullWidth
                    onChange={e => setValor(e.target.value)}
                />          
             <TextField
                    margin="dense"
                    id="status"
                    label="Status do banho"
                    type="text"
                    fullWidth
                    onChange={e => setStatus(e.target.value)}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Cancelar</Button>
                <Button onClick={salvar}>Salvar</Button>
            </DialogActions>
    </Dialog>

    <Dialog open ={openUpdate}>
         <DialogTitle>Atualizar cadastro do cãozinho</DialogTitle>
            <DialogContent>
                <DialogContentText>Preencha os dados para atualizar.</DialogContentText>
                     
<TextField
                    margin="dense"
                    id="nomedog"
                    value={nomedog}
                    label="Nome Cãozinho"
                    type="text"
                    fullWidth
                    onChange={e => setNomedog(e.target.value)}
                />

                <TextField
                    margin="dense"
                    id="peso"
                    value={peso}
                    label="Peso"
                    type="number"
                    fullWidth
                    onChange={e => setPeso(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="valor"
                    value={valor}
                    label="Valor do banho"
                    type="text"
                    fullWidth
                    onChange={e => setValor(e.target.value)}
                />          
             <TextField
                    margin="dense"
                    id="status"
                    value={status}
                    label="Status do banho"
                    type="text"
                    fullWidth
                    onChange={e => setStatus(e.target.value)}
                />


            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialogUpdate}>Cancelar</Button>
                <Button onClick={salvarUpdate}>Salvar</Button>
            </DialogActions>
    </Dialog>
    
        </div>
    
}

export default ListaPage
