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

import { format, utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt-BR';
import { useToast } from '../../../context/ToastContext';

import Input from '../../../components/Input';

import Button from '../../../components/Button';

import { Title, Content } from './styles';

import getValidationErrors from '../../../utils/getValidationErrors';

import { api, apiClients } from '../../../services/api';

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

interface DebitIdParam {
  id: string;
}

const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

const EditDebit: React.FC = () => {
  const { params } = useRouteMatch<DebitIdParam>();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [clients, setClients] = useState<ClientResponse[]>([]);
  const [clientId, setClientId] = useState('0');
  const [clientName, setClientName] = useState('');

  const history = useHistory();

  // This function get the debit details based on s grouped by client_id, client_name with sum of amount
  const getDebitDetail = useCallback(async () => {
    try {
      api.get(`/debits/id/${params.id}`).then((response) => {
        const data = response.data.map((d: Debit[]) => ({
          ...d,
        }));

        setClientId(String(data[0].client_id));
        setClientName(data[0].client_name);

        const dateFormatted = format(
          utcToZonedTime(data[0].date, timeZone),
          "yyyy'-'MM'-'dd",
          {
            locale: pt,
          },
        );

        formRef.current?.setData({ reason: data[0].reason });
        formRef.current?.setData({ amount: data[0].amount });
        formRef.current?.setData({ date: dateFormatted });
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao carregar Dívida!',
        description:
          'Ocorreu um erro durante o carregamento da dívida. Verifique sua conexão com o banco de dados',
      });
    }
  }, [params.id, addToast]);

  useEffect(() => {
    getDebitDetail();
  }, [getDebitDetail]);

  // This function get all clients from API https://jsonplaceholder.typicode.com/
  const getClients = useCallback(async () => {
    try {
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
          'Ocorreu um erro ao carregar clients. Verifique a conexão com o banco de dados',
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
            title: 'Erro durante a alteração da Dívida!',
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
            .typeError('Valor é obrigatório. Ex: 100.55')
            .min(1, 'Valor da dívida tem que ser maior que zero. Ex: 100,55')
            .positive('Valor tem que ser maior que zero. Ex: 100.55')
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
         * After validation, the debit will be updated
         */

        const updateDebit = {
          client_id: clientId,
          client_name: clientName,
          reason: data.reason,
          date: data.date,
          amount: data.amount,
        };

        await api.put(`debits/${params.id}`, updateDebit);

        /**
         * End
         *
         * After validation,  the debit will be updated
         */

        addToast({
          type: 'success',
          title: 'Alteração de Dívida!',
          description: 'A dívida foi alterada com sucesso.',
        });

        setTimeout(() => {
          history.push(`/viewDebitDetail/${clientId}`);
        }, 1500);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro durante a alteração da da Dívida!',
          description:
            'Ocorreu um erro durante a alteração da dívida, por favor preencha os campos obrigatórios.',
        });
      }
    },
    [addToast, params.id, clientId, clientName, history],
  );

  const handleChooseClient = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const clientIdChoosen = event.target.value;
      const clientNameChoosen =
        event.target.options[event.target.selectedIndex].text;

      if (clientIdChoosen !== '0' && clientIdChoosen !== 'none') {
        setClientId(clientIdChoosen);
        setClientName(clientNameChoosen);
      }
    },
    [],
  );

  return (
    <>
      <Title>
        <div>
          <h1>Alteração de Dívida</h1>
        </div>

        <div>
          <Button
            type="button"
            onClick={() => history.push(`/viewDebitDetail/${clientId}`)}
          >
            <Link to="/">
              <FiArrowLeft />
              Voltar
            </Link>
          </Button>
        </div>
      </Title>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <select
            name="client"
            id="client"
            onChange={handleChooseClient}
            value={clientId}
          >
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
            placeholder="Digite um motivo para dívida. Exemplo: Dívida do Cartão de Crédito"
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

          <Button type="submit">Alterar</Button>
        </Form>
      </Content>
    </>
  );
};

export default EditDebit;
