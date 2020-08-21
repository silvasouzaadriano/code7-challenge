import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  ChangeEvent,
} from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useToast } from '../../../context/ToastContext';

import Input from '../../../components/Input';

import Button from '../../../components/Button';

import { Title, Content } from './styles';

import getValidationErrors from '../../../utils/getValidationErrors';

import { api, apiClients } from '../../../services/api';

interface NewDebitFormData {
  client_id: number;
  client_name: string;
  reason: string;
  date: Date;
  amount: number;
}

interface ClientResponse {
  id: number;
  name: string;
}

interface RouteParam {
  route: string;
  client_id: string;
}

const AddDebit: React.FC = () => {
  const { params } = useRouteMatch<RouteParam>();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [clients, setClients] = useState<ClientResponse[]>([]);
  const [clientId, setClientId] = useState('0');
  const [clientName, setClientName] = useState('');
  const [route, setRoute] = useState('');

  const history = useHistory();

  const getRoute = useCallback(async () => {
    try {
      let routeChoosen = '';
      if (params.route !== 'home') {
        if (clientId === '0') {
          setClientId(params.client_id);
        }
        routeChoosen = `${params.route}/${clientId}`;
      }

      setRoute(routeChoosen);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Error on Load clients!',
        description:
          'Occurred an error during load clients. Verify your database connection',
      });
    }
  }, [clientId, params.route, params.client_id, addToast]);

  useEffect(() => {
    getRoute();
  }, [getRoute]);

  // This function get all clients from API https://jsonplaceholder.typicode.com/
  const getClients = useCallback(async () => {
    try {
      // const debitsList: Debit[] = [];
      apiClients.get<ClientResponse[]>('/users').then((response) => {
        const data = response.data.map((client) => ({
          id: client.id,
          name: client.name,
        }));

        setClients(data);
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Error on Load clients!',
        description:
          'Occurred an error during load clients. Verify your database connection',
      });
    }
  }, [addToast]);

  useEffect(() => {
    getClients();
  }, [getClients]);

  const handleSubmit = useCallback(
    async (data: NewDebitFormData) => {
      try {
        if (clientId === '0' || clientId === 'none') {
          addToast({
            type: 'error',
            title: 'Erro durante criação da Dívida!',
            description: 'Cliente é obrigatório',
          });
          return;
        }

        formRef.current?.setErrors({});

        // Validate the form
        const schema = Yup.object().shape({
          reason: Yup.string()
            .required('Motivo da dívida é obrigatório')
            .max(50, 'Motivo excedeu 50 characters'),
          amount: Yup.number().required('Valor é obrigatório'),
          date: Yup.date().required('Data é obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        /**
         * Begin
         *
         * After validation,  a new debit will be created
         */

        const newDebit = {
          client_id: clientId,
          client_name: clientName,
          reason: data.reason,
          date: data.date,
          amount: data.amount,
        };

        await api.post('debits', newDebit);

        /**
         * End
         *
         * After validation,  a new debit will be created
         */

        addToast({
          type: 'success',
          title: 'Nova Dívida!',
          description: 'A dívida foi criada com sucesso.',
        });

        setTimeout(() => {
          history.push(`/${route}`);
        }, 3000);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro durante criação da Dívida!',
          description:
            'Ocorreu um erro durante a criação da dívida, por favor preencha os campos obrigatórios.',
        });
      }
    },
    [addToast, clientId, clientName, history, route],
  );

  const handleChooseClient = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const clientIdChoosen = event.target.value;
      const clientNameChoosen =
        event.target.options[event.target.selectedIndex].text;

      if (clientIdChoosen !== '0' && clientIdChoosen !== 'none') {
        setClientId(clientIdChoosen);
        setClientName(clientNameChoosen);
        getRoute();
      }
    },
    [getRoute],
  );

  return (
    <>
      <Title>
        <div>
          <h1>Nova Dívida</h1>
        </div>

        <div>
          <Button type="button" onClick={() => history.push(`/${route}`)}>
            <Link to="/">
              <FiArrowLeft />
              Voltar
            </Link>
          </Button>
        </div>
      </Title>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <select name="client" id="client" onChange={handleChooseClient}>
            <option value="none">Escolha um cliente</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
          <Input name="reason" type="text" placeholder="Informe um motivo" />
          <Input
            name="amount"
            type="number"
            step="any"
            min="0"
            placeholder="Informe um valor"
          />
          <Input name="date" type="date" placeholder="Informe uma data" />

          <Button type="submit">SALVAR</Button>
        </Form>
      </Content>
    </>
  );
};

export default AddDebit;
