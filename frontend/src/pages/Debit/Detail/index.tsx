import React, { useState, useEffect, useCallback } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { format, utcToZonedTime } from 'date-fns-tz';

import pt from 'date-fns/locale/pt-BR';

import Button from '../../../components/Button';

import { useToast } from '../../../context/ToastContext';

import {
  Header,
  DebitContainer,
  DebitDetailModal,
  HeaderDebitList,
  DebitList,
} from './styles';

import { api } from '../../../services/api';

interface Debit {
  client_id: number;
  client_name: string;
  total_debits: number;
}

interface DebitListDTO {
  id: string;
  client_id: number;
  client_name: string;
  reason: string;
  date: Date;
  amount: number;
  created_at: Date;
  updated_at: Date;
}

interface ClientIdParam {
  client_id: string;
}

const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

const ViewDebitDetail: React.FC = () => {
  const [modalDebitDetailIsOpen, setModalDebitDetailIsOpen] = useState(false);
  const [modalDebitIsOpen, setModalDebitIsOpen] = useState(false);
  const [debitIdToDelete, setDebitIdToDelete] = useState('');
  const { params } = useRouteMatch<ClientIdParam>();

  const { addToast } = useToast();
  const [debitDetail, setDebitDetail] = useState<Debit[]>([]);
  const [debits, setDebits] = useState<DebitListDTO[]>([]);

  const history = useHistory();

  const route = 'viewDebitDetail';

  const openModalDebitDetail = useCallback(() => {
    setModalDebitDetailIsOpen(true);
  }, []);

  const closeModalDebitDetail = useCallback(() => {
    setModalDebitDetailIsOpen(false);
  }, []);

  const openModalDebit = useCallback((id: string) => {
    setDebitIdToDelete(id);
    setModalDebitIsOpen(true);
  }, []);

  const closeModalDebit = useCallback(() => {
    setDebitIdToDelete('');
    setModalDebitIsOpen(false);
  }, []);

  // This function get all debits grouped by client_id, client_name with sum of amount
  const getDebitDetail = useCallback(async () => {
    try {
      api
        .get('/debits', {
          params: { client_id: params.client_id },
        })
        .then((response) => {
          const data = response.data.map((d: Debit[]) => ({
            ...d,
          }));

          setDebitDetail(data);
        });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao carregar Dívidas!',
        description:
          'Ocorreu um erro durante o carregamento das dívidas. Verifique sua conexão com o banco de dados',
      });
    }
  }, [params.client_id, addToast]);

  useEffect(() => {
    getDebitDetail();
  }, [getDebitDetail]);

  // This function get all debits by client_id
  const getDebits = useCallback(async () => {
    try {
      api.get(`/debits/${params.client_id}`).then((response) => {
        const data = response.data.map((d: DebitListDTO[]) => ({
          ...d,
        }));
        setDebits(data);
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao carregar Dívidas!',
        description:
          'Ocorreu um erro durante o carregamento das dívidas. Verifique sua conexão com o banco de dados',
      });
    }
  }, [params.client_id, addToast]);

  useEffect(() => {
    getDebits();
  }, [getDebits]);

  // Handle the process to delete a debit.
  const handleDebitDelete = useCallback(async () => {
    try {
      api.delete(`/debits/${String(debitIdToDelete)}`).then(() => {
        closeModalDebit();
        getDebitDetail();
        getDebits();
        addToast({
          type: 'success',
          title: 'Exclusão de Dívida!',
          description: 'A Dívida foi excluída com sucesso.',
        });
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro na exclusão de Dívida!',
        description:
          'Ocorreu um erro durante a exclusão da dívida, por favor verifique sua conexão com o banco de dados.',
      });
    }
  }, [addToast, getDebitDetail, getDebits, debitIdToDelete, closeModalDebit]);

  const handleClientDelition = useCallback(async () => {
    try {
      await api.delete('/debits/0', {
        params: {
          client_id: params.client_id,
        },
      });

      addToast({
        type: 'success',
        title: 'Exclusão de cliente!',
        description: 'O cliente e seus débitos foram excluídos com sucesso.',
      });

      setTimeout(() => {
        history.push('/');
      }, 1500);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro durante exclusão de cliente!',
        description:
          'Ocorreu um erro durante a exclusão do cliente, por favor verifique sua conexão com o banco de dados.',
      });
    }
  }, [addToast, history, params.client_id]);

  return (
    <>
      <Header>
        <h1>Detalhes das Dívidas</h1>
        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </Header>

      {modalDebitDetailIsOpen && (
        <DebitDetailModal>
          <h3>Confirma a exclusão do cliente?</h3>
          <main>
            <Button type="button" onClick={handleClientDelition}>
              Excluir
            </Button>
            <Button type="button" onClick={closeModalDebitDetail}>
              Fechar
            </Button>
          </main>
        </DebitDetailModal>
      )}

      <DebitContainer>
        <div className="buttons">
          <Button
            type="button"
            onClick={() =>
              history.push(`/addDebit/${route}/${params.client_id}`)}
          >
            Nova Dívida
          </Button>

          {debitDetail.length > 0 && (
            <Button type="button" onClick={openModalDebitDetail}>
              Excluir Cliente
            </Button>
          )}
        </div>
        {debitDetail.map((debit, index) => (
          <div className="head" key={index}>
            <div className="client">
              <span>Cliente </span>
              <p>{debit.client_name}</p>
            </div>

            <div className="creationDate">
              <span>Total da Dívida</span>
              <p>R$ {debit.total_debits}</p>
            </div>
          </div>
        ))}
      </DebitContainer>

      {debits.length > 0 && (
        <HeaderDebitList>
          <h1>Lista de Dívidas</h1>
        </HeaderDebitList>
      )}

      {modalDebitIsOpen && (
        <DebitDetailModal>
          <h3>Confirma a exclusão da dívida?</h3>
          <main>
            <Button type="button" onClick={handleDebitDelete}>
              Excluir
            </Button>
            <Button type="button" onClick={closeModalDebit}>
              Fechar
            </Button>
          </main>
        </DebitDetailModal>
      )}

      {debits.map((debit) => (
        <DebitList key={debit.id}>
          <main>
            <strong>{debit.reason}</strong>
            <span>
              {format(utcToZonedTime(debit.date, timeZone), "dd'/'MM'/'yyyy", {
                locale: pt,
              })}
            </span>
          </main>
          <aside>
            <p>R$ {debit.amount}</p>
            <div>
              <Button
                type="button"
                onClick={() => history.push(`/editDebit/${debit.id}`)}
              >
                Editar
              </Button>
              <Button type="button" onClick={() => openModalDebit(debit.id)}>
                Excluir
              </Button>
            </div>
          </aside>
        </DebitList>
      ))}
    </>
  );
};

export default ViewDebitDetail;
