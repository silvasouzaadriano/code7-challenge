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

const minDate = new Date(1900, 1, 1);

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
        title: 'Erro ao carregar clientes!',
        description:
          'Ocorreu um erro ao carregar clientes. Verifique sua conexão com banco de dados',
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
        title: 'Erro ao carregar clientes!',
        description:
          'Ocorreu um erro ao carregar clientes. Verifique sua conexão com banco de dados',
      });
    }
  }, [addToast]);

  useEffect(() => {
    getClients();
  }, [getClients]);

  const handleSubmit = useCallback(
    async (data: NewDebitFormData) => {
      try {
        if (
          clientId === '0' ||
          clientId === 'none' ||
          (params.route !== 'home' && clientName === '')
        ) {
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
          amount: Yup.number()
            .typeError('Valor da dívida é obrigatório. Ex: 100,55')
            .min(1, 'Valor da dívida tem que ser maior que zero. Ex: 100,55')
            .positive('Valor da dívida tem que ser maior que zero. Ex: 100,55')
            .required('Valor é obrigatório'),
          date: Yup.date()
            .typeError('Data é obrigatória. Ex: 21/08/2020')
            .min('2000-01-01', 'Data mínima é 01/01/2000')
            .required('Data é obrigatória'),
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
        }, 1500);
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
    [addToast, clientId, clientName, history, route, params.route],
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
          <Input
            name="reason"
            type="text"
            placeholder="Digite um motivo para a dívida. Exemplo: Dívida do Cartão de Crédito"
          />
          <Input
            name="amount"
            type="number"
            step="any"
            placeholder="Digite um valor para a dívida. Exemplo: 100,55"
          />

          <Input
            name="date"
            type="date"
            placeholder="Digite uma data para a dívida no formato:"
          />

          <Button type="submit">SALVAR</Button>
        </Form>
      </Content>
    </>
  );
};

export default AddDebit;
