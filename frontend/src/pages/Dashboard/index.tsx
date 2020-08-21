import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import Button from '../../components/Button';

import { Container, Header, Content } from './styles';

import { useToast } from '../../context/ToastContext';
import { api } from '../../services/api';

interface Debit {
  client_id: number;
  client_name: string;
  total_debits: number;
}

const Dashboard: React.FC = () => {
  // to get the debits (getdebits function) to be populated on screen
  const [debits, setDebits] = useState<Debit[]>([]);

  // This variable store the toast message method to be used in validations, warnings, etc.
  const { addToast } = useToast();

  const history = useHistory();

  const route = 'home';

  // This function get all debits grouped by client_id, client_name with sum of amount
  const getDebits = useCallback(async () => {
    try {
      api.get('/debits').then((response) => {
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
  }, [addToast]);

  useEffect(() => {
    getDebits();
  }, [getDebits]);

  return (
    <>
      <Header>
        <Button
          type="button"
          onClick={() => history.push(`/addDebit/${route}/0`)}
        >
          Nova Dívida
        </Button>
      </Header>
      <Container>
        {debits.map((debit, index) => (
          <Link to={`/viewDebitDetail/${debit.client_id}`} key={index}>
            <Content>
              <main>
                <strong>{debit.client_name}</strong>
              </main>
              <aside>
                <p>Total: R$ {debit.total_debits}</p>
                <div>
                  <FiChevronRight />
                </div>
              </aside>
            </Content>
          </Link>
        ))}
      </Container>
    </>
  );
};

export default Dashboard;
