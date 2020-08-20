import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import { Container, Header, Content } from './styles';

import { useToast } from '../../context/ToastContext';
import api from '../../services/api';

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

  // This function get all debits grouped by client_id, client_name with sum of amount
  const getdebits = useCallback(async () => {
    try {
      // const debitsList: Debit[] = [];
      api.get('/debits').then((response) => {
        const data = response.data.map((d: Debit[]) => ({
          ...d,
        }));

        setDebits(data);
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Error on Load debits!',
        description:
          'Occurred an error during load debits. Verify your database connection',
      });
    }
  }, [addToast]);

  useEffect(() => {
    getdebits();
  }, [getdebits]);

  return (
    <>
      <Header>
        <Link to="/adddebit">
          <button type="button">Nova Dívida</button>
        </Link>
      </Header>
      <Container>
        {debits.map((debit) => (
          <Link
            to={`/viewdetaildebit/${debit.client_id}`}
            key={debit.client_id}
          >
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
