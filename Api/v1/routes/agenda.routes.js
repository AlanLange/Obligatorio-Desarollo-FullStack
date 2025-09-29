import express from 'express';
import { getAgendas, getAgendaPorId, registrarAgendas, editarAgendas, eliminarAgenda } from '../controllers/agenda.controller';
const router = express.Router({ mergeParams: true });

router.get('/', getAgendas);

router.get('/:id', getAgendaPorId);

router.post('/', registrarAgendas);

router.put('/:id', editarAgendas);

router.delete('/:id', eliminarAgenda);

export default router;
