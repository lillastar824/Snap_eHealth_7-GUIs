import React, { useEffect, useState } from 'react';

import { Button, Input, Option, Select, Wrapper } from 'ui';
import { useInput } from 'hooks';

import styles from './Crud.module.css';

interface User {
  id: number;
  name: string;
  surname: string;
}

const getUniqueId = () => Date.now() + Math.floor(Math.random() * 100);

const getOptions = (users: User[]) =>
  users.map((user) => ({
    label: `${user.name}, ${user.surname}`,
    value: user.id,
  }));

const usersList: User[] = [
  {
    id: getUniqueId(),
    name: 'Emil',
    surname: 'Hans',
  },
  {
    id: getUniqueId(),
    name: 'Mustermann',
    surname: 'Max',
  },
  {
    id: getUniqueId(),
    name: 'Tisch',
    surname: 'Roman',
  },
];

export const Crud: React.FC = () => {
  const [users, setUsers] = useState<User[]>(usersList);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [options, setOptions] = useState<Option[]>([]);
  const nameInput = useInput('');
  const surnameInput = useInput('');
  const filterInput = useInput('');

  useEffect(() => {
    if (!filterInput.value) {
      setOptions(() => getOptions(users));
      return;
    }

    const foundUsers = users.filter((user) => {
      const fullName = user.name + ', ' + user.surname;

      return fullName.toLowerCase().includes(filterInput.value.toLowerCase());
    });

    setOptions(() => getOptions(foundUsers));
  }, [filterInput.value, users]);

  const onCreate = () => {
    if (!nameInput.value && !surnameInput.value) {
      return null;
    }

    const user = {
      id: getUniqueId(),
      name: nameInput.value,
      surname: surnameInput.value,
    };

    nameInput.onClear();
    surnameInput.onClear();

    setUsers((prevState) => [...prevState, user]);
  };

  const onUpdate = () => {
    if (!nameInput.value && !surnameInput.value) {
      return null;
    }

    const newUser = {
      id: getUniqueId(),
      name: nameInput.value,
      surname: surnameInput.value,
    };

    nameInput.onClear();
    surnameInput.onClear();

    setUsers((prevState) =>
      prevState.map((user) => (user.id === selectedUserId ? newUser : user)),
    );
  };

  const onDelete = () => {
    setUsers((prevState) =>
      prevState.filter((user) => user.id !== selectedUserId),
    );
  };

  const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = Number(event.target.value);

    setSelectedUserId(userId);
  };

  return (
    <Wrapper title='Crud'>
      <div className={styles.crud__wrapper}>
        <div className={styles.crud__label}>
          <Input
            className={styles.crud__prefix}
            containerClassName={styles.inputContainer}
            title='Filter Prefix:'
            {...filterInput}
          />
        </div>
        <div className={styles.crud__form}>
          <div className={styles.form}>
            <div className={styles.form__body}>
              <div className={styles.from__list}>
                <Select
                  id='Users'
                  name='Users'
                  options={options}
                  onSelect={onSelect}
                  size={5}
                />
              </div>
              <div className={styles.form__inputs}>
                <Input
                  title='Name:'
                  {...nameInput}
                  className={styles.input__data}
                  containerClassName={styles.inputContainer}
                />
                <Input
                  title='Surname:'
                  {...surnameInput}
                  className={styles.input__data}
                  containerClassName={styles.inputContainer}
                />
              </div>
            </div>
            <div className={styles.form__buttons}>
              <Button label='Create' onClick={onCreate} />
              <Button label='Update' onClick={onUpdate} />
              <Button label='Delete' onClick={onDelete} />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
