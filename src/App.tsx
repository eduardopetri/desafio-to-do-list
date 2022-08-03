import { ChangeEvent, FormEvent, useState } from 'react';

import { v4 as uuidV4 } from 'uuid';

import { Header } from './components/Header';
import { ToDoList } from './components/ToDoList';

import styles from './App.module.css';
import './global.css';
import { PlusCircle } from 'phosphor-react';

interface ToDo {
  id: string;
  description: string;
  isCompleted: boolean;
}

function App() {
  const [toDoList, setToDoList] = useState<ToDo[]>([]);


  const [newToDoDescription, setNewToDoDescription] = useState('');

  function handleNewToDoChange(event: ChangeEvent<HTMLInputElement>) {
    setNewToDoDescription(event.target.value);
  }

  function handleCreateNewToDo(event: FormEvent) {
    event.preventDefault();
    setToDoList((currentToDoListState) => [...currentToDoListState, {
      id: uuidV4(),
      description: newToDoDescription,
      isCompleted: false
    }]);

    setNewToDoDescription('');
  }

  function removeToDo(toDoId: string) {
    setToDoList((currentToDoListState) => {
      const newToDoList = currentToDoListState.filter(toDo => {
        return toDo.id !== toDoId;
      })
      return newToDoList;
    });
  }

  function toggleToDoIsCompleted(toDoId: string) {
    setToDoList(currentToDoListState => {
      const updatedTodoList = currentToDoListState.map(toDo => {
        if (toDo.id === toDoId) {
          return {
            ...toDo,
            isCompleted: !toDo.isCompleted
          }
        }
        return toDo;
      });
      return updatedTodoList;
    });
  }

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <form onSubmit={handleCreateNewToDo} className={styles.createToDoForm}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={newToDoDescription}
            onChange={handleNewToDoChange}
            required
          />
          <button type="submit">Criar <PlusCircle weight="bold" /></button>
        </form>

        <main>
          <ToDoList toDoListData={toDoList} onRemoveToDo={removeToDo} onToggleToDoIsCompleted={toggleToDoIsCompleted} />

        </main>
      </div>
    </>
  )
}

export default App


