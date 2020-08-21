/* eslint-disable import/no-duplicates */
import React, { useState, useEffect, useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import { format, utcToZonedTime } from 'date-fns-tz';

import { parseISO } from 'date-fns';

import pt from 'date-fns/locale/pt-BR';

import { useToast } from '../../../context/ToastContext';

import Button from '../../../components/Button';

import { Header, Debit } from './styles';

import { api } from '../../../services/api';

interface Debit {
  id: string;
  client_id: number;
  client_name: string;
  reason: string;
  date: Date;
  amount: number;
  created_at: Date;
  updated_at: Date;
}

interface ClientDebitProps {
  client_id: string;
}

const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

const DebitList: React.FC<ClientDebitProps> = ({ client_id }) => {
  const { addToast } = useToast();
  const [debits, setDebits] = useState<Debit[]>([]);

  const history = useHistory();

  // This function get all debits grouped by client_id, client_name with sum of amount
  const getDebits = useCallback(async () => {
    try {
      api.get(`/debits/${client_id}`).then((response) => {
        const data = response.data.map((d: Debit[]) => ({
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
  }, [client_id, addToast]);

  useEffect(() => {
    getDebits();
  }, [getDebits]);

  // Handle the process to delete a debit.
  const handleDebitDelete = useCallback(
    async (id: string) => {
      try {
        await api.delete(`/debits/${id}`);

        getDebits();

        addToast({
          type: 'success',
          title: 'Exclusão de Dívida!',
          description: 'A Dívida foi excluída com sucesso.',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na exclusão de Dívida!',
          description:
            'Ocorreu um erro durante a exclusão da dívida, por favor verifique sua conexão com o banco de dados.',
        });
      }
    },
    [getDebits, addToast],
  );

  return (
    <>
      <Header>
        <h1>Lista de Dívidas</h1>
      </Header>

      {debits.map((debit) => (
        <Debit key={debit.id}>
          <main>
            <strong>{debit.reason}</strong>
            <span>
              {format(
                utcToZonedTime(debit.date, timeZone),
                "dd'/'MM'/'yyyy HH:mm:ss",
                {
                  locale: pt,
                },
              )}
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
              <Button type="button" onClick={() => handleDebitDelete(debit.id)}>
                Excluir
              </Button>
            </div>
          </aside>
        </Debit>
      ))}
    </>
  );
};

export default DebitList;
